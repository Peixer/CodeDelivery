/**
 * Created by Glaicon on 01/02/2016.
 */
angular.module('starter.controllers')
    .controller('ClientOrderCtrl', ['$scope', '$state', '$ionicLoading', '$ionicActionSheet', 'ClientOrder',
        function ($scope, $state, $ionicLoading, $ionicActionSheet, ClientOrder) {
            var page = 1;
            $scope.items = [];
            $scope.canMoreItems = true;

            /* $ionicLoading.show(
             {
             template: 'Carregando...'
             });*/

            $scope.doRefresh = function () {
                getOrders(1).then(function (data) {
                    $scope.items = data.data;
                    $scope.$broadcast('scroll.refreshComplete');
                }, function (data) {
                    $scope.$broadcast('scroll.refreshComplete');
                });
            };

            $scope.openOrderDetail = function (order) {
                $state.go('client.view_order', {id: order.id});
            };

            $scope.showActionSheet = function (order) {
                $ionicActionSheet.show({
                    buttons: [
                        {text: 'Ver Detalhes'},
                        {text: 'Ver Entrega'}
                    ],
                    titleText: 'O que fazer?',
                    cancelText: 'Cancelar',
                    cancel: function () {
                        // Fazer alguma p/ cancelamento
                    },
                    buttonClicked: function (index) {
                        switch (index) {
                            case 0:
                                $state.go('client.view_order', {id: order.id});
                                break;
                            case 1:
                                $state.go('client.view_delivery', {id: order.id});
                                break;
                        }
                    }
                });
            };

            function getOrders(pagination) {
                return ClientOrder.query({
                    id: null,
                    page: pagination,
                    orderBy: 'created_at',
                    sortedBy: 'desc'
                }).$promise;
            };

            /*getOrders().then(
             function (data) {
             $scope.items = data.data;
             $ionicLoading.hide();
             },
             function (responseError) {
             $ionicLoading.hide();
             }
             );*/

            $scope.loadMore = function () {

                getOrders(page).then(function (data) {
                    $scope.items = $scope.items.concat(data.data);
                    if ($scope.items.length == data.meta.pagination.total) {
                        $scope.canMoreItems = false;
                    }

                    page += 1;
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
            };

        }]);