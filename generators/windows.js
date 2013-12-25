var Chance = require('chance'),
    chance = new Chance(),
    windows = exports;

windows.windows_ident = function (matched) {
    var data_windows = new Object();
    data_windows.AdId = chance.guid();
    data_windows.DevId = chance.guid();
    data_windows.IP = chance.guid();
    data_windows.WebId = chance.guid();
    data_windows.Cookie = chance.guid();
    data_windows.AppId = chance.guid();
    data_windows.HashEmail = chance.guid();
    data_windows.HashIdent = chance.guid();
    return data_windows;
}
