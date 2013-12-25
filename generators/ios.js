var Chance = require('chance'),
    chance = new Chance(),
    ios = exports;

ios.ios_ident = function (matched) {
    var data_iOS = new Object();
    data_iOS.AdId = chance.guid();
    data_iOS.VendorId = chance.guid();
    data_iOS.UUID = chance.guid();
    data_iOS.DevId = chance.guid();
    data_iOS.IP = chance.guid();
    data_iOS.WebId = chance.guid();
    data_iOS.Cookie = chance.guid();
    data_iOS.AppId = chance.guid();
    data_iOS.HashEmail = chance.guid();
    data_iOS.HashIdent = chance.guid();
    return data_iOS;
}
