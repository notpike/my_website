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


/* ---------- MAIN SERVER LOOP ---------- */
const server = http.createServer((req,res) => {
    
    // Handle Post Requests
    if (req.method === 'POST') {
        //console.log("POST! :D");
        let pData ='';
        req.on('data', chunk => {
            pData += chunk.toString(); // Buf 2 Str
        });
        req.on('end', () => {
            logger.log(pData);
        });
    }


    // Build the file path
    var target = "";
    if (req.url === '/')  {
        target = "index.html";
    } else if(req.url === '/about') {
        target = "pages/about.html";
    } else if(req.url === '/notes') {
        target = "pages/notes.html";
    } else if(req.url === '/contact') {
        target = "pages/contact.html";
    } else if(req.url === '/login') {
        target = "pages/login.html";
    } else {
        target = req.url;
    }
    let filePath = path.join(__dirname, 'public', target);

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


