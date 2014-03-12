/**
 * Created by adron on 3/11/14.
 * Description: Testing search parameters.
 */

var should = require('should');
var api = require('../routes/api');

describe('the search functionality', function () {
    it('should filter parameters to knownid or rootid.', function () {
        var req = {};
        var res = {};
        res.body = {
            "KnownId": {
                "AnotherId": "2",
                "TestId": "42"
            }
        };

        api.identity_by_id(req, res);


    })
})
