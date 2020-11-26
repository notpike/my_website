/*
 * Name: NotPike
 * File: index.js
 * Licence: MIT
 * Function: Main
 */


/* ------------ REQUIREMENTS ------------ */
require('dotenv').config()
const Logger = require('./apps/logger');
const Krad = require('./apps/krad');
const Route = require('./apps/route');
const Type = require('./apps/type');
const PageGen = require('./apps/pageGen');
const RequestType = require('./apps/requestType');
const WebHook = require('./apps/webHook');

const http = require('http');
const path = require('path');
const fs = require('fs');
const cookie = require('cookie');
const { parse } = require('querystring');
const url = require('url');


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
const request = new RequestType();

/* ------------ WEBHOOK FUNCTION ----------- */
const webHook = new WebHook();


/* ---------- MAIN SERVER LOOP ---------- */
const server = http.createServer((req,res) => {
    
    // Check for WebHook
    webHook.webHook(req);

    // Handle Post Requests
    // /login 
    // /hack
    if (req.method === 'POST') {
        request.postRX(req, logger);
    }

    // Cookie
    var cookies = cookie.parse(req.headers.cookie || '');
    var name = cookies.name;
    
    if(name != 'bad-radio.solutions') {
        //Cookie test
        res.setHeader('Set-Cookie', cookie.serialize('name', 'bad-radio.solutions', {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7 // 1 week
        }));

        res.statusCode = 302;
        res.setHeader('Location', req.headers.referer || '/')
        res.end();
        return;
    }

    // Build the file path
    let filePath = route.buildReqPath(req);
 
    // Extension of file
    let extname = path.extname(filePath); 
    
    // Find Content Type (ex. 'text/html')
    let contentType = type.findContentType(extname);

    // Record Get Requests to /hack
    // http://localhost:5000/hack?a=value1
    if (req.url.startsWith('/hack')) {
        const queryObject = url.parse(req.url, true).query;

        // If GET request has content record IP address and info
        if(queryObject != null) {
            var ip = req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                (req.connection.socket ? req.connection.socket.remoteAddress : null);

            logger.log(ip + ': ' + queryObject.a);
        }
    }

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
            if(extname === '.pdf' || extname === '.zip' || extname === '.wav') {
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
                res.writeHead(200, {'Content-Type': contentType});
                res.end(content, 'utf8');
            }
        }
    });
});


/* ---------- MAIN SERVER START ---------- */
const PORT = process.env.PORT || 5000; // envirement var or 5000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));