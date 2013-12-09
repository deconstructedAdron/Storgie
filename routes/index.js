var orchestrator = require('orchestrate')("01233006-eaa7-4e3a-94d5-bb27cfc809cd"),
    collection = 'listz';

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
    console.log("Blurgh");
    return res.send(res);
};

exports.convergence = function (req, res) {
    console.log('convergence status');

    //Convergence Status Goes Here.

    return res.send(res);
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