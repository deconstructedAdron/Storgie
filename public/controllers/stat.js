/**
 * Created by Adron on 3/9/14.
 * Description a simple controller to get the results of the stat API service.
 */

//var rootAPI = 'http://api.deconstructed.io/';
var rootAPI = 'http://localhost:3010/';
var parameters = '?access_token=123456789';
var full_identity = {
    "count": 3,
    "total_count": 3,
    "results": [
        {
            "path": {
                "collection": "device",
                "key": "F2570A8C-C648-5501-B607-6A4A1DAE2EDF",
                "ref": "e0804b005dd91369"
            },
            "value": {
                "knownid": {
                    "Id": "appended123-stuffF2570A8C-C648-5501-B607-6A4A1DAE2EDF",
                    "SampleId": "234-23498-12435",
                    "EmailId": "another@another.com"
                },
                "next": "DELETE",
                "somestuff": "testing",
                "morestuff": "woot"
            },
            "score": 2.874103546142578
        },
        {
            "path": {
                "collection": "device",
                "key": "9720CAC1-0161-59AF-9E65-C48FC3DFB7D5",
                "ref": "c23a9676ac587a2f"
            },
            "value": {
                "knownid": {
                    "Id": "9720CAC1-0161-59AF-9E65-C48FC3DFB7D5",
                    "SampleId": "234-12435",
                    "EmailId": "another@another.com"
                },
                "next": "DELETE",
                "somestuff": "another testing",
                "device": "android v4.3.212132.09"
            },
            "score": 2.874103546142578
        },
        {
            "path": {
                "collection": "device",
                "key": "70D02EC3-BFBA-5443-BAEF-D90A60A6D1FF",
                "ref": "6ce6df90473ed66d"
            },
            "value": {
                "knownid": {
                    "Id": "70D02EC3-BFBA-5443-BAEF-D90A60A6D1FF",
                    "EmailId": "another@another.com"
                },
                "next": "DELETE",
                "somestuff": "another testing",
                "device": "iPhone v4.01"
            },
            "score": 2.874103546142578
        }
    ]
};

function Stat($scope, $http) {

    $http.get(rootAPI + 'stat' + parameters)
        .success(function (data) {
            $scope.storgie_status = data;
        })
        .error(function (data, status, headers, config) {
            $scope.error = data;
            $scope.status = status;
            $scope.headers = headers;
            $scope.config = config;
        });

    $http.get(rootAPI + 'guid' + parameters)
        .success(function (data) {
            $scope.generated_guid = data;
            statTestDeviceApi($http, data, $scope);
        })
        .error(function (data, status, headers, config) {
            $scope.error = data;
            $scope.status = status;
            $scope.headers = headers;
            $scope.config = config;
        });

//    $http.get(rootAPI + 'guid' + parameters)
//        .success(function (data) {
//            $scope.generated_guid = data;
//            statTestIdentityApi($http, data, $scope);
//        })
//        .error(function (data, status, headers, config) {
//            $scope.error = data;
//            $scope.status = status;
//            $scope.headers = headers;
//            $scope.config = config;
//        });
}

function statTestDeviceApi($http, guid, $scope) {
    add_device_1($http, guid, $scope);
    add_device_2($http, guid, $scope);
    add_device_3($http, guid, $scope);

    testingDeviceBy($http, guid, $scope);
}

function add_device_1($http, guid, $scope) {
    $http.post(rootAPI + 'device' + parameters,
        {
            "key": guid,
            "value": {
                "knownid": {
                    "Id": guid,
                    "SampleId": '01SampleI7',
                    "EmailId": "another@another.com"
                },
                "next": "DELETE",
                "somestuff": "another testing",
                "device": "iPhone v4.01"
            }
        })
        .success(function (data) {
            $scope.written_id = data;
        })
        .error(function (data, status, headers, config) {
            $scope.error = data;
            $scope.status = status;
            $scope.headers = headers;
            $scope.config = config;
        });
}

function add_device_2($http, guid, $scope) {
    $http.post(rootAPI + 'device' + parameters,
        {
            "key": guid + "2",
            "value": {
                "knownid": {
                    "Id": guid + "2",
                    "EmailId": "another@another.com"
                },
                "next": "DELETE",
                "somestuff": "another testing",
                "device": "Android v4.3.02342.12312.09"
            }
        })
        .success(function (data) {
            $scope.written_id = data;
        })
        .error(function (data, status, headers, config) {
            $scope.error = data;
            $scope.status = status;
            $scope.headers = headers;
            $scope.config = config;
        });
}

function add_device_3($http, guid, $scope) {
    $http.post(rootAPI + 'device' + parameters,
        {
            "key": guid + "3",
            "value": {
                "knownid": {
                    "Id": guid + "3",
                    "SessionId": "90234523" + guid + "-ABD-90134252",
                    "EmailId": "another@another.com"
                },
                "next": "DELETE",
                "somestuff": "another testing",
                "device": "Browser - Chrome v30.2331"
            }
        })
        .success(function (data) {
            $scope.written_id = data;
        })
        .error(function (data, status, headers, config) {
            $scope.error = data;
            $scope.status = status;
            $scope.headers = headers;
            $scope.config = config;
        });
}

function testingDeviceBy($http, guid, $scope) {
    $http.post(rootAPI + 'device/by' + parameters,
        {
            knownid: {
                EmailId: "another@another.com"
            }
        }).
        success(function (data) {
            $scope.device_by_known = data;
        }).
        error(function (data, status, headers, config) {
            $scope.error = data;
            $scope.status = status;
            $scope.headers = headers;
            $scope.config = config;
        });
    $http.post(rootAPI + 'device/by' + parameters,
        {
            deviceid: guid
        }).
        success(function (data) {
            $scope.device_by_key = data;
        }).
        error(function (data, status, headers, config) {
            $scope.error = data;
            $scope.status = status;
            $scope.headers = headers;
            $scope.config = config;
        });
}

//function statTestIdentityApi($http, guid, $scope) {
//    $http.post(rootAPI + 'device' + parameters,
//        {
//            "key": guid,
//            "value": {
//                "knownid": {
//                    "Id": "appended123-stuff" + guid,
//                    "SampleId": "234-23498-12435",
//                    "EmailId": "another@another.com"
//                },
//                "next": "DELETE",
//                "somestuff": "testing",
//                "morestuff": "woot"
//            }
//        })
//        .success(function (data) {
//            $scope.identity_added = data;
//        })
//        .error(function (data, status, headers, config) {
//            $scope.error = data;
//            $scope.status = status;
//            $scope.headers = headers;
//            $scope.config = config;
//        });
//}