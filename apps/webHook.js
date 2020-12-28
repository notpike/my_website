/*
 * Name: NotPike
 * File: webHook.js
 * Licence: MIT
 * Function: Web Hook Function for github
 */

/* ------------ REQUIREMENTS ------------ */
require('dotenv').config()
const crypto = require('crypto');
const exec = require('child_process').exec;

 class WebHook {

     webHook(req, logger) {

        const repo = "/var/www/my_website";
        const secret = process.env.WEBHOOK_PASS;
        
        req.on('data', function (chunk) {
            
            // Generate hash of expected password
            let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');

            if (req.headers['x-hub-signature'] == sig) {
                logger.log("Git Pull, Server Restart");      // LOG EVENT
                exec('cd ' + repo + ' && git pull && pm2 restart all', (error, stdout, stderr) => { // CD, Pull, Restart
                    if (error) {
                        console.error(`exec error: ${error}`);
                        return;
                    }
                    console.log(`stdout: ${stdout}`);
                    console.error(`stderr: ${stderr}`);
                });
            } 
        });
    }

 }

module.exports = WebHook;