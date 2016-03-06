/**
 * Created by Muh. Angga Muttaqien on 05-Mar-16.
 */

/**
 * Main server of the applications
 */

var http    = require('http'),
    fs      = require('fs'),
    url     = require('url'),
    qString = require('querystring'),
    router  = require('routes')(),
    view    = require('swig'),
    mysql   = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    database: "db_jsawesome",
    user: "root",
    password: ""
});

router.addRoute('/', function(req, res){
    var html = view.compileFile('./templates/index.html')({
        title : "Index Page from Swig",
        qString: qString
    });

    res.writeHead(200, {"Content-Type" : "text/html"});
    res.end(html);
});

router.addRoute('/select', function(req, res){
    connection.query("SELECT * FROM mahasiswa", function(err, rows, field){
        if(err) throw err;

        res.writeHead(200, {"Content-Type" : "text/plain"});
        res.end(JSON.stringify(rows));
    });
});

router.addRoute('/insert', function(req, res){
    connection.query("INSERT INTO mahasiswa SET ?", {
        no_induk: "112085",
        nama: "Shofiyatul Fajri",
        alamat: "Rogojampi"
    }, function(err, field){
        if(err) throw err;

        res.writeHead(200, {"Content-Type" : "text/plain"});
        res.end(field.affectedRows+ " Affected Rows");
    });
});

router.addRoute('/update', function(req, res){
    connection.query("UPDATE mahasiswa SET ? WHERE ?", [
        { nama: "Mahrusafarni" },
        { no_induk: "112085" }
    ], function(err, field){
        if(err) throw err;

        res.writeHead(200, {"Content-Type" : "text/plain"});
        res.end(field.changedRows+ " Changed Rows");
    });
});

router.addRoute('/delete', function(req, res){
    connection.query("DELETE FROM mahasiswa WHERE ?",
        { no_induk: "112085" },
    function(err, field){
        if(err) throw err;

        res.writeHead(200, {"Content-Type" : "text/plain"});
        res.end(field.affectedRows+ " Deleted Rows");
    });
});

router.addRoute('/profile/:name?/:address?', function(req, res){
    res.writeHead(200, {"Content-Type" : "text/plain"});
    if(this.params.address) res.end("Profile Page => "+ this.params.name + " & " + this.params.address);
    else if(this.params.name) res.end("Profile Page => "+ this.params.name);
    else res.end("Profile Page");
});

http.createServer(function(req, res){
    var path = url.parse(req.url).pathname;
    var match = router.match(path);

    if(match){
        match.fn(req, res);
    }else {
        var html = view.compileFile('./templates/404.html')({
            title : "Page is Not Found",
            qString: qString
        });

        res.writeHead(404, {"Content-Type" : "text/html"});
        res.end(html);
    }
}).listen(9090);

console.log("Server is running...");