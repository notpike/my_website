/*
 * Name: NotPike
 * File: route.js
 * Licence: MIT
 * Function: Routing tables
 */

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
            case '/notes_unipager_gm300':              //LEGACY URI
                target = "pages/notes_unipager.html";
                break;
            case '/notes_unipager':
                target = "pages/notes_unipager.html";
                break;
            case '/notes_mmdvm_gm300':
                target = "pages/notes_mmdvm_gm300.html";
                break;   
            case '/notes_math':
                target = "pages/notes_math.html";
                break;   
            case '/notes_lte':
                target = "pages/notes_lte.html";
                break; 
            case '/anarchy_bombs':
                target = "pages/anarchy_bombs.html";
                break; 
            case '/anarchy_guns':
                target = "pages/anarchy_guns.html";
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
            case '/logo':
                target = "pages/logo.html";
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