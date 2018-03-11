/// <reference path="E:\Web_Site_Vs\Flow_Design\Flow_Design\node_modules/angular/angular.js" />

'use strict';

(function () {

    var mainMod = angular.module('employeeModule');
    mainMod.factory('employeeService', ['$http', '$rootScope', '$log', function ($http, $rootScope, $log) {

        var getAllEmployee = function () {
            return $http.get($rootScope.baseUrl + '/api/employee/');
        }

        return {
            getAllEmployee: getAllEmployee
        };

    }]);

}());