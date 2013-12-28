var orchestrator = require('orchestrate')("1fce6199-5bfa-4750-80fb-0404bc457803"),
    storgie = exports;

storgie.put = function (collection, key, value) {
    orchestrator.put(collection, key, value)
        .then(function (result) {
            return result;
        })
        .fail(function (err) {
            return err;
        });
}

storgie.get = function (collection, key) {
    var result = orchestrator.get(collection, key)
        .then(function (result) {
            return result;
        })
        .fail(function (err) {
            return err;
        });
    return result;
}
