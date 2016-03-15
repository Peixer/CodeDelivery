/**
 * Created by Glaicon on 14/03/2016.
 */
angular.module('starter.filters').filter('join', function () {
    return function (input, joinStr) {
        return input.join(joinStr);
    };
});