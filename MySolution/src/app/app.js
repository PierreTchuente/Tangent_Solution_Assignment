/// <reference path="E:\Web_Site_Vs\Flow_Design\Flow_Design\node_modules/angular/angular.js" />

'use strict';

var mainMod = angular.module('mainApp', ['ui.router', 'sharedDataServiceModule', 'loginModule', 'employeeModule', 'dashboardModule', 'profileModule']);
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
    }).state('profile', {
        url: '/profile',
        templateUrl: 'View/profile/profile.html'
    })
}]).run(['$rootScope', '$http', 'sharedDataService', function ($rootScope, $http) {

    $rootScope.isLogin = false;
    $rootScope.baseUrl = 'http://staging.tangent.tngnt.co'; // Setting up the base url for webservices calls.

}]).controller('mainController', ['$scope', '$rootScope', '$state', 'sharedDataService', function ($scope, $rootScope, $state, sharedDataService) {

    var token = sessionStorage.getItem("Token");
    if (token !== undefined && token !== null && token !== "") { //This means the user has already login. He is refreshing the page.

      var User = sessionStorage.getItem('User');
      if (User !== undefined && User !== null && User !== "") {
            User = JSON.parse(User);
            $rootScope.fullName = User.first_name + " " + User.last_name;
            $rootScope.email = User.email;
            $rootScope.userName = User.username;
            $rootScope.isLogin = true;
        }
    }

    $scope.logOut = function () {
        sessionStorage.clear(); //Clear the content of the entire session storage.
        $rootScope.isLogin = false;
        sharedDataService.CleanUpService(); // Clean up the service.
        $state.go('login');
    }

    $scope.viewMyProfile = function () {
        $state.go('profile');
    }

}]);
