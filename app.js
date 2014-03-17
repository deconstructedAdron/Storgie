/**
 * Created by Adron
 * License: Apache 2.0 => License: Apache 2.0 https://github.com/Deconstructed/Storgie/blob/master/LICENSE
 */

var express = require('express');
var site = require('./routes/site');
var api = require('./routes/api');
var http = require('http');
var path = require('path');
var config = require('./config');
// Routes Logic
var Routes = require('./routes/routing');
// Passport Security
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;

var users = [
    { id: 3, username: 'bob', token: '123456789', email: 'bob@example.com' },
    { id: 4, username: 'joe', token: 'abcdefghi', email: 'joe@example.com' },
    { id: 5, username: 'consociation', token: '0d1b02f9-c7e9-42c3-8518-7d744b827274', email: 'consociation@deconstructed.io'}
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
app.set('port', process.env.PORT || config.get('port'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('name', 'storgie');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

var routes = new Routes(app);

http.createServer(app).listen(app.get('port'), function () {
    console.log(app.get('name') + ' server listening on port ' + app.get('port'));
});
