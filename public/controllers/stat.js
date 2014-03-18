/**
 * Created by Adron on 3/9/14.
 * Description a simple controller to get the results of the stat API service.
 */



//var rootAPI = 'http://api.deconstructed.io/';
var rootAPI = 'http://localhost:3010/';
var parameters = '?access_token=123456789';

function Stat($scope, $http) {

    var guid = '12jh34gt-hxo0112jh34gt-hxo01';

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

    $http.post(rootAPI + 'device' + parameters,
        {
            "key": guid,
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

    // curl -X POST -H "Content-Type: application/json" -d '{"knownid":{"AnotherId":"2","BlaghId":"42"}}' http://localhost:3010/device/by?access_token=0d1b02f9-c7e9-42c3-8518-7d744b827274
    $http.post(rootAPI + 'device/by' + parameters,
        {
            "knownid": {
                "SampleId": "324"
            }
        }).
        success(function (data) {
            $scope.device = data;
        }).
        error(function (data, status, headers, config) {
            $scope.error = data;
            $scope.status = status;
            $scope.headers = headers;
            $scope.config = config;
        });
}
