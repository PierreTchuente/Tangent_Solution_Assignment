'use strict';

(function () {

    /*
       This service a global service in the entire application. 
       It will help pass data across controllers, and help avoid making unneccessary request to the server.
    */
    var appHealth_sharedDataService = angular.module('sharedDataServiceModule');
    appHealth_sharedDataService.factory('sharedDataService', ['$log', function ($log) {

        var shareModel = null;
        // Getters and Setters
        var setShareModel = function (subSystem, key, value) {
            if (shareModel === undefined || shareModel === null)
                shareModel = {};
            if (shareModel[subSystem] === undefined || shareModel[subSystem] === null)
                shareModel[subSystem] = {};
            shareModel[subSystem][key] = value;
        };
        var getShareModel = function (subSystem, key) {
            if (shareModel === undefined || shareModel === null)
                return null;
            if (shareModel[subSystem] === undefined || shareModel[subSystem] === null)
                return null;
            return shareModel[subSystem][key] === undefined ? null : shareModel[subSystem][key];
        };

        var CleanUpService = function () {
            if (shareModel !== undefined && shareModel !== null && isObject(shareModel)) {
                for (var subSystem in shareModel) {
                    delete shareModel[subSystem];
                }
            }
            shareModel = null;
        };

        var CleanUpServiceKey = function (subSystem, key) {
            if (shareModel !== null) {
                if (shareModel[subSystem] !== undefined && shareModel[subSystem] !== null && shareModel[subSystem] !== "") {
                    delete shareModel[subSystem][key];
                }
            }
        }

        var CleanUpServiceSubsystem = function (subSystem) {
            if (shareModel !== null) {
                delete shareModel[subSystem];
            }
        }

        var CleanUpServiceKeyExcept = function (subSystem, key) {
            if (shareModel !== undefined && shareModel !== null && isObject(shareModel)) {
                if (key !== undefined && key !== null) {
                    var subSystemPtr = shareModel[subSystem];
                    for (var k in subSystemPtr) {
                        if (k !== key)
                            delete shareModel[subSystem][k];
                    }
                } else {
                    CleanUpServiceSubsystem(subSystem)
                }
            }
        }
        
        //function to check if a value is object
        function isObject (value) {
            return value && typeof value === 'object' && value.constructor === Object;
            };

        // Returning an Object with callable methods.
        return {
            setShareModel: setShareModel,
            getShareModel: getShareModel,
            CleanUpService: CleanUpService,
            CleanUpServiceKey: CleanUpServiceKey,
            CleanUpServiceKeyExcept: CleanUpServiceKeyExcept,
            CleanUpServiceSubsystem: CleanUpServiceSubsystem
        };
    }]);
}());