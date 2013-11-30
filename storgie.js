var restify = require('restify'),
    orchestrator = require('orchestrate')("01233006-eaa7-4e3a-94d5-bb27cfc809cd"),
    collection = 'listz',
    server = restify.createServer({
        name: 'deconstructed',
        version: '1.0.0'
    });

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/stat/:device', function (req, res, next) {
    res.send(req.params);
    return next();
});

server.put('/:ident', function(req,res,next){
    console.log(req.params);
    return next();
});

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});
