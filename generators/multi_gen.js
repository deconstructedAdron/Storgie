var multi_gen = exports;

multi_gen.gen = function (count, ident) {
    var data = new Array();
    for (var i = 0; i < count; i++) {
        data.push(ident.ident_generate());
    }
    return data;
}