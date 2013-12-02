// temp file cleaned up for stackoverflow.  Synching on github to transfer to laptop...  cheerio.

var gengie = require('chance'),
    assert = require('assert'),
    restify = require('restify'),
    chance = new gengie();

var storgie_gen = {

    write_sample_data: function () {
        var client = restify.createJsonClient({
            url: 'http://localhost:3000'
        });

        var thing = { test: chance.d100(), another: chance.guid()};

        client.post('/ident/', thing, function (err, req, res, obj) {
            assert.ifError(err);
            console.log('%d -> %j', res.statusCode, res.headers);
            console.log('%j', obj);
        });

    }
};

storgie_gen.write_sample_data();


assert.js
:
324
assert.ifError = function (err) {
    if (err) {
        throw err;
    }
};
^
InternalServerError: {
    "error"
:
    {
        "message"
    :
        "Converting circular structure to JSON", "stack"
    :
        "TypeError: Converting circular structure to JSON\n    at Object.stringify (native)\n    at ServerResponse.res.json (/Users/adronhall/Coderz/Storgie/node_modules/express/lib/response.js:189:19)\n    at ServerResponse.res.send (/Users/adronhall/Coderz/Storgie/node_modules/express/lib/response.js:121:21)\n    at exports.ident_create (/Users/adronhall/Coderz/Storgie/routes/index.js:14:16)\n    at callbacks (/Users/adronhall/Coderz/Storgie/node_modules/express/lib/router/index.js:164:37)\n    at param (/Users/adronhall/Coderz/Storgie/node_modules/express/lib/router/index.js:138:11)\n    at pass (/Users/adronhall/Coderz/Storgie/node_modules/express/lib/router/index.js:145:5)\n    at Router._dispatch (/Users/adronhall/Coderz/Storgie/node_modules/express/lib/router/index.js:173:5)\n    at Object.router (/Users/adronhall/Coderz/Storgie/node_modules/express/lib/router/index.js:33:10)\n    at next (/Users/adronhall/Coderz/Storgie/node_modules/express/node_modules/connect/lib/proto.js:193:15)"
    }
}
at
ClientRequest.onResponse(/Users/
adronhall / Coderz / Storgie / node_modules / restify / lib / clients / http_client.js
:
132
:
38
)
at
ClientRequest.g(events.js
:
175
:
14
)
at
ClientRequest.EventEmitter.emit(events.js
:
95
:
17
)
at
HTTPParser.parserOnIncomingClient(http.js
:
1658
:
21
)
at
HTTPParser.parserOnHeadersComplete [as
onHeadersComplete
]
(http.js
:
119
:
23
)
at
Socket.socketOnData(http.js
:
1553
:
20
)
at
TCP.onread(net.js
:
524
:
27
)