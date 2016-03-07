/**
 * Created by Muh. Angga Muttaqien on 05-Mar-16.
 */


angular
    .module('app')
    .controller('formsCtrl', ['$scope',function($scope){
        var self = this;

        self.title = "Forms";
        self.state = "Controller is actived.";
    }]);