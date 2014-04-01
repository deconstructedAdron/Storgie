/**
 * Created by Adron
 * License: Apache 2.0 => License: Apache 2.0 https://github.com/Deconstructed/Storgie/blob/master/LICENSE
 */

var config = require('../config'),
    orchestrator = require('orchestrate')(config.get('data_api_key')),
    storgie = exports;

storgie.collection = {
    device: 'device',
    identity: 'identity',
    account: 'account'
}

storgie.put = function (collection, key, value) {
    orchestrator.put(collection, key, value)
        .then(function (result) {
            console.log(result);
        })
        .fail(function (err) {
            console.log(err);
        });
}

storgie.get = function (collection, key) {
    orchestrator.get(collection, key)
        .then(function (result) {
            console.log(result);
        })
        .fail(function (err) {
            console.log(err);
        });
}

storgie.search = function (collection, search) {
    orchestrator.search(collection, search)
        .then(function (result) {
            console.log(result);
        })
        .fail(function (err) {
            console.log(err);
        })
}
