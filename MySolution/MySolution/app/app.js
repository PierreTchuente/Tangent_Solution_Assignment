/// <reference path="E:\Web_Site_Vs\Flow_Design\Flow_Design\node_modules/angular/angular.js" />

'use strict';

var mainMod = angular.module('mainApp', ['ui.router', 'sharedDataServiceModule', 'loginModule', 'employeeModule', 'dashboardModule']);
mainMod.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider
    .state('login', {
        url: '/login',
        templateUrl: 'View/login/login.html'
    }).state('dashboard', {
        url: '/dashboard',
        templateUrl: 'View/dashboard/dashboard.html'
    }).state('employee', {
        url: '/employee',
        templateUrl: 'View/employee/employee.html'
    })
}]).run(['$rootScope', '$http', 'sharedDataService', function ($rootScope, $http, sharedDataService) {
    $rootScope.isLogin = false;
    $rootScope.baseUrl = 'http://staging.tangent.tngnt.co'; // Setting up the base url for webservices calls.
    $rootScope.GlobalServices = {};
    $rootScope.GlobalServices.sharedDataService = sharedDataService;

}]).controller('mainController', ['$scope', '$rootScope', '$state', function ($scope, $rootScope, $state) {

    $scope.logOut = function () {
        sessionStorage.clear(); //Clear the content of the entire session storage.
        $rootScope.isLogin = false;
        $rootScope.GlobalServices.sharedDataService.CleanUpService(); // Clean up the service.
        $state.go('login');
    }

    $scope.viewMyProfile = function () {
        $state.go('profile');
    }

}]);
