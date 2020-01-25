/*
 * Name: NotPike
 * File: index.js
 * Licence: MIT
 */


/* ------------ REQUIREMENTS ------------ */
const Logger = require('./apps/logger');
const Krad = require('./apps/krad');
const http = require('http');
const path = require('path');
const fs = require('fs');
const { parse } = require('querystring');


/* ---------- LOGGING FUNCTION ---------- */
const logger = new Logger();
logger.on('message', (data) => console.log("Called Listener: ", data));
logger.log("Server Startup");

/* ------------- KRAD PAGE -------------- */
const kr = new Krad();


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

/* ------------ ROUTER FUNCTION ----------- */
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
        case '/notes_ble':
            target = "pages/notes_ble.html";
            break; 
        case '/notes_chemion':
            target = "pages/notes_chemion.html";
            break;
        case '/notes_nrf51288':
            target = "pages/notes_nrf51288.html";
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
    return path.join(__dirname, 'public', target); // Nothing goes behind public
}

/* -------- CONTENT TYPE FUNCTION ------- */
function findContentType(extname) {
    
    let contentType;            
    //contentType = 'text/html';
    switch(extname) {                         // Check extname and set contentType
        case '.html':
            contentType = 'text/html';
            break;
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
        case '.zip':                         // Download
            contentType = 'application/zip';
            break;
        case '.pdf':                         // Download
            contentType = 'application/pdf';  
            break; 
        default:                             // Download everything else
            contentType = 'text/plain';
            break;          
    }
    return contentType;
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
    
    // Find Content Type (ex. 'text/html')
    let contentType = findContentType(extname);

    // Read file
    fs.readFile(filePath, (err, content) => {
    
        if(err) {
            // Any error goes to the 404 page
            fs.readFile(path.join(__dirname, 'public/pages/', '404.html'), (err, content) => {
                res.writeHead(200, { 'Content-Type': 'text/html'});
                res.end(content, 'utf8');
            });
            
        } else {
            // Sucess!

            // Hacky hack hack hack! :D
            // Lets load a list of links and update krad.html!
            if(req.url === '/krad') {
                content = content.toString();
                content = kr.buildContent(content)
            }

            // if(extname === '.pdf' || extname === '.zip' || contentType === 'text/plain') { // DOWNLOAD
            if(extname === '.pdf' || extname === '.zip') { // DOWNLOAD

                res.writeHead(200, {
                    "Content-Type": contentType,
                    "Content-disposition": "attachment; filename=" + path.basename(req.url)
                });

                const inputStream = fs.createReadStream(filePath);
                inputStream.pipe(res);
            } else {                                                                      // WEB PAGE
                res.writeHead(200, { 'Content-Type': contentType});
                res.end(content, 'utf8');
            }
        }
    });
});


/* ---------- MAIN SERVER START ---------- */
const PORT = process.env.PORT || 5000; // envirement var or 5000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


