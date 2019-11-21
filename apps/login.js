/*
 * Name: NotPike
 * File: login.js
 * Licence: MIT
 */

 /* ----------REQUIREMENTS---------- */
//var mysql = require ('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

//logger
const logger = new Logger();
logger.on('message', (data) => console.log("Called Listener: ", data));

// Express init
var app = express();
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json());

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/auth', function(req, res) {
    var uname = request.body.uname;
    var pword = request.body.pword;
    console.log(uname, ":", pword);
});