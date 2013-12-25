var Chance = require('chance'),
    chance = new Chance(),
    browser = exports;

browser.browser_ident = function () {
    var data_browser = new Object();
    data_browser.Referrer = chance.guid();
    data_browser.WebId = chance.guid();
    data_browser.AppId = chance.guid();
    data_browser.Cookie = chance.guid();
    data_browser.Cookie3rd = chance.guid();
    data_browser.HashEmail = chance.guid();
    data_browser.HashIdent = chance.guid();
    return data_browser;
}