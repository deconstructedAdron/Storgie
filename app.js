var express = require('express');
var site = require('./routes/site');
var api = require('./routes/api');
var http = require('http');
var path = require('path');

// Passport Security
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;

var users = [
    { id: 1, username: 'sally', password: 'secret', email: 'bob@example.com', apikey: 'asdasjsdgfjkjhg' },
    { id: 2, username: 'frank', password: 'birthday', email: 'joe@example.com', apikey: 'gfsdgsfgsfg' },
    { id: 3, username: 'bob', token: '123456789', email: 'bob@example.com' },
    { id: 4, username: 'joe', token: 'abcdefghi', email: 'joe@example.com' }
];

function findById(id, fn) {
    var idx = id - 1;
    if (users[idx]) {
        fn(null, users[idx]);
    } else {
        fn(new Error('User ' + id + ' does not exist'));
    }
}

function findByToken(token, fn) {
    for (var i = 0, len = users.length; i < len; i++) {
        var user = users[i];
        if (user.token === token) {
            return fn(null, user);
        }
    }
    return fn(null, null);
}

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new BearerStrategy({
    },
    function (token, done) {
        // asynchronous validation, for effect...
        process.nextTick(function () {

            // Find the user by token.  If there is no user with the given token, set
            // the user to `false` to indicate failure.  Otherwise, return the
            // authenticated `user`.  Note that in a production-ready application, one
            // would want to validate the token for authenticity.
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

//app.use(express.cookieParser());
//app.use(express.session({ secret: 'keyboard cat' }));
//app.use(flash());

app.use(passport.initialize());
app.use(passport.session());


app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
// Passport
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

// storgie api identity ident management.
app.get('/stat', api.storgie_stat);
// curl localhost:3010/stat
app.post('/identity', api.identity_create);
// curl -X POST -H "Content-Type: application/json" -d '{"apikey":"asdasjsdgfjkjhg", "key":"10","value":{"knownid":{"Id":"1","SampleId":"324","EmailId":"blagh@blagh.com"}}}' http://localhost:3010/identity
app.get('/identity/:id', api.identity_by_id);

// storgie api converged data
app.get('/convergence', api.convergence);
app.post('/converged', api.converged_create);

// curl -v -X POST -d '{"key":"1","value":"testing"}' http://localhost:3010/converged/by?access_token=123456789
// curl -v -X POST -d '{"key":"2","value":"{"knownid":"{"oneid":"1234","emailid":"blagh@blagh.com"}"}"}' http://localhost:3010/converged/by?access_token=123456789
app.post('/converged/by',
    passport.authenticate('bearer', { session: false }),
    function (req, res) {
        api.converged_by_id(req, res);
    })

// storgie scenario generator
// curl -v -X POST -d '{"rowgen":"yes"}' http://localhost:3010/scenario?access_token=123456789
app.post('/scenario',
    passport.authenticate('bearer', { session: false }),
    function (req, res) {
        api.scenario_create(req, res);
    })

http.createServer(app).listen(app.get('port'), function () {
    console.log(app.get('name') + ' server listening on port ' + app.get('port'));
});
