var error400 = 'Error 400: Post syntax incorrect.',
    fake_api = require("./fake_api");
storgie_api = exports,
    temporary_use = 1;

storgie_api.storgie_stat = function (req, res) {
    var stat_response = fake_storgie_stat();
    res.send(JSON.stringify(stat_response));
};

storgie_api.ident_by_id = function (req, res) {
    var getby = req.params.id;
    var arrayResult = fake_api.data_core_fake(getby);

    console.log("Retrieved by " + getby + ".");
    return res.send(arrayResult);
};

storgie_api.convergence = function (req, res) {
    console.log('convergence status');
    return res.send(req);
};

storgie_api.ident_create = function (req, res) {
    if (!req.body.hasOwnProperty('key') || !req.body.hasOwnProperty('value')) {
        res.statusCode = 400;
        return res.send(error400);
    }

    console.log(req.body.value);
    res.send('Record created ' + req.body.value);
};

storgie_api.scenario_create = function (req, res) {
    if (!req.body.hasOwnProperty('rowgen')) {
        res.statusCode = 400;
        return res.send(error400);
    }

    var answer = new Object();
    answer.response = 'Data generated.';

    res.send(JSON.stringify(answer));
};