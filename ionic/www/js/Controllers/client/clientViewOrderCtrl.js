/**
 * Created by Glaicon on 01/02/2016.
 */
angular.module('starter.controllers')
    .controller('ClientViewOrderCtrl', ['$scope', '$stateParams', 'ClientOrder', '$ionicLoading',
        function ($scope, $stateParams, ClientOrder, $ionicLoading) {

            $scope.order = {};

            $ionicLoading.show(
                {
                    template: 'Carregando...'
                });

            ClientOrder.get({id: $stateParams.id, include: 'items,cupom'},
                function (data) {
                    $scope.order = data.data;
                    $ionicLoading.hide();
                }, function (data) {
                    $ionicLoading.hide();
                });

        }]);