/// <reference path="E:\Web_Site_Vs\Flow_Design\Flow_Design\node_modules/angular/angular.js" />

'use strict';

(function () {

    var mainMod = angular.module('dashboardModule');
    mainMod.controller('dashboardController', ['$state', '$scope', '$rootScope', '$http', '$log', '$filter', 'employeeService', 'sharedDataService', function ($state, $scope, $rootScope, $http, $log, $filter, employeeService, sharedDataService) {

        $rootScope.description_title = "General Information";
        $rootScope.breadcrumb_name = "Dashboard";
        $scope.numberOfSenior = 0;
        $scope.numberOfJunior = 0;
        $scope.numberOfMale = 0;
        $scope.numberOfFemale = 0;
        var Employee_General_Info;

        debugger;

        Employee_General_Info = sharedDataService.getShareModel("Employee", "GeneralInformation");

        if (Employee_General_Info === null) {

            //Setting the  Authorization token before making the request.
            $http.defaults.headers.common['Authorization'] = sessionStorage.getItem("Token");
            employeeService.getAllEmployee().then(function (response) { //Request the List of Employee

                $log.log(response.data);

                sharedDataService.setShareModel("Employee", "employeeList", response.data);
                Employee_General_Info = [];
                $.each(response.data, function (index, item) {

                    utility_isSenior(item.position.level) ? $scope.numberOfSenior++ : $scope.numberOfJunior++;
                    utility_isMale(item.gender) ? $scope.numberOfMale++ : $scope.numberOfFemale++;

                    sessionStorage.setItem("Senior", $scope.numberOfSenior);
                    sessionStorage.setItem("Junior", $scope.numberOfJunior);
                    sessionStorage.setItem("Male", $scope.numberOfMale);
                    sessionStorage.setItem("Female", $scope.numberOfFemale);

                    var birth_date = $filter('date')(item.birth_date, 'mediumDate');
                    var gender = utility_Gender(item.gender);
                    Employee_General_Info.push({
                        github_user: item.github_user,
                        email: item.email,
                        phone_number: item.phone_number,
                        gender: gender,
                        birth_date: birth_date,
                        age: item.age,
                        days_to_birthday: item.days_to_birthday
                    });
                    table.row.add([item.github_user, item.email, item.phone_number, gender, birth_date, item.age, item.days_to_birthday]); // Adding rows in table.
                });
                table.draw();
                sharedDataService.setShareModel("Employee", "GeneralInformation", Employee_General_Info); //Setting employee general info for caching.

            }, function (error) {
                if (error.status === 403) {
                    $log.log(error);
                    $state.go('login');
                }
            });

        } else {

            //The user has already login. Cache the Employee List.
            $scope.numberOfSenior = sessionStorage.getItem("Senior");
            $scope.numberOfJunior = sessionStorage.getItem("Junior");
            $scope.numberOfMale = sessionStorage.getItem("Male");
            $scope.numberOfFemale = sessionStorage.getItem("Female");
            $.each(Employee_General_Info, function (index, item) {
                table.row.add([item.github_user, item.email, item.phone_number, item.gender, item.birth_date, item.age, item.days_to_birthday]); // Adding rows in table.
            });
            table.draw();
        }

    }]);

}());

