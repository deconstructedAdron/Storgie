exports.index = function (req, res) {
    res.render('index', { title: 'Storgie' });
};

exports.login = function(req, res){
    res.render('login', {title: "Login to Storgie."});
}

exports.signup = function(req, res){
    res.render('signup', {title: "Sign Up For Storgie."});
}

exports.storgie_stat = function (req, res) {
    res.send('Storgie API is running!');
};

exports.ident_create = function (req, res) {
    var resultMessage = 'saved';

    console.log(req.body);



//            orchestrator.put(collection, key, inputData)
//                .then(function(result){
//                    console.log('success!!');
//                })
//                .fail(function(err){
//                    console.log('An error ' + err);
//                });

    return res.send('data saved.');
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