var orchestrator = require('orchestrate')("1fce6199-5bfa-4750-80fb-0404bc457803"),
    collection = 'idents',
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
        .then(function (res) {
            var result = req.body.key + 'written.';
            console.log(result);
            res.send(result);
        })
        .fail(function (err) {
            console.log('An error ' + err);
            res.send(err);
        });
};

exports.scenario_create = function (req, res) {
    if (!req.body.hasOwnProperty('rowgen')) {
        res.statusCode = 400;
        return res.send('Error 400: Post syntax incorrect.');
    }

    // Create
    var matched = chance.guid();

    var data_iOS = new Object();
    data_iOS.AdId = chance.guid();
    data_iOS.VendorId = chance.guid();
    data_iOS.UUID = matched;
    data_iOS.DevId = chance.guid();
    data_iOS.IP = chance.guid();
    data_iOS.WebId = chance.guid();
    data_iOS.Cookie = chance.guid();
    data_iOS.AppId = chance.guid();
    data_iOS.HashEmail = chance.guid();
    data_iOS.HashIdent = chance.guid();

    var data_Android = new Object();
    data_Android.


        var
    valueData = JSON.stringify(data_iOS);

    var keyValue = new Object();
    keyValue.key = 'test'; //chance.guid();
    keyValue.value = valueData;

    function extracted() {
        orchestrator.put(collection, keyValue.key, keyValue.value)
            .then(function (result) {
                var returnThis = keyValue.key + ' written.';
                console.log(returnThis);
                res.send(returnThis);

            })
            .fail(function (err) {
                console.log('An error ' + err);
            });
    }

    extracted();
};
