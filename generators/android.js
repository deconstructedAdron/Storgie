var Chance = require('chance'),
    chance = new Chance(),
    android = exports;

android.ident_generate = function () {
    var data = new Object();
    data.HashId = chance.guid();
    data.WebId = chance.guid();
    data.AppId = chance.guid();
    data.Cookie = chance.guid();
    data.HashedItem1 = chance.guid();
    data.HashedItem2 = chance.guid();
    data.HashedItem3 = chance.guid();
    data.HashEmail = chance.guid();
    data.HashIdent = chance.guid();
    return data;
}
