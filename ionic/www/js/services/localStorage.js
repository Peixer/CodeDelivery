/**
 * Created by Glaicon on 02/02/2016.
 */
angular.module('starter.services')
    .factory('$localStorage', ['$window', function ($window) {
        return {
            get: function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            set: function (key, value) {
                $window.localStorage[key] = value;
                return value;
            },
            setObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
                return this.getObject(key);
            },
            getObject: function (key) {
                return JSON.parse($window.localStorage[key] || null);
            }
        }
    }]);