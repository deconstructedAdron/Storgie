///**
// * Created by adron on 4/15/14.
// * Description: Testing consociation calls.
// */
//
//var should = require("should");
//var api = require('../routes/api');
//var config = require('../config');
//
//// Test variables.
//var theKey = "36b71bcd-995d-400f-9d69-7c75033a475e";
//var configConsociationApiUri = 'http://consociation.deconstructed.io/';
//
//var newDevice = {
//    key: theKey,
//    value: {
//        "knownid": {
//            "Id": "1",
//            "SampleId": "324",
//            "EmailId": "blagh@blagh.com"
//        },
//        metadataStuff: "The other metadata stuff to save.",
//        arbitraryKey: "db862f4f-30a2-4726-a495-e542a1896373"
//    }
//};
//
//describe('the consociation', function () {
//    it('should have the appropriate value for the URI.', function () {
//        var api_uri = config.get('consociation_api');
//        api_uri.should.eql(configConsociationApiUri);
//    })
//    it('should create device.', function () {
//        api.device_create(newDevice).should.eql(theKey);
//    })
//})
