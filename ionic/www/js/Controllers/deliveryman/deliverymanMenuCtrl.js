/**
 * Created by Glaicon on 01/02/2016.
 */
angular.module('starter.controllers')
    .controller('DeliverymanMenuCtrl',
    ['$scope', '$ionicLoading', 'UserData',
        function ($scope, $ionicLoading, UserData) {

            $scope.user = UserData.get();
        }]);