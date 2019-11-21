const EventEmitter = require('events');
const fs = require ('fs');

class Logger extends EventEmitter {
    log(msg) {
        var date = Date.now();
        this.emit('message', { date , msg });
    }
}

// Exportable
module.exports = Logger;