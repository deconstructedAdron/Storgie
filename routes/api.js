var error400 = 'Error 400: Post syntax incorrect. Your key value stream is probably criss crossed yo!',
    data_tier = require('../data/storgie'),
    storgie_api = exports,
    fake_api = require('./fake_api'),
    orchestrate_key_holder = require("../key/orchestrate_key"),
    key_holder = new orchestrate_key_holder(),
    orchestrator = require('orchestrate')(key_holder.access_key);

storgie_api.finishing = function (req, res, path, returnThis) {
    console.log('Requested by: ' + path + JSON.stringify(req.body));
    return res.send(returnThis);
}

// ****************************************
//  Status Information API Points
// ****************************************

storgie_api.storgie_stat = function (req, res) {
    var stat_response = fake_api.storgie_stat();
    res.send(JSON.stringify(stat_response));
};

// ****************************************
//  Identity API Points
// ****************************************
''
storgie_api.identity_by_id = function (req, res) {
    var getByRootKey = req.body.root;
    //    var getByKnownKey = req.body.known;
    var collection = data_tier.collection_idents;

    orchestrator.get(collection, getByRootKey)
        .then(function (result) {
            var result_message = 'id of ' + result.key + ' and content of ' + result.body;
            console.log(result_message);
            res.send(result);
        })
        .fail(function (err) {
            console.log(err);
            res.send(err);
        });
};


storgie_api.identity_create = function (req, res) {
    if (!req.body.hasOwnProperty('key') || !req.body.hasOwnProperty('value')) {
        res.statusCode = 400;
        res.send(error400);
    }

    data_tier.put(data_tier.collection_idents, req.body.key, req.body.value);

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

storgie_api.converged_by_id = function (req, res) {
    this.finishing(req, res, '/converged/by', 'id');
};

// ****************************************
//  Testing & Scenario API Points
// ****************************************

storgie_api.scenario_create = function (req, res) {

    var rowgen = req.body.hasOwnProperty('rowgen');

    if (!rowgen) {
        res.statusCode = 400;
        return res.send(error400);
    }

    var result = data_tier.build_static_data();
    console.log(result);
    return res.send(result);
};
