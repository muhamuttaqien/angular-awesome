!function(){"use strict";angular.module("app",["ngRoute","ngAnimate"])}(),function(){"use strict";angular.module("app").config(["$routeProvider",function(r){var t,e;t=["dashboard/dashboard","forms","pages/404"],e=function(t){var e,o;return e="/"+t,o={templateUrl:"views/"+t+".html",controller:t+"Ctrl",controllerAs:t},r.when(e,o),r},t.forEach(function(r){return e(r)}),r.when("/",{redirectTo:"/dashboard"}).when("/404",{templateUrl:"views/pages/404.html"}).otherwise({redirectTo:"/404"})}])}(),function(){"use strict";function r(r,t,e,o){}angular.module("app").controller("AppCtrl",["$scope","$rootScope","$http","$routeParams",r])}();