/**
 * Created by Muh. Angga Muttaqien on 05-Mar-16.
 */


angular
    .module('app')
    .controller('dashboardCtrl', ['$scope', 'Server', function($scope, Server){
        var self = this;

        self.title = "Dashboard";
        self.state = "Controller is actived.";
        self.init = function(){
            Server.get('api/mahasiswa')
                .then(function(response){
                        self.getData = response;
                        self.getCount = response.length;
                });
        };
        self.init();

        self.delete = function(id_mhs){
            if(confirm('Apa anda yakin?')){
                Server.delete(id_mhs)
                    .then(function(response){
                        self.getData = response;
                    });
            }
        }
    }]);