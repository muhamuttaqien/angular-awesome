/**
 * Created by Muh. Angga Muttaqien on 05-Mar-16.
 */


angular
    .module('app')
    .directive('sidebarSearch', function(){

        return {
            templateUrl: 'scripts/directives/sidebar/sidebar-search/sidebar-search.html',
            restrict: 'E',
            replace: true,
            scope: {
            },
            controller: function($scope){
                $scope.selectedMenu = 'home';
            }
        };

    });