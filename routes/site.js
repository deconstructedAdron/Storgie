/**
 * Created by Adron
 * License: Apache 2.0 => License: Apache 2.0 https://github.com/Deconstructed/Storgie/blob/master/LICENSE
 */
'use strict'

exports.index = function (req, res) {
    res.render('index', { title: 'Storgie' });
};

exports.login = function (req, res) {
    res.render('login', {title: "Login to Storgie."});
};

exports.signup = function (req, res) {
    res.render('signup', {title: "Register for API Access."});
};

exports.status = function (req, res) {
    res.render('status', {title: "Storgie Status & Tests"});
};

exports.signingup = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    res.render('index', { title: 'Storgie' });
}