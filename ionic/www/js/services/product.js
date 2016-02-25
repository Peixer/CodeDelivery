/**
 * Created by Glaicon on 02/02/2016.
 */
angular.module('starter.services')
    .factory('Product', ['$resource', 'appConfig', function ($resource, appConfig) {
        return $resource(appConfig.baseUrl + '/api/client/products', {}, {
            /*query: {
                isArray: false
            }*/
        });
    }])