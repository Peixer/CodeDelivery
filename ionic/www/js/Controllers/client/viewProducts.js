/**
 * Created by Glaicon on 01/02/2016.
 */


angular.module('starter.controllers')
    .controller('ClientViewProductsCtrl', [
        '$scope', '$state', 'Product', '$ionicLoading', '$cart','$ionicPopup',
        function ($scope, $state, Product, $ionicLoading, $cart, $ionicPopup) {
            $scope.products = [];

            $ionicLoading.show({
                template: '<ion-spinner icon="android"></ion-spinner>',
                hideOnStageChange: true
            });

            var product = Product.query({}, function (data) {
                $scope.products = data.data;
                console.log(data.data);
                $ionicLoading.hide();

            }, function (dataError) {
                console.log(dataError);
                $ionicLoading.hide();

                $ionicPopup.alert({
                    title: dataError.data,
                    template: dataError
                });
            });

            $scope.addItem = function (item) {
                console.log(item);
                item.qtd = 1;
                $cart.addItem(item);

                $state.go('client.checkout');
            }
        }]);
