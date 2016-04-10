/**
 * Created by Glaicon on 01/02/2016.
 */
angular.module('starter.controllers')
    .controller('DeliverymanViewOrderCtrl',
    ['$scope', '$stateParams', 'DeliverymanOrder', '$ionicLoading', '$cordovaGeolocation', '$ionicPopup',
        function ($scope, $stateParams, DeliverymanOrder, $ionicLoading, $cordovaGeolocation, $ionicPopup) {

            $scope.order = {};
            var watch;
            var lat, long;

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

            $scope.goToDelivery = function () {

                $ionicPopup.alert({
                    title: 'Advertência',
                    template: 'Para parar a localização dê OK'
                }).then(function () {
                    stopWatchPosition();
                });

                DeliverymanOrder.updateStatus({id: $stateParams.id}, {status: 1}, function (data) {
                    //geo Localização

                    var watchOptions = {
                        timeout: 3000,
                        enableHighAccuracy: false
                    }

                    watch = $cordovaGeolocation.watchPosition(watchOptions);
                    watch.then(null, function (responseError) {
                        // Error
                    }, function (position) {

                        // Migue para fazer teste de movimentacao
                        if (!lat) {
                            lat = position.coords.latitude;
                            long = position.coords.longitude;
                        } else {
                            long -= 0.045;
                        }

                        DeliverymanOrder.geo({id: $stateParams.id},
                            {
                                lat: lat,
                                long: long
                            });
                    });

                });
            };

            function stopWatchPosition() {
                if (watch && typeof watch == 'object' && watch.hasOwnProperty('watchID')) {
                    $cordovaGeolocation.clearWatch(watch.watchID);
                }
            }
        }]);