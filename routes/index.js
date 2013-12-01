exports.index = function (req, res) {
    res.render('index', { title: 'storgie' });
};

exports.storgie_stat = function (req, res) {
    res.send('Storgie API is running!');
};

exports.ident_create = function (req, res) {

    console.log("POST: ");
    console.log(req.body);

    return res.send(res);
};

exports.ident_by_id = function (req, res) {
    console.log("Blurgh");
    return res.send(res);
};