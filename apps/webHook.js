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

    webHook(req) {
        const repo = "/var/www/my_website";
        const secret = process.env.WEBHOOK_PASS;
        
        req.on('data', function (chunk) {
            let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');
            if (req.headers['x-hub-signature'] == sig) {
                exec('cd ' + repo + ' && git pull');
                exec('pm2 restart all');
            }
        });
    }

 }

module.exports = WebHook;