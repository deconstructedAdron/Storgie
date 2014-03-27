/**
 * Created by Adron
 * License: Apache 2.0 => License: Apache 2.0 https://github.com/Deconstructed/Storgie/blob/master/LICENSE
 */
'use strict'

exports.index = function (req, res) {
    res.render('index', { title: 'Deconstructed API' });
};

exports.login = function (req, res) {
    res.render('login', {title: "Login to the Deconstructed API."});
};

exports.signup = function (req, res) {
    res.render('signup', {title: "Register for Deconstructed API Access."});
};

exports.signingup = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    res.render('index', { title: 'Storgie' });
}