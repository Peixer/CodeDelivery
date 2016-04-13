/**
 * Created by Glaicon on 29/01/2016.
 */
angular.module('starter.controllers')
    .controller('LoginCtrl', [
        '$scope', 'OAuth', 'OAuthToken', '$ionicPopup', '$state', 'UserData', 'User', '$localStorage', '$redirect',
        function ($scope, OAuth, OAuthToken, $ionicPopup, $state, UserData, User, $localStorage, $redirect) {

            $scope.user = {
                username: '',
                password: ''
            };

            $scope.login = function () {
                var promiseAccessToken = OAuth.getAccessToken($scope.user);
                promiseAccessToken.then(function (data) {
                    return User.updateDeviceToken({},
                        {device_token: $localStorage.get('device_token')}).$promise;
                }).then(function (data) {
                    return User.authenticated({include: 'client'}).$promise;
                }).then(function (data) {
                    UserData.set(data.data);
                    $redirect.redirectAfterLogin();
                }, function (responseError) {
                    UserData.set(null);
                    OAuthToken.removeToken();
                    $ionicPopup.alert({
                        title: 'Advertência',
                        template: 'Login e/ou senha inválidos'
                    });
                });
            };
        }]);