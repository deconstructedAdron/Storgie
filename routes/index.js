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

function gen_ios_ident(matched) {
    var data_iOS = new Object();
    data_iOS.AdId = chance.guid();
    data_iOS.VendorId = chance.guid();
    data_iOS.UUID = chance.guid();
    data_iOS.DevId = chance.guid();
    data_iOS.IP = chance.guid();
    data_iOS.WebId = chance.guid();
    data_iOS.Cookie = chance.guid();
    data_iOS.AppId = chance.guid();
    data_iOS.HashEmail = chance.guid();
    data_iOS.HashIdent = matched;
    return data_iOS;
}

function gen_browser_ident(matched) {
    var data_browser = new Object();
    data_browser.HashId = matched;
    data_browser.WebId = chance.guid();
    data_browser.AppId = chance.guid();
    data_browser.Cookie = chance.guid();
    data_browser.HashedItem1 = chance.guid();
    data_browser.HashedItem2 = chance.guid();
    data_browser.HashedItem3 = chance.guid();
    return data_browser;
}

exports.scenario_create = function (req, res) {
    if (!req.body.hasOwnProperty('rowgen')) {
        res.statusCode = 400;
        return res.send('Error 400: Post syntax incorrect.');
    }

    // Create
    var matched = chance.guid();

    var data_iOS = gen_ios_ident(matched);
    var data_browser = gen_browser_ident(matched);

    var value_data_ios = JSON.stringify(data_iOS);
    var value_data_browser = JSON.stringify(data_browser)

    var keyios = '186A91F7-45D7-4088-A644-306C6937FB5E';
    var keybrowser = '126A91F7-45D7-4088-A644-306C6937FB5E';

    function store_ident(deconstructed_key, value_data) {

        orchestrator.put(collection, deconstructed_key, value_data)
            .then(function (result) {
                var returnThis = deconstructed_key + ' written.';
                console.log(returnThis);
                res.send(returnThis);
            })
            .fail(function (err) {
                console.log('An error ' + err);
            });
    }

    store_ident(keyios, value_data_ios);
    store_ident(keybrowser, value_data_browser);
};