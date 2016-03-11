/**
 * Created by Muh. Angga Muttaqien on 05-Mar-16.
 */

angular
    .module('app')
    .directive('sidebar', ['$location', function(){

        return {
            templateUrl: 'scripts/directives/sidebar/sidebar.html',
            restrict: 'E',
            replace: false, // when setting true it is getting error
            scope: {
            },
            controller: function($scope){
                $scope.selectedMenu = 'dashboard';

            }
        };

    }]);