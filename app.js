var express = require('express');
var site = require('./routes/site');
var api = require('./routes/api');
var http = require('http');
var path = require('path');

// Passport Security
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;

var users = [
    { id: 3, username: 'bob', token: '123456789', email: 'bob@example.com' },
    { id: 4, username: 'joe', token: 'abcdefghi', email: 'joe@example.com' }
];

function findByToken(token, fn) {
    for (var i = 0, len = users.length; i < len; i++) {
        var user = users[i];
        if (user.token === token) {
            return fn(null, user);
        }
    }
    return fn(null, null);
}

passport.use(new BearerStrategy({
    },
    function (token, done) {
        // asynchronous validation, for effect...
        process.nextTick(function () {

            findByToken(token, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            })
        });
    }
));

var app = express();
app.set('port', process.env.PORT || 3010);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('name', 'storgie');
app.use(express.favicon(path.join(__dirname, '/public/favicon.ico')));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

// storgie server information
app.get('/', site.index);
app.get('/login', site.login);
app.get('/signup', site.signup);
app.get('/status', site.status);
app.post('/signup', site.signingup);

// *********************************************************************************************************************
// storgie api identity ident management.
// *********************************************************************************************************************
// curl -v http://localhost:3010/stat?access_token=123456789
app.get('/stat',
    passport.authenticate('bearer', { session: false}),
    function (req, res) {
        api.storgie_stat(req, res);
    });

// curl -X POST -H "Content-Type: application/json" -d '{"key":"the_key_1","value":{"knownid":{"Id":"1","SampleId":"324","EmailId":"blagh@blagh.com"}}}' http://localhost:3010/identity?access_token=123456789
app.post('/identity',
    passport.authenticate('bearer', { session: false}),
    function (req, res) {
        api.identity_create(req, res);
    });

// curl -X POST -H "Content-Type: application/json" -d '{"root":"the_key_1"}' http://localhost:3010/identity/by?access_token=123456789
// curl -X POST -H "Content-Type: application/json" -d '{"knownid":"known_id_1"}' http://localhost:3010/identity/by?access_token=123456789
app.post('/identity/by',
    passport.authenticate('bearer', { session: false}),
    function (req, res) {
        api.identity_by_id(req, res);
    });

// *********************************************************************************************************************
// storgie api converged data
// *********************************************************************************************************************

// curl -v http://localhost:3010/convergence?access_token=123456789
app.get('/convergence',
    passport.authenticate('bearer', { session: false }),
    function (req, res) {
        api.convergence(req, res);
    });

// curl -v -X POST -d '{"key":"1","value":"testing"}' http://localhost:3010/converged?access_token=123456789
app.post('/converged',
    passport.authenticate('bearer', { session: false }),
    function (req, res) {
        api.converged_create(req, res);
    });

// curl -v -X POST -d '{"key":"1","value":"testing"}' http://localhost:3010/converged/by?access_token=123456789
// curl -v -X POST -d '{"key":"2","value":"{"knownid":"{"oneid":"1234","emailid":"blagh@blagh.com"}"}"}' http://localhost:3010/converged/by?access_token=123456789
app.post('/converged/by',
    passport.authenticate('bearer', { session: false }),
    function (req, res) {
        api.converged_by_id(req, res);
    })

// *********************************************************************************************************************
// storgie scenario generator
// *********************************************************************************************************************

// curl -v -X POST -d '{"rowgen":"yes"}' http://localhost:3010/scenario?access_token=123456789
app.post('/scenario',
    passport.authenticate('bearer', { session: false }),
    function (req, res) {
        api.scenario_create(req, res);
    })

http.createServer(app).listen(app.get('port'), function () {
    console.log(app.get('name') + ' server listening on port ' + app.get('port'));
});
