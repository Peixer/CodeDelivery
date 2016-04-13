/**
 * Created by Glaicon on 29/01/2016.
 */
angular.module('starter.controllers')
    .service('$redirect', ['$state', 'UserData', 'appConfig', function ($state, UserData, appConfig) {
        this.redirectAfterLogin = function () {
            var user = UserData.get();
            $state.go(appConfig.redirectAfterLogin[user.role]);
        };
    }]);