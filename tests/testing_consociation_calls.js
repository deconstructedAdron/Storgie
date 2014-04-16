/**
 * Created by adron on 4/15/14.
 * Description: Testing consociation calls.
 */

var should = require("should");
var api = require('../routes/api');
var config = require('../config');


var device = {"knownid": {"Id": "1", "SampleId": "324", "EmailId": "blagh@blagh.com"}};


describe('the consociation', function () {
    it('should have the appropriate value for the URI.', function () {
        var api_uri = config.get('consociation_api');
        api_uri.should.eql('http://consociation.deconstructed.io/');
    })
})
