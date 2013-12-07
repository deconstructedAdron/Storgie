var express = require('express');
var routes = require('./routes');
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
app.get('/', routes.index);
app.get('/login', routes.login);
app.get('/signup', routes.signup);
app.get('/status', routes.status);

// storgie status api information.
app.get('/api', routes.storgie_stat);

// ident operations for storgie.
app.post('/ident', routes.ident_create);
app.get('/ident/:id', routes.ident_by_id);

app.get('/convergence', routes.convergence);

http.createServer(app).listen(app.get('port'), function () {
    console.log(app.get('name') + ' server listening on port ' + app.get('port'));
});

