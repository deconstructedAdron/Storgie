var orchestrator = require('orchestrate')("01233006-eaa7-4e3a-94d5-bb27cfc809cd"),
    collection = 'listz',
    Chance = require('chance'),
    chance = new Chance();

exports.index = function (req, res) {
    res.render('index', { title: 'Storgie' });
};

exports.login = function (req, res) {
    res.render('login', {title: "Login to Storgie."});
};

exports.signup = function (req, res) {
    res.render('signup', {title: "Sign Up For Storgie."});
};

exports.status = function (req, res) {
    res.render('status', {title: "Storgie Status & Tests"});
};

exports.storgie_stat = function (req, res) {
    res.send('Storgie Ecosystem Active.');
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
        return res.send('Error 400: Post syntax incorrect.');
    }

    console.log();
    console.log(req.body.value);

    orchestrator.put(collection, req.body.key, req.body.value)
        .then(function (result) {
            var result = req.body.key + 'written.';
            console.log(result);
            res.send(result);

        })
        .fail(function (err) {
            console.log('An error ' + err);
        });
};

exports.scenario_create = function (req, res) {
    if (!req.body.hasOwnProperty('rowgen')) {
        res.statusCode = 400;
        return res.send('Error 400: Post syntax incorrect.');
    }

    var matched = chance.guid();

    var identifier = new Object();
    identifier.guid = matched;
    identifier.something = req.body.rowgen;
    identifier.first = chance.first();
    identifier.last = chance.last();
    identifier.cell = chance.phone();
    identifier.work = chance.phone();
    identifier.birthday = chance.birthday();
    identifier.gender = chance.gender();
    identifier.long = chance.longitude();
    identifier.lat = chance.latitude();
    identifier.CFUUID = chance.guid();
    identifier.convergence = 'green';

    var identifier = JSON.stringify(identifier);

    var keyValue = new Object();
    keyValue.key = 'test'; //chance.guid();
    keyValue.value = identifier;

    orchestrator.put(collection, keyValue.key, keyValue.value)
        .then(function (result) {
            var returnThis = keyValue.key + ' written.';
            console.log(returnThis);
            res.send(returnThis);

        })
        .fail(function (err) {
            console.log('An error ' + err);
        });
};