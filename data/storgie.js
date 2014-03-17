/**
 * Created by Adron
 * License: Apache 2.0 => License: Apache 2.0 https://github.com/Deconstructed/Storgie/blob/master/LICENSE
 */

var config = require('../config'),
    collections = require('./collections'),
    orchestrator = require('orchestrate')(config.get('data_api_key')),
    storgie = exports;

storgie.collection = {
    identity: 'identity',
    converged: 'converged'
}

storgie.put = function (collection, key, value) {
    orchestrator.put(collection, key, value)
        .then(function (result) {
            console.log(result);
            res.send(result);
        })
        .fail(function (err) {
            console.log(err);
            res.send(err);
        });
}

storgie.get = function (collection, key) {
    orchestrator.get(collection, key)
        .then(function (result) {
            var body = result.body;
            console.log(body);
            res.send(body);
        })
        .fail(function (err) {
            console.log(err);
            res.send(err);
        });
}

storgie.search = function (collection, search) {
    orchestrator.search(collection, search)
        .then(function (result) {
            var result_message = result.body;
            console.log(result_message);
        })
        .fail(function (err) {
            console.log(err);
        })
}
