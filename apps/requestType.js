/*
 * Name: NotPike
 * File: request_type.js
 * Licence: MIT
 * Function: Handles POST, PUT, etc...
 */

class RequestType {

    postRX(req, logger) {

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
                case '/hack':
                    logger.log(pData);
                    break;
            }
        });

    }

}

module.exports = RequestType;