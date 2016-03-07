/**
 * Created by Muh. Angga Muttaqien on 05-Mar-16.
 */

/**
 * Main server of the applications
 */

var express         = require('express'),
    app             = express(),
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


app.use('/', express.static(__dirname + ''));
app.use('/', express.static(__dirname + '/app'));
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

app.get('/', function(req, res){
    res.sendFile(__dirname + '/app/index.html');
});

app.get('/api/mahasiswa', function(req, res){
    connection.query("SELECT * FROM mahasiswa", function(err, rows, field){
        res.json(rows);
    });
});

app.listen(9090, function(){
    console.log("Nodeserver is running...");
});

