/// <reference path="E:\Web_Site_Vs\Flow_Design\Flow_Design\node_modules/angular/angular.js" />

'use strict';

(function () {

    var mainMod = angular.module('dashboardModule');
    mainMod.controller('dashboardController', ['$state', '$scope', '$rootScope', '$http', '$log', 'employeeService', function ($state, $scope, $rootScope, $http, $log, employeeService) {

        $rootScope.description_title = "General Information";
        $rootScope.breadcrumb_name = "Dashboard";

        debugger;

        var User = $rootScope.GlobalServices.sharedDataService.getShareModel("UserProfile", "userData");
        $rootScope.fullName = User.first_name + " " + User.last_name;
        $rootScope.email = User.email;
        $rootScope.userName = User.username;
        $rootScope.isLogin = true;

        //Setting the  Authorization token before making the request.
        $http.defaults.headers.common['Authorization'] = sessionStorage.getItem("Token");

        employeeService.getAllEmployee().then(function (response) {

            debugger;

            $rootScope.GlobalServices.sharedDataService.setShareModel("Employee", "employeeList", response.data);

        }, function (error) {
            if (error.status === 403) {
                $state.go('login');
            }
            $log.log(error)
        });

    }]);

}());

