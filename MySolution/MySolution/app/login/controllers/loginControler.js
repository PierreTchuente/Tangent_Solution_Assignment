/// <reference path="E:\Web_Site_Vs\Flow_Design\Flow_Design\node_modules/angular/angular.js" />

'use strict';

(function () {

    var mainMod = angular.module('loginModule');
    mainMod.controller('loginController', ['$scope', '$rootScope', '$http', 'loginService', function ($scope, $rootScope, $http, loginService) {


        $scope.login = function () {

            loginService.loginMethod($scope.model.Username, $scope.model.Password).then(function (response) {

                debugger;

                var tokenString = "Token "+  response.data.token;
                $http.defaults.headers.post['Authorization'] = tokenString;   // Setting token for post request.
                $http.defaults.headers.common['Authorization'] = tokenString; //  Setting up token for get request.

                // Save Token in session storage  for other request.
                sessionStorage.setItem('Token', tokenString);

                //$.ajaxSetup({   // Setting up ajax header in case we make use of ajax.
                //    headers: {
                //        'Authorization': tokenString
                //    }});
            }, function (error) {

                $log.og(error + "Wrong Password or username");
            });
        }

        debugger;

    }]);

}());

