var error400 = 'Error 400: Post syntax incorrect. Your key value stream is probably criss crossed yo!',
    data_tier = require('../data/storgie'),
    storgie_api = exports,
    fake_api = require('./fake_api'),
    orchestrate_key_holder = require("../key/orchestrate_key"),
    key_holder = new orchestrate_key_holder(),
    orchestrator = require('orchestrate')(key_holder.access_key);

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

storgie_api.ident_by_id = function (req, res) {
    var getBy = req.params.id;
    var collection = data_tier.collection_idents;

    orchestrator.get(collection, getBy)
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

storgie_api.ident_create = function (req, res) {
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
    console.log('convergence status');
    // Will fill this out as engine work is done to return a rollup of values based on convergence processing.
    return res.send(req);
};

storgie_api.converged_create = function (req, res) {
    // stub
    return res.send(req);
};

storgie_api.converged_by_id = function (req, res) {
    // stub
    return res.send(req);
};

storgie_api.converged_by_query = function (req, res) {
    // stub
    return res.send(req);
};

// ****************************************
//  Testing & Scenario API Points
// ****************************************

storgie_api.scenario_create = function (req, res) {
    if (!req.body.hasOwnProperty('rowgen')) {
        res.statusCode = 400;
        res.send(error400);
    }

    var result = data_tier.build_static_data();
    console.log(result);
    res.send(result);
};
