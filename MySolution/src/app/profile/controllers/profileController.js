import { utility_Gender, utility_Race, utility_Review, utility_isSenior, utility_isMale } from '../../../assets/js/Utility_Function'; // importing my utilities function.
                                                                                                                                      // *%*Note: Pierre - Remember in a near future to find a way to globally expose your utilities functions.
                                                                                                                                      
'use strict';

(function () {

    var mainMod = angular.module('profileModule');
    mainMod.controller('profileController', ['$state', '$scope', '$rootScope', '$http', '$log', function ($state, $scope, $rootScope, $http, $log) {

        $rootScope.description_title = "My Profile";
        $rootScope.breadcrumb_name = "Profile";
        $rootScope.isLogin = true;
       
        $scope.model = {};
        $scope.model.profile = {};
        $http.defaults.headers.common['Authorization'] = sessionStorage.getItem("Token");

        //Getting profile
        $http({
            method: 'GET',
            url: $rootScope.baseUrl + '/api/employee/me',
        }).then(function (response) {

            debugger;

            $log.log(response.data);
            $scope.model.profile = response.data;
            for (var i = 0 ; i < ($scope.model.profile.employee_review).length ; i++) {

                $scope.model.profile.employee_review[i].type = utility_Review($scope.model.profile.employee_review[i].type);
            }
            $scope.model.profile.gender = utility_Gender($scope.model.profile.gender);
            $scope.model.profile.race = utility_Race($scope.model.profile.race);
            $scope.model.profile.is_employed === true ? $scope.model.profile.is_employed = "Yes" : $scope.model.profile.is_employed = "No";
            $scope.model.profile.is_foreigner === true ? $scope.model.profile.is_foreigner = "Yes" : $scope.model.profile.is_foreigner = "No";

        }, function (error) {
            $log.log("Something went wrong.");
        });

    }]);

}());

