var Chance = require('chance'),
    chance = new Chance(),
    error400 = 'Error 400: Post syntax incorrect.';

exports.storgie_stat = function (req, res) {
    var stamp = new Date();

    var sys_stat = new Object();
    sys_stat.Compute = '0 at Peak of 70% utilization.';
    sys_stat.Memory = 'None beyond threshold of 80% Memory utilization.';
    sys_stat.Stamp = stamp.getTime();

    var stat_response = new Object();
    stat_response.Servers = 2;
    stat_response.Compute = (chance.d8() * chance.d4()) + '% Average Across Servers.';
    stat_response.Memory = (chance.d8() * chance.d4()) + '% Average Memory Consumption.';
    stat_response.Stat = sys_stat;
    stat_response.Stamp = stamp.getTime();

    res.send(JSON.stringify(stat_response));
};

exports.ident_by_id = function (req, res) {



    console.log("Retrieved");
    return res.send(req);
};

exports.convergence = function (req, res) {
    console.log('convergence status');
    return res.send(req);
};

exports.ident_create = function (req, res) {
    if (!req.body.hasOwnProperty('key') || !req.body.hasOwnProperty('value')) {
        res.statusCode = 400;
        return res.send(error400);
    }

    console.log();
    console.log(req.body.value);
    res.send('Record created ' + req.body.value);
};

exports.scenario_create = function (req, res) {
    if (!req.body.hasOwnProperty('rowgen')) {
        res.statusCode = 400;
        return res.send(error400);
    }

    console.log('Scenario Created for test_one');

};