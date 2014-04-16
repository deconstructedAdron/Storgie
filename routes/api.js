/**
 * Created by Adron
 * License: Apache 2.0 => License: Apache 2.0 https://github.com/Deconstructed/Storgie/blob/master/LICENSE
 */
'use strict';

var error400 = 'Post syntax incorrect. There must be a key and value in the data passed in.',
    data_tier = require('../data/storgie'),
    storgie_api = exports,
    config = require('../config'),
    Q = require('kew'),
    Chance = require('chance'),
    chance = new Chance();

var orchestrator = require('orchestrate')(config.get('data_api_key'));
var test = 'test;';

// ****************************************
//  Status Information API Points
// ****************************************
storgie_api.storgie_stat = function () {

    return JSON.stringify(temp_storgie_stats());

    function temp_storgie_stats() {
        // This is here until the AWS (or whatever ecosystem) environment SDK
        // is applied and used to derive these and other statistics from the
        // actual ecosystem.
        var stamp = new Date();
        var sys_stat = new Object();
        sys_stat.Compute = '0 at Peak of 70% utilization.';
        sys_stat.Memory = 'None beyond threshold of 80% Memory utilization.';
        sys_stat.Stamp = stamp.getTime();
        var stat_response = new Object();
        stat_response.Servers = 2;
        stat_response.Compute = (chance.d8() * chance.d4());
        stat_response.Memory = (chance.d8() * chance.d4());
        stat_response.Stat = sys_stat;
        stat_response.Stamp = stamp.getTime();
        return stat_response;
    };
};

storgie_api.get_guid = function () {
    return chance.guid();
};

// ****************************************
//  Lucene Search String Parsing
// ****************************************
function getBySearchString(searchBody) {
    var searchString = '';
    var knownId = searchBody.knownid;
    var keys = Object.keys(knownId);

    for (var i = 0; i < keys.length; i++) {
        var property = keys[i];
        // In the documentation for Lucene it states there should be a colon
        // as shown in the line of code below, however that is not what actually
        // works in production. So after troubleshooting I've shifted to removing
        // the colon as in the actual line of code below.
        // searchString += keys[i] + ':"' + knownId[property] + '"';
        searchString += keys[i] + ':"' + knownId[property] + '"';
        if (keys.length > 0 && i < keys.length - 1) {
            searchString += ' OR ';
        }
    }

    if (searchString === '') {
        throw new Error('Invalid search string.');
    }

    return searchString;
}

// ****************************************
//  Identity API Points
// ****************************************
storgie_api.device_by = function (body) {
    var collection = data_tier.collection.device;
    var search = '';

    if (body.knownid != undefined) {
        search = getBySearchString(body);
        return orchestrator.search(collection, search)
            .then(function (result) {
                console.log(result.body);
                return result.body;
            })
    }
    if (body.deviceid != undefined) {
        return orchestrator.get(collection, body.deviceid)
            .then(function (result) {
                console.log(result.body);
                return result.body;
            })
    }
};

storgie_api.device_create = function (body) {
    return orchestrator.put(data_tier.collection.device, body.key, body.value)
        .then(function (result) {
            var result_message = {"key": body.key};
            console.log(result + result_message);
            return result_message;
        })
        .then(function (result) {
            consociate(result, body.value);
        })
        .fail(function (err) {
            console.log("failed to write key " + body.key);
            return err;
        });
};

// ****************************************
//  Convergence API Points
// ****************************************
storgie_api.identities = function (req, res) {
    res.send({"response": "response"});
};

storgie_api.identity = function (req, res) {
    if (!req.body.hasOwnProperty('key') || !req.body.hasOwnProperty('value')) {
        res.statusCode = 400;
        res.send(error400);
    }

    data_tier.put(data_tier.collection.identity, req.body.key, req.body.value);

    var result_message = {"key": req.body.key};

    console.log(result_message);
    res.send(result_message);
};

storgie_api.identity_by = function (body) {
    var collection = data_tier.collection.identity;
    var search = '';

    if (body.knownid != undefined) {
        search = getBySearchString(body);
        return orchestrator.search(collection, search)
            .then(function (result) {
                console.log(result.body);
                return result.body;
            })
    }
    if (body.deviceid != undefined) {
        search = getBySearchString(body);
        return orchestrator.search(collection, search)
            .then(function (result) {
                console.log(result.body);
                return result.body;
            })
    }
    if (body.identityid != undefined) {
        return orchestrator.get(collection, body.deviceid)
            .then(function (result) {
                console.log(result.body);
                return result.body;
            })
    }
};

function consociate(device, value) {

    var key = device.key;
    var knownid = value.knownid;

    //var device = {"knownid": {"Id": "1", "SampleId": "324", "EmailId": "blagh@blagh.com"}};


}
