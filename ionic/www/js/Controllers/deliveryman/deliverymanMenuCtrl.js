/**
 * Created by Glaicon on 01/02/2016.
 */
angular.module('starter.controllers')
    .controller('DeliverymanMenuCtrl',
    ['$scope', '$ionicLoading', 'UserData', '$state',
        function ($scope, $ionicLoading, UserData, $state) {

            $scope.user = UserData.get();
            $scope.logout = function () {
                $state.go('logout');
            };
        }]);