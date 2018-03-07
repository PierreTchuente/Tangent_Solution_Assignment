/// <reference path="E:\Web_Site_Vs\Flow_Design\Flow_Design\node_modules/angular/angular.js" />

'use strict';

var mainMod = angular.module('mainApp', ['ui.router', 'loginModule', 'employeeModule']);
mainMod.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
 
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};

    $urlRouterProvider.otherwise('/login');

    $stateProvider
    .state('login', {
        url: '/login',
        templateUrl: '/View/login/login.html'
    }).state('dashboard', {
        url: '/dashboard',
        templateUrl: '/View/dashboard/dashboard.html'
    }).state('employee', {
        url: '/employee',
        templateUrl: '/View/employee/employee.html'
    })
}]).run(['$rootScope', '$http', function ($rootScope, $http) {
    $rootScope.isLogin = true;
    $rootScope.baseUrl = 'http://staging.tangent.tngnt.co';
}]);
