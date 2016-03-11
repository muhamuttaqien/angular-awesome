/**
 * Created by Muh. Angga Muttaqien on 05-Mar-16.
 */

/**
 * Main server of the applications
 */

var express         = require('express'),
    app             = express(),
    port            = process.env.PORT || 9090, // set the port
    morgan          = require('morgan'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    mysql           = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    database: "db_jsawesome",
    user: "root",
    password: ""
});

// configuration
app.use('/', express.static(__dirname + '')); // to set all resources's place
app.use('/', express.static(__dirname + '/app')); // to set all resources's place
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

// routes
require('./server/routes.js')(app, connection);

// listen port
app.listen(port, function(){
    console.log("nodeserver is running on port 9090...");
});

