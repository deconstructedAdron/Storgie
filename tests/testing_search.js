/**
 * Created by adron on 3/11/14.
 * Description: Testing search parameters.
 * License: Apache 2.0 => License: Apache 2.0 https://github.com/Deconstructed/Storgie/blob/master/LICENSE
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

        api.device_by(req, res);


    })
})
