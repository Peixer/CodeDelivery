/**
 * Created by Glaicon on 01/02/2016.
 */
angular.module('starter.controllers')
    .controller('ClientViewOrderCtrl', ['$scope', '$stateParams', 'Order', '$ionicLoading',
        function ($scope, $stateParams, Order, $ionicLoading) {

            $scope.order = {};

            $ionicLoading.show(
                {
                    template: 'Carregando...'
                });

            Order.get({id: $stateParams.id, include: 'items,cupom'},
                function (data) {
                    $scope.order = data.data;
                    $ionicLoading.hide();
                }, function (data) {
                    $ionicLoading.hide();
                });

        }]);