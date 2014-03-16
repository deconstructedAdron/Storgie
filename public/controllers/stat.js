/**
 * Created by Adron on 3/9/14.
 * Description a simple controller to get the results of the stat API service.
 */

//var rootAPI = 'http://api.deconstructed.io/';
var rootAPI = 'http://localhost:3010/'

function Stat($scope, $http) {
    $http({ method: 'GET', url: rootAPI + 'stat?access_token=123456789' }).
        success(function (data) {
            $scope.storgie_status = data;
        }).
        error(function (data, status, headers, config) {
            $scope.error = data;
            $scope.status = status;
            $scope.headers = headers;
        });
}
