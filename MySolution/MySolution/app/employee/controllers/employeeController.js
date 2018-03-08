/// <reference path="E:\Web_Site_Vs\Flow_Design\Flow_Design\node_modules/angular/angular.js" />

'use strict';

(function () {

    var mainMod = angular.module('employeeModule');
    mainMod.controller('employeeController', ['$state', '$scope', '$rootScope', '$http', '$log', '$filter', 'employeeService', function ($state, $scope, $rootScope, $http, $log, $filter, employeeService) {

        $rootScope.description_title = "Employee List";
        $rootScope.breadcrumb_name = "Employee";

        $http.defaults.headers.common['Authorization'] = sessionStorage.getItem("Token");
        $scope.Employee_ListDetails = $rootScope.GlobalServices.sharedDataService.getShareModel("Employee", "employeeList");

        $.each($scope.Employee_ListDetails, function (index, item) {

            var birth_date = $filter('date')(item.birth_date, 'mediumDate');
            var gender = utility_Gender(item.gender);
            var race = utility_Race(item.race);
            tableDetaiils.row.add([item.user.first_name + ' ' + item.user.last_name,
                item.position.level + ' ' + item.position.name,
                item.years_worked,
                item.email,
                item.phone_number,
                gender,
                birth_date, item.age,
                race]); // Adding rows in table.
        });
        tableDetaiils.draw();

        //Array Object to build our dropdwons
        $scope.model = {};
        $scope.model.Races = [{ value: 'All', key: 0 }, { value: 'Black African', key: 'B' }, { value: 'Coloured', key: 'C' }, { value: 'Indian or Asian', key: 'I' }, { value: 'White', key: 'W' }, { value: 'None Dominant', key: 'N' }];
        $scope.model.Genders = [{ value: 'All', key: 0 }, { value: 'Male', key: 'M' }, { value: 'Female', key: 'F' }];
        $scope.model.Positions = [{ value: 'All', key: 0 }, { value: 'Front-end Developer', key: 1 }, { value: 'Back-end Developer', key: 2 }, { value: 'Project Manager', key: 3 }];

        var timer = setTimeout(function () {

            $scope.model.position = { value: 'All', key: 0 };
            clearTimeout(timer);
        }, 0);
      

        $scope.filter = function () {

            var p = $scope.model.position;

            debugger;
        }

    }]);

}());

