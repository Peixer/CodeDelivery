/**
 * Created by Glaicon on 02/02/2016.
 */
angular.module('starter.services')
    .factory('Cupom', ['$resource', 'appConfig', function ($resource, appConfig) {

        return $resource(appConfig.baseUrl + '/api/cupom/:code', {code: '@code'}, {
            query: {isArray: false}
        });
    }])