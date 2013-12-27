// temp file cleaned up for stackoverflow.  Synching on github to transfer to laptop...  cheerio.

var gengie = require('chance'),
    assert = require('assert'),
    restify = require('restify'),
    chance = new gengie(),
    orchestrator = require('orchestrate')("01233006-eaa7-4e3a-94d5-bb27cfc809cd"),
    collection = 'listz';

var storgie_gen = {

    write_sample_data: function () {
        var client = restify.createJsonClient({
            url: 'http://localhost:3000'
        });

        var androidData = storgie_gen.write_android();

        client.post('/ident/', androidData, function (err, req, res, obj) {
            assert.ifError(err);

            console.log(androidData);


            console.log('%d -> %j', res.statusCode, res.headers);
            console.log('%j', obj);
        });
    },

    write_android: function () {
        var androidData = new Object();
        androidData.adid = chance.guid();
        androidData.ip = chance.ip();
        androidData.devid = chance.guid();
        androidData.webid = chance.guid();
        androidData.cookie = '11576638-585C-4D51-8AA4-25F1898078EF';
        return androidData;
    }
};

storgie_gen.write_sample_data();
