/*
 * Name: NotPike
 * File: route.js
 * Licence: MIT
 */

 /* ------------ REQUIREMENTS ------------ */
const path = require('path');

class Route {

    buildReqPath(req) {

        var target = "";

        switch(req.url) {
            case '/':
                target = "index.html"
                break;
            case '/about':
                target = "pages/about.html";
                break;
            case '/notes':
                target = "pages/notes.html";
                break;
            case '/notes_ble':
                target = "pages/notes_ble.html";
                break; 
            case '/notes_chemion':
                target = "pages/notes_chemion.html";
                break;
            case '/notes_nrf51822':
                target = "pages/notes_nrf51822.html";
                break;
            case '/notes_iridium':
                target = "pages/notes_iridium.html";
                break;
            case '/notes_yaesu_rpi':
                target = "pages/notes_yaesu_rpi.html";
                break;                                          
            case '/contact':
                target = "pages/contact.html";
                break;
            case '/login':
                target = "pages/login.html";
                break;
            case '/krad':
                target = "pages/krad.html";
                break;
            default:
                target = req.url;
                break;
        }
        return path.join(__dirname, '../public', target); // Nothing goes behind public
    }

}

// Exportable
module.exports = Route;