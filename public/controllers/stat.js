/**
 * Created by Adron on 3/9/14.
 * Description a simple controller to get the results of the stat API service.
 */

var rootAPI = 'http://api.deconstructed.io/';

function Hello($scope, $http) {
    $http.get(rootAPI + 'stat').
        success(function (data) {
            $scope.greeting = data;
        });
}

//function Hello($scope, $http) {
//    $http.get('http://rest-service.guides.spring.io/greeting').
//        success(function(data) {
//            $scope.greeting = data;
//        });
//}