/**
 * Created by Adron
 * License: Apache 2.0 => License: Apache 2.0 https://github.com/Deconstructed/Storgie/blob/master/LICENSE
 */
'use strict'

var error400 = 'Post syntax incorrect. There must be a key and value in the data passed in.',
    data_tier = require('../data/storgie'),
    storgie_api = exports,
    fake_api = require('./fake_api'),
    config = require('../config'),
    Q = require('kew'),
    Chance = require('chance'),
    chance = new Chance();

var orchestrator = require('orchestrate')(config.get('data_api_key'));
var test = 'test;';

storgie_api.finishing = function (req, res, path, returnThis) {
    console.log('Requested by: ' + path + JSON.stringify(req.body));
    return res.send(returnThis);
}

// ****************************************
//  Status Information API Points
// ****************************************
storgie_api.storgie_stat = function () {
    return fake_api.storgie_stat();
};

storgie_api.get_guid = function () {
    return chance.guid();
};

// ****************************************
//  Lucene Search String Parsing
// ****************************************
function getByKnownId(searchBody) {
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
        searchString += keys[i] + '"' + knownId[property] + '"';
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
        search = getByKnownId(body);
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

storgie_api.device_create = function (req, res) {
    if (!req.body.hasOwnProperty('key') || !req.body.hasOwnProperty('value')) {
        res.statusCode = 400;
        res.send(error400);
    }

    data_tier.put(data_tier.collection.device, req.body.key, req.body.value);

    // Add consociation here.

    var result_message = {"key": req.body.key};

    console.log(result_message);
    res.send(result_message);
};

// ****************************************
//  Convergence API Points
// ****************************************
storgie_api.identity = function (req, res) {
    this.finishing(req, res, '/identity', {"foo": "yeah"});
};

storgie_api.identity_by = function (req, res) {
    var getByRootKey = req.body.root;
    var collection = data_tier.collection.identity;

    data_tier.put(data_tier.collection_idents, req.body.key, req.body.value);

    var result_message = {"key": req.body.key};

    console.log(result_message);
    res.send(result_message);
};
