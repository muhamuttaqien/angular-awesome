/**
 * Created by Muh. Angga Muttaqien on 05-Mar-16.
 */

/**
 * Main server of the applications
 */

var express = require('express');
var app = express();

app.use('/', express.static(__dirname + ''));
app.use('/', express.static(__dirname + '/app'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/app/index.html');
});

app.listen(9090, function(){
    console.log("Nodeserver is running...");
});

