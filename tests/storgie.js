var assert = require('assert');
var restify = require('restify');

var client = restify.createJsonClient({
    url: 'http://localhost:8080'
});

client.put('/Android', function(err, req, res, obj){
    assert.ifError(err);
    console.log('Server returned: %j', obj);
});

//client.get('/echo/Adron', function (err, req, res, obj) {
//    assert.ifError(err);
//    console.log('Server returned: %j', obj);
//});

//
//client.get('/echo/Adron', function (err, req, res, obj) {
//    assert.ifError(err);
//    console.log('Server returned: %j', obj);
//});
//
//client.put('/echo/AdronYo', function(err, req, res, obj){
//    assert.ifError(err);
//    console.log('Server returned: %j', obj);
//});
//
//client.get('/hello/Adron', function (err, req, res, obj) {
//    assert.ifError(err);
//    console.log('Server returned: %j', obj);
//});
//
//client.put('/echo/AdronYo', function(err, req, res, obj){
//    assert.ifError(err);
//    console.log('Server returned: %j', obj);
//});