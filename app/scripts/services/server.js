/**
 * Created by Muh. Angga Muttaqien on 05-Mar-16.
 */


(function(){
    'use strict';

    angular
        .module('app')
        .factory('Server', ['$http', '$q', function($http, $q){

            var self = this;
            self.base_path = "http://localhost:9090/";

            return {

                /**
                 * GET
                 */

                getDataFromServer: function(){
                    var params = '';
                    for(var i = 0, x = arguments.length; i < x ; i++){
                        params += arguments[i]+ '/';
                    }

                    return $http.get(self.base_path + params)
                        .then(function(response){
                            if(response.data){
                                return response.data;
                            } else {
                                return $q.reject(response.data);
                            }
                        }, function(response){
                            return $q.reject(response.data);
                        });

                },

                /**
                 * POST
                 */

                posDataToServer: function(){
                    var params = '',
                        data = {};

                    for(var i = 0, x = arguments.length; i < x; i++){
                        if(typeof arguments[i] === 'object'){
                            data = arguments[i];
                        } else {
                            params += arguments[i] + '/';
                        }
                    }

                    return $http.post(self.base_path + params, data)
                        .then(function(response){
                            if(response.data){
                                return response.data;
                            } else {
                                return $q.reject(response.data);
                            }
                        }, function(response){
                            return $q.reject(response.data);
                        });
                }

            };

        }]);

}).call(this);
