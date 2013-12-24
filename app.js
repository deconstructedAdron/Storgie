var express = require('express');
var site = require('./routes/site');
var api = require('./routes/api');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('name', 'storgie');
app.use(express.favicon(path.join(__dirname, '/public/favicon.ico')));
app.use(express.logger('dev'));

app.use(express.json());
app.use(express.urlencoded());

app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

// storgie server information
app.get('/', site.index);
app.get('/login', site.login);
app.get('/signup', site.signup);
app.get('/status', site.status);

// storgie status api information.
app.get('/api', api.storgie_stat);

// storgie api services.
app.post('/ident', api.ident_create);
app.get('/ident/:id', api.ident_by_id);
app.get('/convergence', api.convergence);

app.post('/scenario', api.scenario_create);

http.createServer(app).listen(app.get('port'), function () {
    console.log(app.get('name') + ' server listening on port ' + app.get('port'));
});