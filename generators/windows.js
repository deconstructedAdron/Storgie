var Chance = require('chance'),
    chance = new Chance(),
    multi_gen = require('./multi_gen'),
    windows = exports;

windows.ident_generate = function () {
    var data = new Object();
    data.AdId = chance.guid();
    data.DevId = chance.guid();
    data.IP = chance.guid();
    data.WebId = chance.guid();
    data.Cookie = chance.guid();
    data.AppId = chance.guid();
    data.HashEmail = chance.guid();
    data.HashIdent = chance.guid();
    return data;
}

windows.idents_generate = function (count) {
    return multi_gen.gen(count, this);
}