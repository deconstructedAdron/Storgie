/**
 * Created by adronhall on 6/10/14.
 */

var Consociator = exports;

Consociator.consociate = function (device, value) {


    return device + value;
}


//
//function consociate(device, value) {
//
//    var key = device.key;
//
//    var messageBody = JSON.stringify(value);
//    var headers = getHeaders(messageBody.length);
//    var hostname = config.get('consociation_api');
//    var path = '/consociate?access_token=' + config.get('consociation_api_token');
//    var options = getOptions(headers, hostname, path);
//
//    // curl -X POST -H "Content-Type: application/json" -d '{"knownid": {"Id": "1", "SampleId": "324", "EmailId": "blagh@blagh.com"}}' http://consociation.deconstructed.io/consociate?access_token=1234
//
//    //var device = {"knownid": {"Id": "1", "SampleId": "324", "EmailId": "blagh@blagh.com"}};
//
//    var req = http.request(options, function (res) {
//        res.setEncoding('utf-8');
//        var responseString = '';
//
//        res.on('data', function (data) {
//            responseString += data;
//            console.log(data);
//            console.log('data' + data);
//        });
//
//        res.on('end', function () {
//            console.log('end' + responseString);
//        });
//    });
//
//    req.write(messageBody);
//    req.end();
//}
//
///***  refactored stuff ***/
//function getOptions(hdrs, optionHostname, optionPath) {
//    var options = {
//        hostname: optionHostname,
//        port: 80,
//        path: optionPath,
//        method: 'POST',
//        headers: hdrs
//    };
//    return options;
//}
//
//function getHeaders(requestLenth) {
//    var headers = {
//        'Content-Type': 'application/json',
//        'Content-Length': requestLenth
//    };
//    return headers;
//}