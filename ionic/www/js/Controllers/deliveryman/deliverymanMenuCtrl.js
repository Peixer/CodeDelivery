/**
 * Created by Glaicon on 01/02/2016.
 */
angular.module('starter.controllers')
    .controller('DeliverymantMenuCtrl', ['$scope', '$ionicLoading', 'User', function ($scope, $ionicLoading, User) {

        $scope.user = {
            name: ''
        };

        $ionicLoading.show(
            {
                template: 'Carregando...'
            });

        User.authenticated({},
            function (data) {
                $scope.user = data.data;
                $ionicLoading.hide();
            },
            function (responseError) {
                $ionicLoading.hide();
            });
    }]);