/// <reference path="E:\Web_Site_Vs\Flow_Design\Flow_Design\node_modules/angular/angular.js" />

'use strict';

(function () {

    var mainMod = angular.module('employeeModule');
    mainMod.controller('employeeController', ['$state', '$scope', '$rootScope', '$http', '$log', 'employeeService', function ($state, $scope, $rootScope, $http, $log, employeeService) {

        $rootScope.description_title = "Employee List";
        $rootScope.breadcrumb_name = "Employee";

        var Token = $http.defaults.headers.common['Authorization']; // means User has reload the page. 
        if (Token === undefined) {
            $http.defaults.headers.common['Authorization'] = sessionStorage.getItem("Token");
        }
        employeeService.getAllEmployee().then(function (response) {

            debugger;

        }, function (error) {
            if (error.status === 403) {
                $state.go('login');
            }
            $log.log(error)
        });

    }]);

}());

