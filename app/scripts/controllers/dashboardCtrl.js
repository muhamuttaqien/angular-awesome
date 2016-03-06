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
            Server.getDataFromServer('select')
                .then(function(response){
                        self.getData = response;
                });
        };
        self.init();


    }]);