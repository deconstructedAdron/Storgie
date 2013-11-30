var restify = require('restify'),
    storage = require('orchestrate');

var server = restify.createServer({
    name: 'storgie'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/echo/:name', function (req, res, next) {
    res.send(req.params);
    return next();
});

server.put('/echo/:name', function(req,res,next){
    res.send(req.params);
    return next();
});

function send(req, res, next) {
    res.send('hello ' + req.params.name);
    return next();
}

server.post('/hello', function create(req, res, next) {
    res.send(201, Math.random().toString(36).substr(3, 8));
    return next();
});

server.put('/hello', send);
server.get('/hello/:name', send);
server.head('/hello/:name', send);
server.del('hello/:name', function rm(req, res, next) {
    res.send(204);
    return next();
});

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});