var gengie = require('chance'),
    assert = require('assert'),
    restify = require('restify');

var storgie_gen = {

    function write_sample_data()
{
    var client = restify.createJsonClient({
        url: 'http://localhost:8080'
    });

    client.put('/echo/Android', function (err, req, res, obj) {
        assert.ifError(err);

        var keyValue = new Object();


        console.log('Server returned: %j', obj);
    });

    console.log('Data written.');
}

function buildAndroidIdent(keyValue) {
    var identDataAndroid = New
    Object();

    identDataAndroid.guid = chance.guid;
    identDataAndroid.AdId = chance.guid;


    buildKeyValue(identDataAndroid, keyValue);


}

function buildiOSIdent(keyValue) {
    var identDataiOS = New
    Object();

}

function buildBrowserIdent(keyValue) {
    var identDataBrowser = New
    Object();

}

function buildKeyValue(data, keyValue) {
    var valueData = JSON.stringify(data);
    keyValue.key = '19891c99-3fdb-4a39-b842-df8e0f4fffb9';
    keyValue.value = valueData;
    return keyValue;
}

var identifier = JSON.stringify(identifier);

var keyValue = new Object();
keyValue.key = chance.guid();
keyValue.value = identifier;
}
;

write_sample_data();