/*
 * Name: NotPike
 * File: logger.js
 * Licence: MIT
 */

/* ----------REQUIREMENTS---------- */
const EventEmitter = require('events');
const fs = require ('fs');
const path = require('path');


class Logger extends EventEmitter {

    fileWrite(msg) {
        if(!fs.existsSync(path.join(__dirname, '../log', 'log.txt'))) {// If file dosen't exist
            fs.writeFile(path.join(__dirname, '../log', 'log.txt'),
                         msg + '\r\n' , err => {                       // Create log.txt and write
                if(err) throw err;                                     
                console.log('Log Created...');                                 
            }); 
        } else {                                                       // Else append log.txt
            fs.appendFile(path.join(__dirname, '../log', 'log.txt'),
                          msg + '\r\n', err => {
                if(err) throw err;
                console.log('Log Updated...');
            }); 
        }
    }

    log(msg) {
        var date = Date.now();
        this.emit('message', { date , msg });
        this.fileWrite("> " + date + ": " + msg);
    }
}

// Exportable
module.exports = Logger;