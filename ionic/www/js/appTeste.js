// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', [
    'ionic',
    'starter.controllers',
    'angular-oauth2'
])
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
    .config(function ($stateProvider, $urlRouterProvider, OAuthProvider, OAuthTokenProvider) {
        //Provider - Obrigatório terminar em 'Provider'

        // Definindo Routes
        $stateProvider.state('home', {
            url: '/home/:nome',
            templateUrl: 'templates/home.html',
            controller: 'HomeCtrl'
        })
            .state('home.a', {
                url: '/a',
                templateUrl: 'templates/home-a.html'
            })
            .state('home.b', {
                url: '/b',
                templateUrl: 'templates/home-b.html'
            })
            .state('main', {
                url: '/main',
                templateUrl: 'templates/main.html'
            })
            .state('main.a', {
                url: '/a',
                templateUrl: 'templates/main-a.html'
            })
            .state('main.b', {
                url: '/b',
                templateUrl: 'templates/main-b.html'
            })

        $urlRouterProvider.otherwise('/');

        OAuthProvider.configure({
            baseUrl: 'https://localhost:8100',
            clientId: 'appid01',
            clientSecret: 'secret' // optional
        });

        // Configurações do Cookies
        OAuthTokenProvider.configure({
            name: 'token',
            options: {
                secure: false //Criptografação com HTTPS
            }
        });
    });
