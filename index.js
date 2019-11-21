/*
 * Name: NotPike
 * File: index.js
 * Licence: MIT
 */


/* ----------REQUIREMENTS---------- */
const Logger = require('./apps/logger');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req,res) => {
    
    //build the file path
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

    // extension of file
    let extname = path.extname(filePath);

    // init content type
    let contentType = 'text/html';

    // check ext and set content type
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

    // read file
    fs.readFile(filePath, (err, content) => {
        if(err) {
            fs.readFile(path.join(__dirname, 'public/pages/', '404.html'), (err, content) => {
                res.writeHead(200, { 'Content-Type': 'text/html'});
                res.end(content, 'utf8');
            });
        } else {
            //sucess
            res.writeHead(200, { 'Content-Type': contentType});
            res.end(content, 'utf8');
        }
    });
});

const PORT = process.env.PORT || 5000; // envirement var or 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


