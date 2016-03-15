/**
 * Created by Glaicon on 01/02/2016.
 */
angular.module('starter.controllers')
    .controller('ClientCheckoutCtrl', ['$scope', '$state', '$cart', '$localStorage', 'Order',
        '$ionicLoading', '$ionicPopup', 'Cupom', '$cordovaBarcodeScanner', 'User',
        function ($scope, $state, $cart, $localStorage, Order, $ionicLoading,
                  $ionicPopup, Cupom, $cordovaBarcodeScanner, User) {

            var cart = $cart.get();
            $scope.showDelete = false;
            $scope.items = cart.items;
            $scope.total = $cart.getTotalFinal();
            $scope.cupom = cart.cupom;

            $scope.voltar = function () {
                $state.go('client.view_products');
            };

            $scope.removeIndex = function (index) {
                $cart.removeItem(index);

                $scope.items.splice(index, 1);
                $scope.total = $cart.getTotalFinal();
            };

            $scope.openProductDetail = function (i) {
                $state.go('client.checkout_item_detail', {index: i});
            };

            $scope.save = function () {
                var o = {items: angular.copy($scope.items)}

                angular.forEach(o.items, function (item) {
                    item.product_id = item.id;
                });

                if ($scope.cupom.value) {
                    o.cupom_code = $scope.cupom.code;
                }

                $ionicLoading.show({
                    template: '<ion-spinner icon="android"></ion-spinner>',
                    hideOnStageChange: true
                });

                Order.save({id: null}, o, function (data) {
                    $ionicLoading.hide();

                    $state.go('client.checkout_successful');
                }, function (responseError) {
                    $ionicLoading.hide();

                    $ionicPopup.alert({
                        title: 'Advertência',
                        template: 'Pedido não realizado'
                    });
                });
            };

            $scope.readBarCode = function () {
                $cordovaBarcodeScanner
                    .scan()
                    .then(function (barcodeData) {
                        getValueCupom(barcodeData.text);
                    }, function (error) {
                        $ionicPopup.alert({
                            title: 'Advertência',
                            template: 'Não foi possível ler o código de barras - Tente novamente'
                        });
                    });
            };

            $scope.removeCupom = function () {
                $cart.removeCupom();
                $scope.cupom = $cart.get().cupom;
                $scope.total = $cart.getTotalFinal();
            };

            function getValueCupom(code) {
                $ionicLoading.show({
                    template: '<ion-spinner icon="android"></ion-spinner>',
                    hideOnStageChange: true
                });

                Cupom.query({code: code}, function (data) {

                    $cart.setCupom(data.data.code, data.data.value);
                    $scope.cupom = $cart.get().cupom;
                    $scope.total = $cart.getTotalFinal();

                    $ionicLoading.hide();

                }, function (dataError) {
                    $ionicLoading.hide();

                    $ionicPopup.alert({
                        title: 'Advertência',
                        template: 'Cupom inválido'
                    });
                });
            };
        }]);