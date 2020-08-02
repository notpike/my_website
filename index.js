/*
 * Name: NotPike
 * File: index.js
 * Licence: MIT
 * Function: Main
 */


/* ------------ REQUIREMENTS ------------ */
const Logger = require('./apps/logger');
const Krad = require('./apps/krad');
const Route = require('./apps/route');
const Type = require('./apps/type');
const PageGen = require('./apps/pageGen');

const http = require('http');
const path = require('path');
const fs = require('fs');
const { parse } = require('querystring');


/* ---------- LOGGING FUNCTION ---------- */
const logger = new Logger();
logger.on('message', (data) => console.log("Called Listener: ", data));
logger.log("Server Startup");


/* ------------ ROUTER ----------- */
const route = new Route();


/* -------- CONTENT TYPE ------- */
const type = new Type();


/* -------- PAGE GENERATION------- */
const pageGen = new PageGen();


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


/* ---------- MAIN SERVER LOOP ---------- */
const server = http.createServer((req,res) => {
    
    // Handle Post Requests
    if (req.method === 'POST') {
        postRX(req);
    }

    // Build the file path
    let filePath = route.buildReqPath(req);
 
    // Extension of file
    let extname = path.extname(filePath); 
    
    // Find Content Type (ex. 'text/html')
    let contentType = type.findContentType(extname);

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

            // Load dynamic list
            if(req.url === '/krad') {
                content = content.toString();
                content = kr.buildContent(content)
            }

            // Downloads
            if(extname === '.pdf' || extname === '.zip') {
                res.writeHead(200, {
                    "Content-Type": contentType,
                    "Content-disposition": "attachment; filename=" + path.basename(req.url)
                });

                const inputStream = fs.createReadStream(filePath);
                inputStream.pipe(res);
            } 
            
            // Load Webpage
            else {
                // Page Generator
                if(contentType == 'text/html') {
                    content = pageGen.buildPage(content);
                }

                // Return Webpage
                res.writeHead(200, { 'Content-Type': contentType});
                res.end(content, 'utf8');
            }
        }
    });
});


/* ---------- MAIN SERVER START ---------- */
const PORT = process.env.PORT || 5000; // envirement var or 5000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));