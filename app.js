var express = require ('express');
var site = require ('./routes/site');
var api = require ('./routes/api');
var http = require ('http');
var path = require ('path');

var app = express ();

// all environments
app.set ('port', process.env.PORT || 3010);
app.set ('views', path.join (__dirname, 'views'));
app.set ('view engine', 'jade');
app.set ('name', 'storgie');
app.use (express.favicon (path.join (__dirname, '/public/favicon.ico')));
app.use (express.logger ('dev'));

app.use (express.json ());
app.use (express.urlencoded ());

app.use (express.methodOverride ());
app.use (app.router);
app.use (express.static (path.join (__dirname, 'public')));


// development only
if ('development' == app.get ('env')) {
    app.use (express.errorHandler ());
}

// storgie server information
app.get ('/', site.index);
app.get ('/login', site.login);
app.get ('/signup', site.signup);
app.get ('/status', site.status);

// storgie api identity ident management.
app.get('/status', api.storgie_stat);
app.post('/identity', api.identity_create);
app.get('/identity/:id', api.identity_by_id);

// storgie api converged data
app.get ('/convergence', api.convergence);
app.post ('/converged', api.converged_create);
app.get ('/converged/:id', api.converged_by_id);

// storgie scenario generator
app.post ('/scenario', api.scenario_create);

http.createServer (app).listen (app.get ('port'), function () {
    console.log (app.get ('name') + ' server listening on port ' + app.get ('port'));
});