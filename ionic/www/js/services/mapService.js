/**
 * Created by Glaicon on 02/02/2016.
 */
angular.module('starter.services')
    .factory('$map', [function () {
        return {
            center: {
                latitude: 0,
                longitude: 0
            },
            zoom: 12
        }
    }]);