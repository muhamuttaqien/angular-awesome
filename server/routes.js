/**
 * Created by Muh. Angga Muttaqien on 08-Mar-16.
 */

/**
 * Main routes of api data
 */

module.exports = function(app, connection){

    // get data mahasiswa
    app.get('/api/mahasiswa', function(req, res){
        connection.query("SELECT * FROM mahasiswa", function(err, result, field){
            res.json(result);
        });
    });

    // post data mahasiswa
    app.post('/api/mahasiswa', function(req, res){
        var data_post = {
            no_induk: req.body.no_induk, // naturally passed trough req.param('no_induk')
            nama : req.body.nama, // naturally passed trough req.param('nama')
            alamat : req.body.alamat // naturally passed trough req.param('alamat')
        };
        connection.query("INSERT INTO mahasiswa SET ?", data_post,
            function(err, field){
                if(err) throw err;

                res.writeHead(302, {"Location" : "/#"});
                res.end();
            }
        );
    });

    // put data mahasiswa
    app.put('api/mahasiswa/:id_mhs', function(req, res){

        connection.query("SELECT * FROM mahasiswa WHERE ?",
            { no_induk: this.params.id },
            function(err, rows, field){

            }
        );
    });

    // delete data mahasiswa
    app.delete('/api/mahasiswa/:id_mhs', function(req, res){
        connection.query("DELETE FROM mahasiswa WHERE ?",
            { no_induk: req.params.id_mhs },
            function(err, field){
                if(err) throw err;

                res.writeHead(302, {"Location" : "/#"});
                res.end();
            });
    });

    // application route
    app.get('/', function(req, res){
        res.sendFile(__dirname + '/app/index.html');
    });
};
