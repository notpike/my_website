/*
 * Name: NotPike
 * File: index.js
 * Licence: MIT
 */


/* ------------ REQUIREMENTS ------------ */
const Logger = require('./apps/logger');
const Krad = require('./apps/krad');
const Route = require('./apps/route');
const Type = require('./apps/type');

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
const route = new Route();


/* -------- CONTENT TYPE FUNCTION ------- */
const type = new Type();


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
                // Header Bar
                let headerBarPath = path.join(__dirname, '/public/pages/parts/headerBar.html');
                let headerBar = fs.readFileSync(headerBarPath);
                content = content.toString().replace('@linkBar', headerBar);

                // Note Bar
                let noteBarPath = path.join(__dirname, '/public/pages/parts/noteBar.html');
                let noteBar = fs.readFileSync(noteBarPath);
                content = content.toString().replace('@noteBar', noteBar);

                // Footer
                let footerPath = path.join(__dirname, '/public/pages/parts/footer.html');
                let footer = fs.readFileSync(footerPath);
                content = content.toString().replace('@footer', footer);

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


