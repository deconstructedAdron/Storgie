/**
 * Created by adron on 3/17/14.
 * Description: Routing.
 * License: Apache 2.0 => License: Apache 2.0 https://github.com/Deconstructed/Storgie/blob/master/LICENSE
 */

// Passport Security
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var userManagement = require('./accounts/users');
var error400 = 'Post syntax incorrect. There must be a key and value in the data passed in.';

// *********************************************************************************************************************
// Temporary Users - This whole section needs ported out to the database.
// *********************************************************************************************************************
var users = userManagement.getUsers();

function findByUsername(username, fn) {
    for (var i = 0, len = users.length; i < len; i++) {
        var user = users[i];
        if (user.username === username) {
            return fn(null, user);
        }
    }
    return fn(null, null);
}

passport.use(new BasicStrategy({
    },
    function (username, password, done) {
        process.nextTick(function () {
            findByUsername(username, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                if (user.password != password) {
                    return done(null, false);
                }
                return done(null, user);
            })
        });
    }
));

var api = require('./routes/api');
var routing = exports;

routing.load_routes = function (app) {
    // *********************************************************************************************************************
    // Setup passport security.
    // *********************************************************************************************************************
    app.use(passport.initialize());

    // *********************************************************************************************************************
    // Site Route Mapping
    // *********************************************************************************************************************
    app.get('/mu-41acf44f-894ab026-ac5e0f6d-75c032d0', function (req, res) {
        res.send('42');
    });

    // *********************************************************************************************************************
    // Device API Route Mapping
    // *********************************************************************************************************************

    // curl -v -u public:123456789 http://localhost:3010/stat
    app.get('/stat',
        passport.authenticate('basic', { session: false}),
        function (req, res) {
            res.send(api.storgie_stat());
        });

    // curl -v http://localhost:3010/guid
    app.get('/guid',
        passport.authenticate('basic', {session: false}),
        function (req, res) {
            res.send(api.get_guid());
        });

    // Good Request
    // curl -u public:123456789  -X POST -H "Content-Type: application/json" -d '{"key":"the_key_333","value":{"knownid":{"Id":"1","SampleId":"324","EmailId":"blagh@blagh.com"}}}' http://localhost:3010/device?access_token=0d1b02f9-c7e9-42c3-8518-7d744b827274
    // Bad Request
    // curl -u public:123456789  -X POST -H "Content-Type: application/json" -d '{"key1":"the_key_333","value":{"knownid":{"Id":"1","SampleId":"324","EmailId":"blagh@blagh.com"}}}' http://localhost:3010/device?access_token=0d1b02f9-c7e9-42c3-8518-7d744b827274
    app.post('/device',
        passport.authenticate('basic', { session: false}),
        function (req, res) {
            validateKeyValueExists(req, res);
            api.device_create(req.body)
                .then(function (result) {
                    res.send(result);
                });
        });

    // curl -u public:123456789  -X POST -H "Content-Type: application/json" -d '{"deviceid":"the_key_333"}' http://localhost:3010/device/by?access_token=0d1b02f9-c7e9-42c3-8518-7d744b827274
    // curl -u public:123456789  -X POST -H "Content-Type: application/json" -d '{"knownid":{"Id":"1","SampleId":"324"}}' http://localhost:3010/device/by?access_token=0d1b02f9-c7e9-42c3-8518-7d744b827274
    // curl -u public:123456789  -X POST -H "Content-Type: application/json" -d '{"knownid":{"Id":"1","SampleId":"324","EmailId":"blagh@blagh.com"}}' http://localhost:3010/device/by?access_token=0d1b02f9-c7e9-42c3-8518-7d744b827274
    app.post('/device/by',
        passport.authenticate('basic', { session: false}),
        function (req, res) {
            api.device_by(req.body)
                .then(function (result) {
                    res.send(result);
                })
                .fail(function (err) {
                    res.statusCode = 400;
                    res.send(err);
                });
        })

    // *********************************************************************************************************************
    // Identity API Route Mapping
    // *********************************************************************************************************************

    // curl -v -u public:123456789  http://localhost:3010/identities
    app.get('/identities',
        passport.authenticate('basic', {session: false}),
        function (req, res) {
            res.send(api.identities());
        });

    // curl -u public:123456789  -X POST -H "Content-Type: application/json" -d '{"key":"the_key_333","value":{"knownid":{"Id":"1","SampleId":"324","EmailId":"blagh@blagh.com"}}}' http://localhost:3010/identity
    // Bad Request
    // curl -u public:123456789  -X POST -H "Content-Type: application/json" -d '{"key2":"the_key_333","value":{"knownid":{"Id":"1","SampleId":"324","EmailId":"blagh@blagh.com"}}}' http://localhost:3010/identity
    app.post('/identity',
        passport.authenticate('basic', { session: false }),
        function (req, res) {
            validateKeyValueExists(req, res);
            api.identity(req.body)
                .then(function (result) {
                    res.send(result);
                });
        });

    // curl -u public:123456789  -X POST -H "Content-Type: application/json" -d '{"identityid":"the_key_333"}' http://localhost:3010/identity/by
    // curl -u public:123456789  -X POST -H "Content-Type: application/json" -d '{"knownid":{"Id":"1","SampleId":"324"}}' http://localhost:3010/identity/by
    // curl -u public:123456789  -X POST -H "Content-Type: application/json" -d '{"knownid":{"Id":"1","SampleId":"324","EmailId":"blagh@blagh.com"}}' http://localhost:3010/identity/by
    app.post('/identity/by',
        passport.authenticate('basic', { session: false }),
        function (req, res) {
            api.identity_by(req.body)
                .then(function (result) {
                    console.log(result);
                    res.send(result);
                })
                .fail(function (err) {
                    res.statusCode = 400;
                    res.send(err);
                })
        })

    function validateKeyValueExists(req, res) {
        if (!req.body.hasOwnProperty('key') || !req.body.hasOwnProperty('value')) {
            res.statusCode = 400;
            res.send(error400);
        }
    }


    // *********************************************************************************************************************
    // Identity API Route Mapping
    // *********************************************************************************************************************

    // curl -u public:123456789  -X POST -H "Content-Type: application/json" -d '{"query":""}' http://localhost:3010/identity/by

}
