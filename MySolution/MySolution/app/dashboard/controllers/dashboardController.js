/// <reference path="E:\Web_Site_Vs\Flow_Design\Flow_Design\node_modules/angular/angular.js" />

'use strict';

(function () {

    var mainMod = angular.module('dashboardModule');
    mainMod.controller('dashboardController', ['$state', '$scope', '$rootScope', '$http', '$log', '$filter', 'employeeService', function ($state, $scope, $rootScope, $http, $log, $filter, employeeService) {

        $rootScope.description_title = "General Information";
        $rootScope.breadcrumb_name = "Dashboard";
        $scope.numberOfSenior = 0;
        $scope.numberOfJunior = 0;
        $scope.numberOfMale = 0;
        $scope.numberOfFemale = 0;

        var User = null;
        if (!$rootScope.isLogin) { //In case the user click else where and click back on the dashboard.
            User = $rootScope.GlobalServices.sharedDataService.getShareModel("UserProfile", "userData");
            if (User === null) {
                $state.go('login');
            }
            $rootScope.fullName = User.first_name + " " + User.last_name;
            $rootScope.email = User.email;
            $rootScope.userName = User.username;
            $rootScope.isLogin = true;

            //Setting the  Authorization token before making the request.
            $http.defaults.headers.common['Authorization'] = sessionStorage.getItem("Token");
            employeeService.getAllEmployee().then(function (response) { //Request the List of Employee

                $log.log(response.data);

                $rootScope.GlobalServices.sharedDataService.setShareModel("Employee", "employeeList", response.data);
                $scope.Employee_General_Info = [];
                $.each(response.data, function (index, item) {

                    utility_isSenior(item.position.level) ? $scope.numberOfSenior++ : $scope.numberOfJunior++;
                    utility_isMale(item.gender) ? $scope.numberOfMale++ : $scope.numberOfFemale++;

                    sessionStorage.setItem("Senior", $scope.numberOfSenior);
                    sessionStorage.setItem("Junior", $scope.numberOfJunior);
                    sessionStorage.setItem("Male", $scope.numberOfMale);
                    sessionStorage.setItem("Female", $scope.numberOfFemale);

                    var birth_date = $filter('date')(item.birth_date, 'mediumDate');
                    var gender = utility_Gender(item.gender);
                    $scope.Employee_General_Info.push({
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
                $rootScope.GlobalServices.sharedDataService.setShareModel("Employee", "GeneralInformation", $scope.Employee_General_Info);

            }, function (error) {
                if (error.status === 403) {
                    $state.go('login');
                }
                $log.log(error);
            });
        } else { //The user has already login.
            $scope.numberOfSenior = sessionStorage.getItem("Senior");
            $scope.numberOfJunior = sessionStorage.getItem("Junior");
            $scope.numberOfMale = sessionStorage.getItem("Male");
            $scope.numberOfFemale = sessionStorage.getItem("Female");
            $scope.Employee_General_Info = $rootScope.GlobalServices.sharedDataService.getShareModel("Employee", "GeneralInformation");
            $.each($scope.Employee_General_Info, function (index, item) {
                table.row.add([item.github_user, item.email, item.phone_number, item.gender, item.birth_date, item.age, item.days_to_birthday]); // Adding rows in table.
            });
            table.draw();
        }

    }]);

}());

