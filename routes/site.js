exports.index = function (req, res) {
    res.render('index', { title: 'Storgie' });
};

exports.login = function (req, res) {
    res.render('login', {title: "Login to Storgie."});
};

exports.signup = function (req, res) {
    res.render('signup', {title: "Sign Up For Storgie."});
};

exports.status = function (req, res) {
    res.render('status', {title: "Storgie Status & Tests"});
};