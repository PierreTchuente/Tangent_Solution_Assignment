/// <reference path="E:\Web_Site_Vs\Flow_Design\Flow_Design\node_modules/angular/angular.js" />

'use strict';

(function () {

    var mainMod = angular.module('loginModule');
    mainMod.controller('loginController', ['$scope', '$rootScope', '$state', '$http', '$log', 'loginService', function ($scope, $rootScope, $state, $http, $log, loginService) {

        $rootScope.viewName = "LogIn Form";
        $rootScope.view_lowerName = "login";
        $scope.has_error = false;

        $scope.login = function () {

            loginService.loginMethod($scope.model.Username, $scope.model.Password).then(function (response) {

                debugger;

                var tokenString = "Token " + response.data.token;
                $http.defaults.headers.post['Authorization'] = tokenString;   // Setting token for post request.
                $http.defaults.headers.common['Authorization'] = tokenString; //  Setting up token for get request.

                // Save Token in session storage  for other request.
                sessionStorage.setItem('Token', tokenString);
                $rootScope.isLogin = true;
                $state.go('dashboard'); // redirect to the Dashboard if Success.
            }, function (error) {

                debugger;

                $scope.has_error = true;
                $log.log(error);
                $state.go('login'); // redirect to the log in if there is an error.
                
            });
        }

    }]);

}());

