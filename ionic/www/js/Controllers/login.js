/**
 * Created by Glaicon on 29/01/2016.
 */
angular.module('starter.controllers')
    .controller('LoginCtrl', [
        '$scope', 'OAuth', '$ionicPopup', '$state', function ($scope, OAuth, $ionicPopup, $state) {

            $scope.user = {
                username: '',
                password: ''
            };

            $scope.login = function () {
                OAuth.getAccessToken($scope.user)
                    .then(function (data) {
                        console.log("Login funcionando");

                        $state.go('client.view_products');
                    }, function (responseError) {
                        $ionicPopup.alert({
                            title: 'Advertência',
                            template: 'Login e/ou senha inválidos'
                        });
                    });
            };
        }]);