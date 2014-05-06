/**
 * Created by Adron
 * License: Apache 2.0 => License: Apache 2.0 https://github.com/Deconstructed/Storgie/blob/master/LICENSE
 */
'use strict';

var storgie_api = exports;

var data_tier = require('../data/storgie');
var config = require('../config');
var Q = require('kew');
var http = require('http');
var Chance = require('chance');
var chance = new Chance();

var orchestrator = require('orchestrate')(config.get('data_api_key'));

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

storgie_api.device_create = function (device) {
    return putCollectionKeyValue(device);
};

// ****************************************
//  Convergence API Points
// ****************************************
storgie_api.identities = function () {
    return {response: "response TBD"};
};

storgie_api.identity = function (identity) {
    return putCollectionKeyValue(identity);
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
        return orchestrator.get(collection, body.identityid)
            .then(function (result) {
                console.log(result.body);
                return result.body;
            })
    }
};

function putCollectionKeyValue(collectionKeyValue) {
    return orchestrator.put(data_tier.collection.identity, collectionKeyValue.key, collectionKeyValue.value)
        .then(function () {
            var result_message = {"key": collectionKeyValue.key};
            console.log(result_message);
            return result_message;
        })
        .then(function (result) {
            return consociate(result, collectionKeyValue.value);
        })
        .fail(function (err) {
            console.log("Failed to write key " + collectionKeyValue.key);
            console.log('Error: ' + err);
            return err;
        });
}

function consociate(device, value) {

    var key = device.key;

    var messageBody = JSON.stringify(value);
    var headers = getHeaders(messageBody.length);
    var hostname = config.get('consociation_api');
    var path = '/consociate?access_token=' + config.get('consociation_api_token');
    var options = getOptions(headers, hostname, path);

    // curl -X POST -H "Content-Type: application/json" -d '{"knownid": {"Id": "1", "SampleId": "324", "EmailId": "blagh@blagh.com"}}' http://consociation.deconstructed.io/consociate?access_token=1234

    //var device = {"knownid": {"Id": "1", "SampleId": "324", "EmailId": "blagh@blagh.com"}};

    var req = http.request(options, function (res) {
        res.setEncoding('utf-8');
        var responseString = '';

        res.on('data', function (data) {
            responseString += data;
            console.log(data);
            console.log('data' + data);
        });

        res.on('end', function () {
            console.log('end' + responseString);
        });
    });

    req.write(messageBody);
    req.end();
}

/***  refactored stuff ***/
function getOptions(hdrs, optionHostname, optionPath) {
    var options = {
        hostname: optionHostname,
        port: 80,
        path: optionPath,
        method: 'POST',
        headers: hdrs
    };
    return options;
}

function getHeaders(requestLenth) {
    var headers = {
        'Content-Type': 'application/json',
        'Content-Length': requestLenth
    };
    return headers;
}