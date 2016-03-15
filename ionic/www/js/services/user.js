/**
 * Created by Glaicon on 02/02/2016.
 */
angular.module('starter.services')
    .factory('User', ['$resource', 'appConfig', function ($resource, appConfig) {
        return $resource(appConfig.baseUrl + '/api/authenticated', {}, {
            query: {
                isArray: false
            },
            authenticated: {
                method: 'GET',
                url: appConfig.baseUrl + '/api/authenticated'
            }
        });
    }])