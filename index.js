/*
 * Name: NotPike
 * File: index.js
 * Licence: MIT
 */

 
/* ----------REQUIREMENTS---------- */
const Logger = require('./apps/logger');


//logger
const logger = new Logger();
logger.on('message', (data) => console.log("Called Listener: ", data));
//logger.log('test');


