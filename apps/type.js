/*
 * Name: NotPike
 * File: type.js
 * Licence: MIT
 * Function: Returns content type
 */

class Type {

    findContentType(extname) {
    
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
            case '.wav':
                contentType = 'audio/wav';       // Download
                break;
            default:                             // Download everything else
                contentType = 'text/plain';
                break;          
        }
        return contentType;
    }

}

module.exports = Type;