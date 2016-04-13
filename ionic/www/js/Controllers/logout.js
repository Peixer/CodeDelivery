/**
 * Created by Glaicon on 29/01/2016.
 */
angular.module('starter.controllers')
    .controller('LogoutCtrl', ['$scope', 'OAuthToken', 'UserData', '$state', '$ionicHistory',
        function ($scope, OAuthToken, UserData, $state, $ionicHistory) {
            OAuthToken.removeToken();
            UserData.set(null);
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            $ionicHistory.nextViewOptions({
                disableBack: true,
                historyRoot: true,
            });
            $state.go('login');
        }]);