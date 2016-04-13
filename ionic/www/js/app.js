// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter.controllers', []);
angular.module('starter.services', []);
angular.module('starter.filters', []);

angular.module('starter', [
    'ionic',
    'ionic.service.core',
    'starter.controllers',
    'starter.filters',
    'starter.services',
    'angular-oauth2',
    'ngResource',
    'ngCordova',
    'uiGmapgoogle-maps',
    'pusher-angular'
])

    .constant('appConfig', {
        baseUrl: 'http://localhost:8000',
        pusherKey: '5603dc5282ed3075cf96', // Pusher.com/
        redirectAfterLogin: {
            client: 'client.order',
            delivery: 'deliveryman.order'
        }
        //baseUrl: 'http://www.peixer.com/Laravel',
    })

    .run(function ($ionicPlatform, $window, appConfig, $localStorage) {
        $window.client = new Pusher(appConfig.pusherKey, {});

        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

            Ionic.io();

            var push = new Ionic.Push({
                "debug": true
            });

            push.register(function (token) {
                $localStorage.set('device_token', token.token);
            });
        });
    })

    .config(function ($stateProvider, $urlRouterProvider, OAuthProvider, OAuthTokenProvider, appConfig, $provide) {
        //Provider - Obrigatório terminar em 'Provider'

        // Definindo Routes
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            }).state('logout', {
                url: '/logout',
                controller: 'LogoutCtrl'
            }).state('home', {
                url: '/home',
                templateUrl: 'templates/home.html'
            }).state('client', {
                // Rota base
                // Serve para intermediar o fluxo
                abstract: true,
                cache: false,
                url: '/client',
                templateUrl: 'templates/client/menu.html',
                controller: 'ClientMenuCtrl',
            }).state('client.checkout', {
                url: '/checkout',
                templateUrl: 'templates/client/checkout.html',
                controller: 'ClientCheckoutCtrl',
                cache: false
            }).state('client.checkout_item_detail', {
                url: '/checkout/detail/:index',
                templateUrl: 'templates/client/checkout_item_detail.html',
                controller: 'ClientCheckoutDetailCtrl'
            }).state('client.view_products', {
                url: '/view_products',
                templateUrl: 'templates/client/view_products.html',
                controller: 'ClientViewProductsCtrl'
            }).state('client.checkout_successful', {
                cache: false,
                url: '/checkout/successful',
                templateUrl: 'templates/client/checkout_successful.html',
                controller: 'ClientCheckoutSuccessful'
            }).state('client.order', {
                url: '/order',
                templateUrl: 'templates/client/order.html',
                controller: 'ClientOrderCtrl'
            }).state('client.view_order', {
                url: '/view_order/:id',
                templateUrl: 'templates/client/view_order.html',
                controller: 'ClientViewOrderCtrl'
            }).state('client.view_delivery', {
                cache: false,
                url: '/view_delivery/:id',
                templateUrl: 'templates/client/view_delivery.html',
                controller: 'ClientViewDeliveryCtrl'
            }).state('deliveryman', {
                // Rota base
                // Serve para intermediar o fluxo
                abstract: true,
                cache: false,
                url: '/deliveryman',
                templateUrl: 'templates/deliveryman/menu.html',
                controller: 'DeliverymanMenuCtrl',
            }).state('deliveryman.order', {
                url: '/order',
                templateUrl: 'templates/deliveryman/order.html',
                controller: 'DeliverymanOrderCtrl'
            }).state('deliveryman.view_order', {
                cache: false,
                url: '/view_order/:id',
                templateUrl: 'templates/deliveryman/view_order.html',
                controller: 'DeliverymanViewOrderCtrl'
            });

        $urlRouterProvider.otherwise('/login');

        OAuthProvider.configure({
            baseUrl: appConfig.baseUrl,
            clientId: 'appid01',
            clientSecret: 'secret', // optional
            grantPath: '/oauth/access_token'
        });

        // Configurações do Cookies
        OAuthTokenProvider.configure({
            name: 'token',
            options: {
                secure: false //Criptografar com HTTPS
            }
        });

        $provide.decorator('OAuthToken', ['$localStorage', '$delegate', function ($localStorage, $delegate) {
            Object.defineProperties($delegate, {
                setToken: {
                    value: function (data) {
                        return $localStorage.setObject('token', data);
                    },
                    enumerable: true,
                    configurable: true,
                    writable: true
                },
                getToken: {
                    value: function () {
                        return $localStorage.getObject('token');
                    },
                    enumerable: true,
                    configurable: true,
                    writable: true
                },
                removeToken: {
                    value: function () {
                        $localStorage.setObject('token', null);
                    },
                    enumerable: true,
                    configurable: true,
                    writable: true
                }
            });

            return $delegate;
        }]);
    })

    .service('cart', function () {
        this.items = [];
    });
