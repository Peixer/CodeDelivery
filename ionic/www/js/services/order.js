/**
 * Created by Glaicon on 02/02/2016.
 */
angular.module('starter.services')
    .factory('Order', ['$resource', 'appConfig', function ($resource, appConfig) {
        return $resource(appConfig.baseUrl + '/api/client/order/:id', {id:'@id'}, {
            query: {
                isArray: false
            }
        });
    }])