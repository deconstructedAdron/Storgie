var error400 = 'Error 400: Post syntax incorrect.',
    data_tier = require('../data/storgie'),
    storgie_api = exports,
    orchestrator = require('orchestrate')("1fce6199-5bfa-4750-80fb-0404bc457803");

storgie_api.storgie_stat = function (req, res) {
    var stat_response = fake_storgie_stat();
    res.send(JSON.stringify(stat_response));
};

storgie_api.ident_by_id = function (req, res) {
    var getby = req.params.id;
    var collection = data_tier.collection_idents;

    orchestrator.get(collection, getby)
        .then(function (result) {
//            console.log(result.body);
            res.send(result.body);
        })
        .fail(function (err) {
            res.send(err);
        });
};

storgie_api.convergence = function (req, res) {
    console.log('convergence status');
    return res.send(req);
};

storgie_api.ident_create = function (req, res) {
    if (!req.body.hasOwnProperty('key') || !req.body.hasOwnProperty('value')) {
        res.statusCode = 400;
        res.send(error400);
    }

    console.log(req.body.value);
    res.send('Record created ' + req.body.value);
};

storgie_api.scenario_create = function (req, res) {
    if (!req.body.hasOwnProperty('rowgen')) {
        res.statusCode = 400;
        res.send(error400);
    }

    var result = data_tier.build_static_data();
    res.send(result);
};