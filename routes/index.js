exports.index = function (req, res) {
    res.render('index', { title: 'storgie' });
};

exports.storgie_stat = function (req, res) {
    res.send('Storgie API is running!');
};

exports.ident_create = function (req, res) {

    console.log("POST: ");
    console.log(req.body);

//            orchestrator.put(collection, key, inputData)
//                .then(function(result){
//                    console.log('success!!');
//                })
//                .fail(function(err){
//                    console.log('An error ' + err);
//                });

    return res.send('the body if I can find it.');
};

exports.ident_by_id = function (req, res) {
    console.log("Blurgh");
    return res.send(res);
};

exports.convergence = function (req, res) {
    console.log('convergence status');

    //Convergence Status Goes Here.

    return res.send(res);
};