/**
 * Created by Glaicon on 04/02/2016.
 */
angular.module('starter.controllers')
    .controller('ClientCheckoutSuccessful', ['$scope', '$state', '$cart',
        function ($scope, $state, $cart) {
            var cart = $cart.get();

            $scope.items = cart.items;
            $scope.total = cart.total;
            $cart.clear();

            $scope.openListOrder = function () {

            }
        }])