﻿/// <reference path="E:\Web_Site_Vs\Flow_Design\Flow_Design\node_modules/angular/angular.js" />

'use strict';

(function () {

    var mainMod = angular.module('loginModule');
    mainMod.controller('loginController', ['$scope', '$rootScope', '$state', '$http', '$log', 'loginService', function ($scope, $rootScope, $state, $http, $log, loginService) {

        $rootScope.description_title = "LogIn Form";
        $rootScope.breadcrumb_name = "login";
        $scope.has_error = false;

        $scope.login = function () {

            loginService.loginMethod($scope.model.Username, $scope.model.Password).then(function (response) {

                debugger;

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
                        //$scope.model.fullname = User.first_name + " " + User.last_name;
                        //$scope.model.email = User.email;
                        //$scope.model.username = User.username;
                        $rootScope.GlobalServices.sharedDataService.setShareModel("UserProfile", "userData", User); // We are keeping a copy of the data to avoid unnecesary request.

                        // Save Token in session storage  for other request.
                        sessionStorage.setItem('Token', tokenString);
                       // $rootScope.isLogin = true;
                        $state.go('dashboard'); // redirect to the Dashboard if Success.
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
                //$state.go('login'); // redirect to the log in if there is an error.
            });
        }

    }]);

}());

