/**
 * Created by Adron on 3/9/14.
 * Description a simple controller to get the results of the chance library for testing data.
 */

var Chance = require('../javascripts/chance.min.js');


var rootAPI = 'http://localhost:3010/';
var parameters = '?access_token=123456789';

function Junk($scope, $http) {

    var guid = '12jh34gt-hxo0112jh34gt-hxo01';

    $http.get(rootAPI + 'stat' + parameters).
        success(function (data) {
            $scope.storgie_status = data;

            $scope.resultz = 'test';

            var testing = 'test';
        }).
        error(function (data, status, headers, config) {
            $scope.error = data;
            $scope.status = status;
            $scope.headers = headers;
            $scope.config = config;
        });
}
