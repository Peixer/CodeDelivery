/**
 * Created by Glaicon on 02/02/2016.
 */
angular.module('starter.services')
    .factory('ClientOrder', ['$resource', 'appConfig', function ($resource, appConfig) {
        return $resource(appConfig.baseUrl + '/api/client/order/:id', {id: '@id'}, {
            query: {
                isArray: false
            }
        });
    }]).factory('DeliverymanOrder', ['$resource', 'appConfig', function ($resource, appConfig) {
        return $resource(appConfig.baseUrl + '/api/deliveryman/order/:id', {id: '@id'}, {
            query: {
                isArray: false
            }
        });
    }])