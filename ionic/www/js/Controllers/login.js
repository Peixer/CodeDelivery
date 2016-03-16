/**
 * Created by Glaicon on 29/01/2016.
 */
angular.module('starter.controllers')
    .controller('LoginCtrl', [
        '$scope', 'OAuth', 'OAuthToken', '$ionicPopup', '$state', 'UserData', 'User',
        function ($scope, OAuth, OAuthToken, $ionicPopup, $state, UserData, User) {

            $scope.user = {
                username: '',
                password: ''
            };

            $scope.login = function () {
                var promiseAccessToken = OAuth.getAccessToken($scope.user);
                promiseAccessToken.then(function (data) {
                    return User.authenticated({include: 'client'}).$promise;
                }).then(function (data) {
                    UserData.set(data.data);
                    $state.go('client.checkout');
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