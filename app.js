var express = require('express');
var site = require('./routes/site');
var api = require('./routes/api');
var http = require('http');
var path = require('path');

// Passport Security
var passport = require('passport');
var flash = require('connect-flash');
var LocalStrategy = require('passport-localapikey').Strategy;
;

var users = [
    { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com', apikey: 'asdasjsdgfjkjhg' },
    { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com', apikey: 'gfsdgsfgsfg' }
];

function findById(id, fn) {
    var idx = id - 1;
    if (users[idx]) {
        fn(null, users[idx]);
    } else {
        fn(new Error('User ' + id + ' does not exist'));
    }
}

function findByApiKey(apikey, fn) {
    for (var i = 0, len = users.length; i < len; i++) {
        var user = users[i];
        if (user.apikey === apikey) {
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

// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(
    function (apikey, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {

            // Find the user by username.  If there is no user with the given
            // username, or the password is not correct, set the user to `false` to
            // indicate failure and set a flash message.  Otherwise, return the
            // authenticated `user`.
            findByApiKey(apikey, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, { message: 'Unknown apikey : ' + apikey });
                }
                // if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
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

app.use(express.cookieParser());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(flash());

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
// curl -X POST -H "Content-Type: application/json" -d '{"apikey":"blagh", "key":"10","value":{"knownid":{"Id":"1","SampleId":"324","EmailId":"blagh@blagh.com"}}}' http://localhost:3010/stat
app.get('/identity/:id', api.identity_by_id);

// storgie api converged data
app.get('/convergence', api.convergence);
app.post('/converged', api.converged_create);
app.get('/converged/:id', api.converged_by_id);

// storgie scenario generator
app.post('/scenario', api.scenario_create);

var unauthorized = '/api/unauthorized';
var authorize = '/api/authenticate';
//app.post('/scenario', passport.authenticate('localapikey', { failureRedirect: unauthorized, failureFlash: true }),
//    function (req, res){
//        api.scenario_create;
//    })

//   curl -v -d "apikey=asdasjsdgfjkjhg" http://127.0.0.1:3010/api/authenticate
app.post(authorize,
    passport.authenticate('localapikey', { failureRedirect: unauthorized, failureFlash: true }),
    function (req, res) {
        api.convergence(req, res);
    });

http.createServer(app).listen(app.get('port'), function () {
    console.log(app.get('name') + ' server listening on port ' + app.get('port'));
});
