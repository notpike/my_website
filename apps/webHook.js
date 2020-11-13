/*
 * Name: NotPike
 * File: webHook.js
 * Licence: MIT
 * Function: Web Hook Function for github
 */

/* ------------ REQUIREMENTS ------------ */
const crypto = require('crypto');
const exec = require('child_process').exec;

 class WebHook {

    webHook(req, logger) {
        const repo = "/var/www/my_website";
        const secret = "noMoreSecrets";
        
        req.on('data', function (chunk) {
            let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');
            logger.log("Sig: " + sig);
            if (req.headers['x-hub-signature'] == sig) {
                logger.log("Git Pull")
                exec('cd ' + repo + ' && git pull');
            }
        });
    }

 }

module.exports = WebHook;