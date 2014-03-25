/**
 * Created by Adron
 * License: Apache 2.0 => License: Apache 2.0 https://github.com/Deconstructed/Storgie/blob/master/LICENSE
 */
'use strict'

exports.login = function (req, res) {
    res.render('login', {title: "Login to the Deconstructed API."});
};

exports.signingup = function (account) {
    var email = account.email;
    var password = account.password;

    return true;
}