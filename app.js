/**
 * Created by Adron
 * License: Apache 2.0 => License: Apache 2.0 https://github.com/Deconstructed/Storgie/blob/master/LICENSE
 */

var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config');
var routes = require('./routing');

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

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

routes.load_routes(app);

http.createServer(app).listen(app.get('port'), function () {
    console.log(app.get('name') + ' server listening on port ' + app.get('port'));
});
