/**
 * Created by Adron
 * License: Apache 2.0 => License: Apache 2.0 https://github.com/Deconstructed/Storgie/blob/master/LICENSE
 */
'use strict'

var multi_gen = exports;

multi_gen.gen = function (count, ident) {
    var data = new Array();
    for (var i = 0; i < count; i++) {
        data.push(ident.ident_generate());
    }
    return data;
}