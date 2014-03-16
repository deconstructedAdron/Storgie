/**
 * Created by Adron
 * License: Apache 2.0 => License: Apache 2.0 https://github.com/Deconstructed/Storgie/blob/master/LICENSE
 */
'use strict'

var error400 = 'Post syntax incorrect. There must be a key and value in the data passed in.',
    data_tier = require('../data/storgie'),
    storgie_api = exports,
    fake_api = require('./fake_api'),
    orchestrate_key_holder = require("../key/orchestrate_key"),
    key_holder = new orchestrate_key_holder(),
    orchestrator = require('orchestrate')(key_holder.access_key),
    Q = require('kew');

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

// ****************************************
//  Identity API Points
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
    return searchString;
}

function getByRootId(searchBody) {
    var searchString = '';
    var searchElementKeys = Object.keys(searchBody.rootid);

    for (var i = 0; i < searchElementKeys.length; i++) {

    }
}
function getLuceneSearch(searchBody) {
    var searchStringResult = '';

    if (searchBody.knownid != undefined) {
        searchStringResult = getByKnownId(searchBody);
    } else if (searchBody.rootid != undefined) {
        searchStringResult = getByRootId(searchBody);
    }

    return searchStringResult;
}

storgie_api.identity_by_id = function (body) {
    var collection = data_tier.collection_idents;
    var search = getLuceneSearch(body);

    if (search === '') {
        throw new Error
        'Invalid search string.';
    }

    return orchestrator.search(collection, search)
        .then(function (result) {
            var result_message = result.body;
            console.log(result_message);
            return result.body;
        })
};

storgie_api.identity_create = function (req, res) {
    if (!req.body.hasOwnProperty('key') || !req.body.hasOwnProperty('value')) {
        res.statusCode = 400;
        res.send(error400);
    }

    data_tier.put(data_tier.collection_idents, req.body.key, req.body.value);

    data_tier.consociate(req.body.key, req.body.value);

    var result_message = {"key": req.body.key};

    console.log(result_message);
    res.send(result_message);
};

// ****************************************
//  Convergence API Points
// ****************************************

storgie_api.convergence = function (req, res) {
    this.finishing(req, res, '/convergence', {"foo": "yeah"});
};

storgie_api.converged = function (req, res) {
    var getByRootKey = req.body.root;
    var collection = data_tier.collection_idents;

    data_tier.put(data_tier.collection_idents, req.body.key, req.body.value);

    var result_message = {"key": req.body.key};

    console.log(result_message);
    res.send(result_message);
};

storgie_api.converged_by_id = function (req, res) {
    this.finishing(req, res, '/converged/by', 'id');
};
