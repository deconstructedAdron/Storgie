var Chance = require('chance'),
    chance = new Chance(),
    android = exports;

android.android_ident = function () {
    var data_browser = new Object();
    data_browser.HashId = chance.guid();
    data_browser.WebId = chance.guid();
    data_browser.AppId = chance.guid();
    data_browser.Cookie = chance.guid();
    data_browser.HashedItem1 = chance.guid();
    data_browser.HashedItem2 = chance.guid();
    data_browser.HashedItem3 = chance.guid();
    data_browser.HashEmail = chance.guid();
    data_browser.HashIdent = chance.guid();
    return data_browser;
}

android.android_idents = function (count) {
    var datas = new Array();

    for (var i = 0; i < count; i++) {
        datas[i].add(this.android_ident());
    }

    return datas;
}