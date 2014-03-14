/**
 * Created by Adron
 * License: Apache 2.0 => License: Apache 2.0 https://github.com/Deconstructed/Storgie/blob/master/LICENSE
 */
'use strict'

var Chance = require('chance'),
    chance = new Chance(),
    multi_gen = require('./multi_gen'),
    browser = exports;

browser.ident_generate = function () {
    var data = new Object();
    data.Referrer = chance.guid();
    data.WebId = chance.guid();
    data.AppId = chance.guid();
    data.Cookie = chance.guid();
    data.Cookie3rd = chance.guid();
    data.HashEmail = chance.guid();
    data.HashIdent = chance.guid();
    return data;
}

ios.idents_generate = function (count) {
    return multi_gen.gen(count, this);
}