
module.exports = function(app, connection){

    // get data mahasiswa
    app.get('/api/mahasiswa', function(req, res){
        connection.query("SELECT * FROM mahasiswa", function(err, rows, field){
            res.json(rows);
        });
    });

    // post data mahasiswa
    app.post('/api/mahasiswa/insert', function(req, res){

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

                        res.writeHead(302, {"Location" : "/]"});
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

    // put data mahasiswa
    app.put('api/mahasiswa/update/:id', function(req, res){

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

    // delete data mahasiswa
    app.delete('api/mahasiswa/delete/:id', function(req, res){
        connection.query("DELETE FROM mahasiswa WHERE ?",
            { no_induk: this.params.id },
            function(err, field){
                if(err) throw err;

                res.writeHead(302, {"Location" : "/select"});
                res.end();
            });
    });

    // application route
    app.get('/', function(req, res){
        res.sendFile(__dirname + '/app/index.html');
    });
};
