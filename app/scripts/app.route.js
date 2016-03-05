/**
 * Created by Muh. Angga Muttaqien on 04-Mar-16.
 */


/**
 * Main route of the application
 */

(function(){

    'use strict';

    angular
        .module('app')
        .config(['$routeProvider', function($routeProvider){

            var routes, setRoutes;

            routes = ['dashboard', 'forms', 'pages/404'];

            setRoutes = function(route){
                var path, config;

                path = '/' + route; // cannot insert id
                config = {
                    templateUrl: 'views/' + route + '.html',
                    controller: route + 'Ctrl',
                    controllerAs: route
                };

                $routeProvider.when(path, config);
                return $routeProvider;
            };

            routes.forEach(function(route){
                return setRoutes(route);
            });

            $routeProvider
                .when('/', { redirectTo: '/dashboard' })
                .when('/404', { templateUrl: 'views/pages/404.html' })
                .otherwise({ redirectTo: '/404' });

        }]);
})();