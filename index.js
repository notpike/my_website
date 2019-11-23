/*
 * Name: NotPike
 * File: index.js
 * Licence: MIT
 */


/* ------------ REQUIREMENTS ------------ */
const Logger = require('./apps/logger');
const http = require('http');
const path = require('path');
const fs = require('fs');
const { parse } = require('querystring');


/* ---------- LOGGING FUNCTION ---------- */
const logger = new Logger();
logger.on('message', (data) => console.log("Called Listener: ", data));
logger.log("Server Startup");


/* ------------ POST FUNCTION ----------- */
function postRX(req) {

    let pData ='';
    req.on('data', chunk => {
        pData += chunk.toString(); // Buf 2 Str
    });

    // After being gathered check to see who made the request
    req.on('end', () => {
        switch(req.url) { // Where did this POST come from?
            case '/login':
                logger.log(pData);
                break;
        }
    });

}

/* ------------ PATH FUNCTION ----------- */
function buildReqPath(req) {

    var target = "";

    switch(req.url) {
        case '/':
            target = "index.html"
            break;
        case '/about':
            target = "pages/about.html";
            break;
        case '/notes':
            target = "pages/notes.html";
            break;
        case '/contact':
            target = "pages/contact.html";
            break;
        case '/login':
            target = "pages/login.html";
            break;
        case '/krad':
            target = "pages/krad.html";
            break;
        default:
            target = req.url;
            break;
    }

    return path.join(__dirname, 'public', target);
}


/* ---------- MAIN SERVER LOOP ---------- */
const server = http.createServer((req,res) => {
    
    // Handle Post Requests
    if (req.method === 'POST') {
        postRX(req);
    }

    // Build the file path
    let filePath = buildReqPath(req);

    // Extension of file
    let extname = path.extname(filePath);

    // Init content type
    let contentType = 'text/html';

    // Check ext and set content type
    switch(extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css': 
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    // Read file
    fs.readFile(filePath, (err, content) => {
        if(err) {
            // 404 Page
            fs.readFile(path.join(__dirname, 'public/pages/', '404.html'), (err, content) => {
                res.writeHead(200, { 'Content-Type': 'text/html'});
                res.end(content, 'utf8');
            });
        } else {
            // Sucess
            res.writeHead(200, { 'Content-Type': contentType});
            res.end(content, 'utf8');
        }
    });
});


/* ---------- MAIN SERVER START ---------- */
const PORT = process.env.PORT || 5000; // envirement var or 5000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


