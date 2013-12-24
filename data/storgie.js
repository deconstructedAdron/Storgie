var orchestrator = require('orchestrate')("1fce6199-5bfa-4750-80fb-0404bc457803"),
    storgie = exports;

storgie.put = function (req, res, collection, key, value) {
    orchestrator.put(collection, key, value)
        .then(function (res) {
            var result = req.body.key + ' written.';
            console.log(result);
            res.send(result);
        })
        .fail(function (err) {
            console.log('An error ' + err);
            res.send(err);
        });
}

storgie.get = function(req, res, collection, key) {
    orchestrator.get(collection, key)
        .then(function (res) {
            var result = req.body.key + ' retrieved.'
            console.log(result);
            res.send(result);
        })
        .fail(function (err) {
            console.log('An error ' + err);
            res.send(err);
        })
}