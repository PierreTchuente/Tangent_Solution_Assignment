/// <reference path="E:\Web_Site_Vs\Flow_Design\Flow_Design\node_modules/angular/angular.js" />

'use strict';

(function () {

    var mainMod = angular.module('loginModule');
    mainMod.controller('loginController', ['$scope', '$rootScope', '$state', '$http', '$log', 'loginService', 'sharedDataService', function ($scope, $rootScope, $state, $http, $log, loginService, sharedDataService) {

        $rootScope.description_title = "LogIn Form";
        $rootScope.breadcrumb_name = "login";
        $scope.has_error = false;

        $scope.login = function () {

            loginService.loginMethod($scope.model.Username, $scope.model.Password).then(function (response) {

                var tokenString = "Token " + response.data.token;
                $http.defaults.headers.post['Authorization'] = tokenString;   // Setting token for post request.
                $http.defaults.headers.common['Authorization'] = tokenString; // Setting up token for get request.

                var User = null;
                $http({
                    method: 'GET',
                    url: $rootScope.baseUrl + '/api/user/me/'
                })
                .then(function (response) {

                    User = response.data;

                    //Making sure that only active users have access.
                    if (User.is_active === true || User.is_active === "true") {

                        sessionStorage.setItem('User', JSON.stringify(User)); // We are keeping a copy of the data to avoid unnecesary request.                       
                        sessionStorage.setItem('Token', tokenString);  // Save Token in session storage  for other request.
                        $rootScope.isLogin = true;
                        $state.go('dashboard'); //redirect to the Dashboard if Success.
                    } else {
                        $('#error_message').html('Your are not an active user. Please contact system admin.');
                    }

                }, function (error) {
                    //In case of faillure.
                    $('#error_message').html('Sorry!! something went wrong.');
                });

            }, function (error) {
                $('#error_message').html('UserName or Password is incorect');
                $scope.has_error = true;
                $log.log(error);
            });
        }

    }]);

}());

