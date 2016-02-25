/**
 * Created by Glaicon on 02/02/2016.
 */
angular.module('starter.services')
    .service('$cart', ['$localStorage', function ($localStorage) {
        var keyLocalStorage = 'cart';
        var cartAux = $localStorage.getObject(keyLocalStorage);

        if (!cartAux) {
            initCart();
        }

        this.clear = function () {
            initCart();
        };

        this.get = function () {
            return $localStorage.getObject(keyLocalStorage);
        };

        this.getItem = function (index) {
            var cart = this.get();
            return cart.items[index];
        };

        this.addItem = function (item) {
            var cart = this.get();
            var exists = false;

            for (var index in cart.items) {
                itemAux = cart.items[index];
                if (itemAux.id == item.id) {
                    itemAux.qtd = item.qtd + itemAux.qtd;
                    itemAux.subTotal = calculateSubTotal(itemAux);

                    exists = true;
                    break;
                }
            }

            if (!exists) {
                item.subTotal = calculateSubTotal(item);
                cart.items.push(item);
            }

            cart.total = getTotal(cart.items);
            $localStorage.setObject(keyLocalStorage, cart);
        };

        this.removeItem = function (index) {
            var cart = this.get();
            cart.items.splice(index, 1);
            cart.total = getTotal(cart.items);

            $localStorage.setObject(keyLocalStorage, cart);
        };

        this.updateQtd = function (index, qtd) {
            var cart = this.get();
            itemAux = cart.items[index];
            itemAux.qtd = qtd;
            itemAux.subTotal = calculateSubTotal(itemAux);
            cart.Total = getTotal(cart.items);

            $localStorage.setObject(keyLocalStorage, cart);
        }

        function calculateSubTotal(item) {
            return item.price * item.qtd;
        };

        function getTotal(items) {
            var sum = 0;
            angular.forEach(items, function (item) {
                sum += item.subTotal;
            });

            return sum;
        };

        this.getTotalFinal = function () {
            var cart = this.get();

            if (cart.cupom != null)
                return cart.total - (cart.cupom.value || 0 );

            return cart.total;
        };

        this.setCupom = function (code, value) {
            var cart = this.get();

            cart.cupom = {
                code: code,
                value: value
            }

            $localStorage.setObject(keyLocalStorage, cart);
        };

        this.removeCupom = function () {
            var cart = this.get();

            cart.cupom = {
                code: null,
                value: null
            }

            $localStorage.setObject(keyLocalStorage, cart);
        };

        function initCart() {
            $localStorage.setObject(keyLocalStorage, {
                items: [],
                total: 0,
                cupom: {
                    code: null,
                    value: null
                }
            });
        };

    }]);