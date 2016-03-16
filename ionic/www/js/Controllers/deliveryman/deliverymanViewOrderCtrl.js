/**
 * Created by Glaicon on 01/02/2016.
 */
angular.module('starter.controllers')
    .controller('DeliverymanViewOrderCtrl',
        ['$scope', '$stateParams', 'DeliverymanOrder', '$ionicLoading',
        function ($scope, $stateParams, DeliverymanOrder, $ionicLoading) {

            $scope.order = {};

            $ionicLoading.show(
                {
                    template: 'Carregando...'
                });

            DeliverymanOrder.get({id: $stateParams.id, include: 'items,cupom'},
                function (data) {
                    $scope.order = data.data;
                    $ionicLoading.hide();
                }, function (data) {
                    $ionicLoading.hide();
                });

        }]);