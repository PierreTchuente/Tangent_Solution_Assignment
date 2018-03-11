/// <reference path="E:\Web_Site_Vs\Flow_Design\Flow_Design\node_modules/angular/angular.js" />

'use strict';

(function () {

    var mainMod = angular.module('loginModule');
    mainMod.factory('loginService', ['$http', '$rootScope', '$log', function ($http, $rootScope, $log) {

        var loginMethod = function (username, password) {

            if (username !== "" && password !== "") {
                return $http({
                    method: 'POST',
                    url: $rootScope.baseUrl + '/api-token-auth/',
                    data: { username: username, password: password }
                })
            }
            else {
                return null;
            }
        }

        return {
            loginMethod: loginMethod
        };

    }]);

}());