// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', [
    'ionic',
    'starter.controllers',
    'angular-oauth2'
])
    // Value Recipes
    .value('meuValue', 'Meu primeiro valor')//Não pode usar no .config

    // Constant Recipes
    // Pode ser alterada porém não deve
    .constant('meuConstant', '+++++++++')//Pode usar no .config

    // Service Recipes
    // Criar funcionalidade
    // Singleton
    .service('meuService', function (OAuth) {
        this.largura = 40;
        this.comprimento = 40;
        this.funcao = function () {
            console.log(this.largura * this.comprimento);
        }
    })

    // Factory Recipes
    // Precisa retornar um objeto
    // Caso precisa fazer alguma configuração se utiliza o Factory
    .factory('meuFactory', function () {
        // Configuração
        return {
            largura: 40,
            comprimento: 40,
            funcao: function () {
                console.log(this.largura * this.comprimento);
            }
        }
    })

    // Provider
    // $get é obrigatório
    .provider('calculadorDeArea', function () {

        var o = {
            calcular: function () {
                return this.largura * this.comprimento;
            }
        };

        return {
            $get: function () {
                // Como acessar propriedades internas de objetos
                o.largura = this.largura;
                o.comprimento = this.comprimento;
                return o;
            }
        }
    })

    .run(function ($ionicPlatform, meuValue, meuService, calculadorDeArea) {
        //  meuValue.nome = 'Jose';
        console.log(meuValue);

        meuService.funcao();

        console.log(calculadorDeArea.calcular());

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
    .config(function ($stateProvider, $urlRouterProvider, OAuthProvider, OAuthTokenProvider, meuConstant, calculadorDeAreaProvider) {
        //Provider - Obrigatório terminar em 'Provider'

        console.log(meuConstant);

        calculadorDeAreaProvider.largura = 50;
        calculadorDeAreaProvider.comprimento = 100;

        // Definindo Routes
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
        }).state('home', {
            url: '/home',
            templateUrl: 'templates/home.html'
        }).state('client', {
            //Rota base
            abstract : true,
            url: '/client',
            template: '<ui-view/>'
        })

        $urlRouterProvider.otherwise('/login');

        OAuthProvider.configure({
            baseUrl: 'http://localhost:8000',
            //baseUrl: 'http://www.peixer.com/Laravel',
            clientId: 'appid01',
            clientSecret: 'secret', // optional
            grantPath: '/oauth/access_token',
        });

        // Configurações do Cookies
        OAuthTokenProvider.configure({
            name: 'token',
            options: {
                secure: false //Criptografação com HTTPS
            }
        });
    });
