/**
 * Created by adron on 3/17/14.
 * Description: Routing.
 */

var site = require('./site');

module.exports = RoutingMap;

function RoutingMap(app) {
    // *********************************************************************************************************************
    // Site Route Mapping
    // *********************************************************************************************************************
    app.get('/', site.index);
    app.get('/login', site.login);
    app.get('/signup', site.signup);
    app.get('/status', site.status);
    app.post('/signup', site.signingup);

    // *********************************************************************************************************************
    // Device API Route Mapping
    // *********************************************************************************************************************

    // curl -v http://localhost:3010/stat?access_token=123456789
    app.get('/stat',
        passport.authenticate('bearer', { session: false}),
        function (req, res) {
            res.send(JSON.stringify(api.storgie_stat()));
        });

    // curl -X POST -H "Content-Type: application/json" -d '{"key":"the_key_1","value":{"knownid":{"Id":"1","SampleId":"324","EmailId":"blagh@blagh.com"}}}' http://localhost:3010/identity?access_token=0d1b02f9-c7e9-42c3-8518-7d744b827274
    app.post('/identity',
        passport.authenticate('bearer', { session: false}),
        function (req, res) {
            api.identity_create(req, res);
        });

    // curl -X POST -H "Content-Type: application/json" -d '{"root":"the_key_1"}' http://localhost:3010/identity/by?access_token=0d1b02f9-c7e9-42c3-8518-7d744b827274
    // curl -X POST -H "Content-Type: application/json" -d '{"knownid":{"AnotherId":"2","BlaghId":"42"}}' http://localhost:3010/identity/by?access_token=0d1b02f9-c7e9-42c3-8518-7d744b827274
    // curl -X POST -H "Content-Type: application/json" -d '{"knownid":{"AnotherId":"2","BlaghId":"42","TestableId":"1234"}}' http://localhost:3010/identity/by?access_token=0d1b02f9-c7e9-42c3-8518-7d744b827274
    app.post('/identity/by',
        passport.authenticate('bearer', { session: false}),
        function (req, res) {
            api.identity_by_id(req.body)
                .then(function (result) {
                    res.send(result);
                })
                .fail(function (err) {
                    res.statusCode = 400;
                    res.send(err);
                });
        });


    // *********************************************************************************************************************
    // Identity API Route Mapping
    // *********************************************************************************************************************

    // curl -v http://localhost:3010/convergence?access_token=123456789
    app.get('/convergence',
        passport.authenticate('bearer', { session: false }),
        function (req, res) {
            api.convergence(req, res);
        });

    // curl -v -X POST -d '{"key":"1","value":"testing"}' http://localhost:3010/converged/by?access_token=0d1b02f9-c7e9-42c3-8518-7d744b827274
    // curl -v -X POST -d '{"key":"2","value":"{"knownid":"{"AnotherId":"2"}"}"}' http://localhost:3010/converged/by?access_token=0d1b02f9-c7e9-42c3-8518-7d744b827274
    app.post('/converged/by',
        passport.authenticate('bearer', { session: false }),
        function (req, res) {
            api.converged_by_id(req, res);
        })
}
