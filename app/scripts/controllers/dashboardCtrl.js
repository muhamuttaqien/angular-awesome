/**
 * Created by Muh. Angga Muttaqien on 05-Mar-16.
 */


angular
    .module('app')
    .controller('dashboardCtrl', ['$scope',function($scope){
        var self = this;

        self.title = "Dashboard";
        self.state = "Controller is actived.";
    }]);