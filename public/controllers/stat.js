/**
 * Created by Adron on 3/9/14.
 * Description a simple controller to get the results of the stat API service.
 */



//var rootAPI = 'http://api.deconstructed.io/';
var rootAPI = 'http://localhost:3010/';
var parameters = '?access_token=123456789';

function Stat($scope, $http) {

    $http.get(rootAPI + 'stat' + parameters).
        success(function (data) {
            $scope.storgie_status = data;
        }).
        error(function (data, status, headers, config) {
            $scope.error = data;
            $scope.status = status;
            $scope.headers = headers;
            $scope.config = config;
        });

    $http.post(rootAPI + 'identity' + parameters,
        {
            "key": '12jh34gt-hxo01',
            "value": {
                "knownid": {
                    "Id": "1",
                    "SampleId": "324",
                    "EmailId": "blagh@blagh.com"
                },
                "next": "DELETE"
            }
        }).
        success(function (data) {
            $scope.written_id = data;
        }).
        error(function (data, status, headers, config) {
            $scope.error = data;
            $scope.status = status;
            $scope.headers = headers;
            $scope.config = config;
        });
}
