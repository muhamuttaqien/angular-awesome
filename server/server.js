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
    var html = view.compileFile('../app/index.html')();

    res.writeHead(200, {"Content-Type" : "text/html"});
    res.end(html);
});

router.addRoute('/select', function(req, res){
    connection.query("SELECT * FROM mahasiswa", function(err, rows, field){
        if(err) throw err;

        var html = view.compileFile('./templates/table.html')({
            title   : "Data Mahasiswa",
            data    : rows
        });
        res.writeHead(200, {"Content-Type" : "text/html"});
        res.end(html);
    });
});

router.addRoute('/insert', function(req, res){

    if(req.method.toUpperCase() == "POST"){
        // insert data process
        var data_post = "";
        req.on('data', function(chunck){
            data_post += chunck;
        });

        req.on('end', function(){
            data_post = qString.parse(data_post);
            connection.query("INSERT INTO mahasiswa SET ?", data_post,
                function(err, field){
                    if(err) throw err;

                    res.writeHead(302, {"Location" : "/select"});
                    res.end();
                    //res.end(field.affectedRows+ " Affected Rows");
                }
            );
        });
    } else {
        var html = view.compileFile('./templates/form.html')();
        res.writeHead(200, {"Content-Type" : "text/html"});
        res.end(html);
    }
});

router.addRoute('/update/:id', function(req, res){

    connection.query("SELECT * FROM mahasiswa WHERE ?",
        { no_induk: this.params.id },
        function(err, rows, field){
            if(rows.length){
                var data = rows[0];
                if(req.method.toUpperCase() == "POST"){
                    var data_post = "";

                    req.on('data', function(chunck){
                        data_post += chunck;
                    });

                    req.on('end', function(){
                        data_post = qString.parse(data_post); // ubah dari querystring menjadi data JSON
                        connection.query("UPDATE mahasiswa SET ? WHERE ?", [
                            data_post,
                            { no_induk: data.no_induk }
                        ], function(err, field){
                            if(err) throw err;

                            res.writeHead(302, {"Location" : "/select"});
                            res.end();
                            //res.end(field.changedRows+ " Changed Rows");
                        });
                    });
                } else {
                    var html = view.compileFile('./templates/form_update.html')({
                        data: data
                    });
                    res.writeHead(200, {"Content-Type" : "text/html"} );
                    res.end(html);
                }
            }else {
                var html = view.compileFile('./templates/404.html')();
                res.writeHead(404, {"Content-Type" : "text/html"});
                res.end(html);
            }
        }
    );
});

router.addRoute('/delete/:id', function(req, res){
    connection.query("DELETE FROM mahasiswa WHERE ?",
        { no_induk: this.params.id },
    function(err, field){
        if(err) throw err;

        res.writeHead(302, {"Location" : "/select"});
        res.end();
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