﻿
import { utility_Gender, utility_Race, utility_Review, utility_isSenior, utility_isMale } from '../../../assets/js/Utility_Function'; // importing my utilities function.
                                                                                                                                      // *%*Note: Pierre - Remember in a near future to find a way to globally expose your utilities functions.

'use strict';

(function () {

    var mainMod = angular.module('employeeModule');
    mainMod.controller('employeeController', ['$state', '$scope', '$rootScope', '$http', '$log', '$filter', 'employeeService', 'sharedDataService', function ($state, $scope, $rootScope, $http, $log, $filter, employeeService, sharedDataService) {

        $rootScope.description_title = "Employee List";
        $rootScope.breadcrumb_name = "Employee";
      
        var Employee_ListDetails = sharedDataService.getShareModel("Employee", "employeeList");

        if (Employee_ListDetails === null) {

            $http.defaults.headers.common['Authorization'] = sessionStorage.getItem("Token");
            employeeService.getAllEmployee().then(function (response) { //Request the List of Employee

                $log.log(response.data);
                sharedDataService.setShareModel("Employee", "employeeList", response.data);
                $.each(response.data, function (index, item) {

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

            }, function (error) {
                if (error.status === 403) {
                    $log.log(error);
                    $state.go('login');
                }
            });

        } else {
            $.each(Employee_ListDetails, function (index, item) {

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
        }

        $scope.model = {};
        //Array Object to build our dropdwons
        $scope.Races = [{ value: 'All Employees', key: 'A' }, { value: 'Black African', key: 'B' }, { value: 'Coloured', key: 'C' }, { value: 'Indian or Asian', key: 'I' }, { value: 'White', key: 'W' }, { value: 'None Dominant', key: 'N' }];
        $scope.Genders = [{ value: 'All Genders', key: 0 }, { value: 'Male', key: 'M' }, { value: 'Female', key: 'F' }];
        $scope.Positions = [{ value: 'All Postions', key: 0 }, { value: 'Front-end Developer', key: 1 }, { value: 'Back-end Developer', key: 2 }, { value: 'Project Manager', key: 3 }];

        $scope.filter = function () {

            var parameters = {};

            if ($scope.model.positionID !== undefined && $scope.model.positionID !== "") {
                parameters.position = $scope.model.positionID;
            }
            if ($scope.model.raceID !== undefined && $scope.model.raceID !== "") {
                parameters.race = $scope.model.raceID;
            }
            if ($scope.model.genderID !== undefined && $scope.model.genderID !== "") {
                parameters.gender = $scope.model.genderID;
            }
            if ($scope.model.email_key_word !== undefined && $scope.model.email_key_word !== "") {
                parameters.email__contains = $scope.model.email_key_word;
            }
            if ($scope.model.birth_date_range !== undefined) {
                parameters.birth_date_range = $scope.model.birth_date_range;
            }
            if ($scope.model.start_date_range !== undefined) {
                parameters.start_date_range = $scope.model.start_date_range;
            }

            if (_.isEmpty(parameters)) { //Make user we have at least one parameter that has been specified.
                alert("You have to specify at least one value");
                return false;
            }

            $http({
                url: $rootScope.baseUrl + '/api/employee/',
                method: "GET",
                params: parameters

            }).then(function (response) {

                tableDetaiils.clear(); // clearing the Datatable object to add the new rows.

                $.each(response.data, function (index, item) {

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

            }, function (error) {

            });
        }

    }]);

}());

