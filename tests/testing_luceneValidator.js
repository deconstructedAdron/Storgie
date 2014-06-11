/**
 * Created by adronhall on 6/10/14.
 * Description: Testing lucene validation calls.
 */

var should = require ("should");
var luceneValidator = require ('../Lucene/luceneValidator');

describe ('Lucene Validator', function () {
    it ('should remove multiple escapes', function () {
        var query = "\\* foo \\haha";
        luceneValidator.removeEscapes (query).should.eql (" foo aha");
    });

    it ('should remove forward escapes', function () {
        var query = "\\\\foo";
        luceneValidator.removeEscapes (query).should.eql ("foo");
    });

    it ('should remove reverse escapes', function () {
        var query = "foo\\\"";
        luceneValidator.removeEscapes (query).should.eql ("foo");
    });

    it ('should check for allowed characters that are funky', function () {
        var query = "a-zA-Z0-9_+-:.()\"*?&|!{}[]^~\\@#/$%'= ";
        (luceneValidator.checkAllowedCharacters (query) === undefined).should.be.true;
    });

    it ('should check for allowed characters that are groovy', function () {
        var query = "foobar";
        (luceneValidator.checkAllowedCharacters (query) === undefined).should.be.false;
    });
});