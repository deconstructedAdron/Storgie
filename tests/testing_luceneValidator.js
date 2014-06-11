/**
 * Created by adronhall on 6/10/14.
 * Description: Testing lucene validation calls.
 */

var should = require("should");
var luceneValidator = require('../Lucene/luceneValidator');

describe('Lucene Validator', function () {

    it('should have the wildcard case sensitive default to true', function () {
        luceneValidator.WildcardCaseInsensitive.should.be.true;
    })

    it('should have the wildcard case sesnsitive set to passed value', function () {
        luceneValidator.setWildcardCaseInsensitive(false);
        luceneValidator.WildcardCaseInsensitive.should.be.false;
    })

    it('should remove multiple escapes', function () {
        var query = "\\* foo \\haha";
        luceneValidator.removeEscapes(query).should.eql(" foo aha");
    });

    it('should remove forward escapes', function () {
        var query = "\\\\foo";
        luceneValidator.removeEscapes(query).should.eql("foo");
    });

    it('should remove reverse escapes', function () {
        var query = "foo\\\"";
        luceneValidator.removeEscapes(query).should.eql("foo");
    });

    it('should check for allowed characters that are funky', function () {
        var query = "a-zA-Z0-9_+-:.()\"*?&|!{}[]^~\\@#/$%'= ";
        (luceneValidator.checkAllowedCharacters(query) === undefined).should.be.true;
    });

    it('should check for allowed characters that are groovy', function () {
        var query = "foobar";
        (luceneValidator.checkAllowedCharacters(query) === undefined).should.be.false;
    });

    it('can parse', function () {
        var query = "a AND b";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;
        query = "(a AND b)";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;
        query = "+a +b";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;
        query = "c OR (a AND b)";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;
        query = "c (+a +b)";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;
        query = "a AND NOT b";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;
        query = "+a -b";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;
        query = "a AND -b";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;
        query = "a && b";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;
        query = "a OR b";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;
        query = "a b";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;
        query = "a || b";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;
        query = "a OR -b";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;
        query = "+term -term term";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;
        query = "foo:term AND field:anotherTerm";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;
        query = "term AND \"phrase phrase\"";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;
        query = "\"hello there\"";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;
        query = "germ term^2.0";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;
        query = "(term)^2.0";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;
        query = "term^2.0";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;
        query = "(germ term)^2.0";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;
        query = "term^2.0";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;
        query = "term^2";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;
        query = "\"germ term\"^2.0";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;
        query = "\"term germ\"^2";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;
        query = "(foo OR bar) AND (baz OR boo)";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;
        query = "+(foo bar) +(baz boo)";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;
        query = "((a OR b) AND NOT c) OR d";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;
        query = "(+(a b) -c) d";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;
        query = "+(apple \"steve jobs\") -(foo bar baz)";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;
        query = "+(apple \"steve jobs\") -(foo bar baz)";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;
        query = "+title:(dog OR cat) -author:\"bob dole\"";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;
        query = "+(title:dog title:cat) -author:\"bob dole\"";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;
    });
});