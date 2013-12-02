var gengie = require('chance'),
    assert = require('assert'),
    restify = require('restify'),
    express = require('express'),

    chance = new gengie();

var storgie_gen = {

    write_sample_data: function () {
        var client = restify.createJsonClient({
            url: 'http://localhost:3000'
        });


//        client.get('/api/', function(err, req, res){
//            console.log(res);
//        });

        var thing = {
            a: "foo",
            b: thing
        }

        var replacement = {"b": undefined};

        console.log(JSON.stringify(thing, replacement));

        client.post('/ident/', thing, function (err, req, res, obj) {
            assert.ifError(err);
            console.log('%d -> %j', res.statusCode, res.headers);
            console.log('%j', obj);
        });


//        client.get('/ident/19891c99-3fdb-4a39-b842-df8e0f4fffb9', function(err, req, res){
//            console.log(res);
//        });

    }

//    function write_sample_data(){

//    }

//    function buildAndroidIdent(keyValue) {
//        var identDataAndroid = New
//        Object();
//
//        identDataAndroid.guid = chance.guid;
//        identDataAndroid.AdId = chance.guid;
//
//
//        buildKeyValue(identDataAndroid, keyValue);
//
//
//    }
//
//    function buildiOSIdent(keyValue) {
//        var identDataiOS = New
//        Object();
//
//    }
//
//    function buildBrowserIdent(keyValue) {
//        var identDataBrowser = New
//        Object();
//
//    }
//
//    function buildKeyValue(data, keyValue) {
//        var valueData = JSON.stringify(data);
//        keyValue.key = '19891c99-3fdb-4a39-b842-df8e0f4fffb9';
//        keyValue.value = valueData;
//        return keyValue;
//    }

//var identifier = JSON.stringify(identifier);
//
//var keyValue = new Object();
//keyValue.key = chance.guid();
//keyValue.value = identifier;
};

storgie_gen.write_sample_data();