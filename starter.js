var restify = require('restify'),
    Chance = require('chance'),
    chance = new Chance(),
    orchestrator = require('orchestrate')("01233006-eaa7-4e3a-94d5-bb27cfc809cd");

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

    var key = "deleteThisJunk"
    //var key = chance.guid();
    var inputData = {
        "First": chance.first(),
        "Last": chance.last(),
        "Number": chance.d20() * chance.d10()
    };
    var collection = 'listz';

    console.log('start');
    doThis(collection, key, inputData);
    console.log('done');

    res.send('boom');
    return next();
});

function displayIt(theDataToDisplay) {
    console.log('    ' + theDataToDisplay + '\r\n');
}


function doThis(collection, key, inputData){

    displayIt('Writing key ' + key);


    displayIt('...with value of ' + JSON.stringify(inputData));

    orchestrator.put(collection, key, inputData)
        .then(function(result){
            displayIt('success!!');
        })
        .fail(function(err){
            displayIt('Brutal, fail a lot eh!')
        });

}

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

function rm(req, res, next){
    console.log("cool.");
}

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});