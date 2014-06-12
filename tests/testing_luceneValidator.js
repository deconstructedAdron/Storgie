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

    it('can check asterisk', function(){
        var query = "foo bar is ok";
        (luceneValidator.checkAsterisk(query) === undefined).should.be.true;

        query = "foo bar12* is ok*";
        (luceneValidator.checkAsterisk(query) === undefined).should.be.true;

        query = "foo bar12*sdsd";
        (luceneValidator.checkAsterisk(query) === undefined).should.be.true;

        query = "foo bar12*sd**sd";
        (luceneValidator.checkAsterisk(query) === undefined).should.be.true;

        query = "*bar12";
        (luceneValidator.checkAsterisk(query) === undefined).should.be.false;

        query = "*ba12r*";
        (luceneValidator.checkAsterisk(query) === undefined).should.be.false;

        query = "bar* *bar";
        (luceneValidator.checkAsterisk(query) === undefined).should.be.false;

        query = "*";
        (luceneValidator.checkAsterisk(query) === undefined).should.be.false;

        query = "*bar";
        (luceneValidator.checkAsterisk(query) === undefined).should.be.false;

        // test with a space in front
        query = " *bar";
        (luceneValidator.checkAsterisk(query) === undefined).should.be.false;

        // test the escaped case
        query = "bar* \\*bar";
        (luceneValidator.checkAsterisk(query) === undefined).should.be.true;

        // try including other special characters
        query = "foo:bar*ba?r";
        (luceneValidator.checkAsterisk(query) === undefined).should.be.true;

        query = "foo:(ba*ba?r zoo \"zaa zoo\")";
        (luceneValidator.checkAsterisk(query) === undefined).should.be.true;
    });

    it('can check ampersands', function(){
        var query = "foo bar is ok";
        (luceneValidator.checkAmpersands(query) === undefined).should.be.true;

        query = "foo & bar";
        (luceneValidator.checkAmpersands(query) === undefined).should.be.true;

        query = "foo & bar& metoo &";
        (luceneValidator.checkAmpersands(query) === undefined).should.be.true;

        query = "foo && bar12isok";
        (luceneValidator.checkAmpersands(query) === undefined).should.be.true;

        query = "foo && ! bar";
        (luceneValidator.checkAmpersands(query) === undefined).should.be.true;

        query = "bar12 &&";
        (luceneValidator.checkAmpersands(query) === undefined).should.be.false;

        query = "bar12 && bar12 &&";
        (luceneValidator.checkAmpersands(query) === undefined).should.be.false;

        query = "bar12 && ";
        (luceneValidator.checkAmpersands(query) === undefined).should.be.false;
    });

    it('can check caret', function(){
        var query = "foo bar is ok";
        (luceneValidator.checkCaret(query) === undefined).should.be.true;

        query = "foo bar12isok^1.0";
        (luceneValidator.checkCaret(query) === undefined).should.be.true;

        query = "\"jakarta apache\"^10";
        (luceneValidator.checkCaret(query) === undefined).should.be.true;

        query = "bar12^";
        (luceneValidator.checkCaret(query) === undefined).should.be.false;

        query = "bar12^10 bar12^";
        (luceneValidator.checkCaret(query) === undefined).should.be.false;

        query = "bar12^ ";
        (luceneValidator.checkCaret(query) === undefined).should.be.false;

        query = "bar12^ me too";
        (luceneValidator.checkCaret(query) === undefined).should.be.false;

        query = "bar12^foo";
        (luceneValidator.checkCaret(query) === undefined).should.be.false;

        query = "bar12^1.foo";
        (luceneValidator.checkCaret(query) === undefined).should.be.false;

        // test the escaped case
        query = "\\^";
        (luceneValidator.checkCaret(query) === undefined).should.be.true;

        query = "bar\\^";
        (luceneValidator.checkCaret(query) === undefined).should.be.true;

        // try including other special characters
        query = "bar*ba?r^1.0";
        (luceneValidator.checkCaret(query) === undefined).should.be.true;
    });

    it('can check tilde', function(){
        var query = "foo bar is ok";
        (luceneValidator.checkTilde(query) === undefined).should.be.true;

        query = "foo bar12isok~10";
        (luceneValidator.checkTilde(query) === undefined).should.be.true;

        query = "\"jakarta apache\"~10";
        (luceneValidator.checkTilde(query) === undefined).should.be.true;

        query = "bar12~";
        (luceneValidator.checkTilde(query) === undefined).should.be.true;

        query = "bar12~10 bar12~";
        (luceneValidator.checkTilde(query) === undefined).should.be.true;

        query = "bar12~ ";
        (luceneValidator.checkTilde(query) === undefined).should.be.true;

        query = "bar12~foo";
        (luceneValidator.checkTilde(query) === undefined).should.be.false;

        query = "bar12~1f";
        (luceneValidator.checkTilde(query) === undefined).should.be.false;

        // test the escaped case
        query = "\\~";
        (luceneValidator.checkTilde(query) === undefined).should.be.true;

        query = "bar\\~";
        (luceneValidator.checkTilde(query) === undefined).should.be.true;

        // try including other special characters
        query = "bar*ba?r~10";
        (luceneValidator.checkTilde(query) === undefined).should.be.true;
    });

    it('can check exclamation mark', function(){
        var query = "foo bar is ok";
        (luceneValidator.checkExclamationMark(query) === undefined).should.be.true;

        query = "foo ! bar";
        (luceneValidator.checkExclamationMark(query) === undefined).should.be.true;

        query = "\"foo\" ! \"bar\"";
        (luceneValidator.checkExclamationMark(query) === undefined).should.be.true;

        query = "foo!";
        (luceneValidator.checkExclamationMark(query) === undefined).should.be.true;

        query = "foo && ! bar";
        (luceneValidator.checkExclamationMark(query) === undefined).should.be.true;

        query = "foo && !bar";
        (luceneValidator.checkExclamationMark(query) === undefined).should.be.true;

        query = "! bar";
        (luceneValidator.checkExclamationMark(query) === undefined).should.be.false;

        query = "foo !";
        (luceneValidator.checkExclamationMark(query) === undefined).should.be.false;

        query = "foo ! ";
        (luceneValidator.checkExclamationMark(query) === undefined).should.be.false;

        // test escaped case
        query = "foo \\!";
        (luceneValidator.checkExclamationMark(query) === undefined).should.be.true;

        query = "foo ! bar \\!";
        (luceneValidator.checkExclamationMark(query) === undefined).should.be.true;

        query = "foo ! bar ! car";
        (luceneValidator.checkExclamationMark(query) === undefined).should.be.true;

        query = "foo ! bar !";
        (luceneValidator.checkExclamationMark(query) === undefined).should.be.false;

        query = "foo ! bar !   ";
        (luceneValidator.checkExclamationMark(query) === undefined).should.be.false;

        // try more complex queries
        query = "(foo bar) ! (car:dog*)";
        (luceneValidator.checkExclamationMark(query) === undefined).should.be.true;
    });

    it('can check question marks', function(){
        var query = "foo bar is ok";
        (luceneValidator.checkQuestionMark(query) === undefined).should.be.true;

        query = "foo bar12? is ok?";
        (luceneValidator.checkQuestionMark(query) === undefined).should.be.true;

        query = "foo bar12?sdsd";
        (luceneValidator.checkQuestionMark(query) === undefined).should.be.true;

        query = "foo bar12?sd??sd";
        (luceneValidator.checkQuestionMark(query) === undefined).should.be.true;

        query = "?bar12";
        (luceneValidator.checkQuestionMark(query) === undefined).should.be.false;

        query = "?ba12r?";
        (luceneValidator.checkQuestionMark(query) === undefined).should.be.false;

        query = "bar? ?bar";
        (luceneValidator.checkQuestionMark(query) === undefined).should.be.false;

        // test with a space in front
        query = " ?bar";
        (luceneValidator.checkQuestionMark(query) === undefined).should.be.false;

        // test the escaped case
        query = "bar? \\?bar";
        (luceneValidator.checkQuestionMark(query) === undefined).should.be.true;

        // try including other special characters
        query = "foo:bar*ba?r";
        (luceneValidator.checkQuestionMark(query) === undefined).should.be.true;

        query = "foo:(ba*ba?r zoo \"zaa zoo\")";
        (luceneValidator.checkQuestionMark(query) === undefined).should.be.true;
    });

    it('can check parentheses', function(){
        var query = "foo bar is ok";
        (luceneValidator.checkParentheses(query) === undefined).should.be.true;

        query = "(foobar12:isok)";
        (luceneValidator.checkParentheses(query) === undefined).should.be.true;

        query = "(foobar12):(sdsd* me too)";
        (luceneValidator.checkParentheses(query) === undefined).should.be.true;

        query = "(bar12";
        (luceneValidator.checkParentheses(query) === undefined).should.be.false;

        query = "ba12r)";
        (luceneValidator.checkParentheses(query) === undefined).should.be.false;

        query = "()";
        (luceneValidator.checkParentheses(query) === undefined).should.be.false;

        query = "))";
        (luceneValidator.checkParentheses(query) === undefined).should.be.false;

        query = "(foo bar) (bar";
        (luceneValidator.checkParentheses(query) === undefined).should.be.false;

        query = "(foo bar) bar) me too";
        (luceneValidator.checkParentheses(query) === undefined).should.be.false;

        // test with a space in front
        query = " (bar";
        (luceneValidator.checkParentheses(query) === undefined).should.be.false;

        // test the escaped case
        query = "foo\\)";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;

        query = "foo\\) (foo bar)";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;

        // try including other special characters
        query = "-(foo bar*ba?r)";
        (luceneValidator.checkParentheses(query) === undefined).should.be.true;

        query = "+foo:(ba*ba?r zoo -(zaa zoo))";
        (luceneValidator.checkParentheses(query) === undefined).should.be.true;

        query = "((bar12";
        (luceneValidator.checkParentheses(query) === undefined).should.be.false;

        query = "((bar12)";
        (luceneValidator.checkParentheses(query) === undefined).should.be.false;
    });

    it('can check plus minus', function(){
        var query = "foo bar is ok";
        (luceneValidator.checkPlusMinus(query) === undefined).should.be.true;

        query = "+bar -foo";
        (luceneValidator.checkPlusMinus(query) === undefined).should.be.true;

        // is this allowed?
        query = "baa+foo +foo-bar";
        (luceneValidator.checkPlusMinus(query) === undefined).should.be.true;

        query = "baa+";
        (luceneValidator.checkPlusMinus(query) === undefined).should.be.false;

        query = "++baa";
        (luceneValidator.checkPlusMinus(query) === undefined).should.be.false;

        query = "+";
        (luceneValidator.checkPlusMinus(query) === undefined).should.be.false;

        query = "-";
        (luceneValidator.checkPlusMinus(query) === undefined).should.be.false;

        // test the escaped case
        query = "foo\\+";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;

        // try including other special characters
        query = "-(foo bar*ba?r)";
        (luceneValidator.checkParentheses(query) === undefined).should.be.true;

        query = "+foo:(ba*ba?r zoo -(zaa zoo))";
        (luceneValidator.checkParentheses(query) === undefined).should.be.true;
    });

    it('can check AND & NOT', function(){
        var query = "foo bar is ok";
        (luceneValidator.checkANDORNOT(query) === undefined).should.be.true;

        query = "foo AND bar";
        (luceneValidator.checkANDORNOT(query) === undefined).should.be.true;

        query = "foo OR bar";
        (luceneValidator.checkANDORNOT(query) === undefined).should.be.true;

        query = "foo NOT bar";
        (luceneValidator.checkANDORNOT(query) === undefined).should.be.true;

        query = "foo AND NOT bar";
        (luceneValidator.checkANDORNOT(query) === undefined).should.be.true;

        query = "foo NOT bar -foobar";
        (luceneValidator.checkANDORNOT(query) === undefined).should.be.true;

        query = "foo AND bar dog AND NOT fox";
        (luceneValidator.checkANDORNOT(query) === undefined).should.be.true;

        query = "foo and";
        (luceneValidator.checkANDORNOT(query) === undefined).should.be.true;

        query = "and bar";
        (luceneValidator.checkANDORNOT(query) === undefined).should.be.true;

        query = "fooAND bar";
        (luceneValidator.checkANDORNOT(query) === undefined).should.be.true;

        query = "foo ANDbar";
        (luceneValidator.checkANDORNOT(query) === undefined).should.be.true;

        query = "AND bar";
        (luceneValidator.checkANDORNOT(query) === undefined).should.be.false;

        query = "OR bar";
        (luceneValidator.checkANDORNOT(query) === undefined).should.be.false;

        query = "NOT bar";
        (luceneValidator.checkANDORNOT(query) === undefined).should.be.false;

        query = "foo AND";
        (luceneValidator.checkANDORNOT(query) === undefined).should.be.false;

        query = "foo AND ";
        // note the space
        (luceneValidator.checkANDORNOT(query) === undefined).should.be.false;

        query = "AND AND";
        (luceneValidator.checkANDORNOT(query) === undefined).should.be.false;

        query = "AND";
        (luceneValidator.checkANDORNOT(query) === undefined).should.be.false;
    });

    it('can check quotes', function(){
        var query = "foo bar is ok";
        (luceneValidator.checkQuotes(query) === undefined).should.be.true;

        query = "\"foobar12:isok\"";
        (luceneValidator.checkQuotes(query) === undefined).should.be.true;

        query = "\"(foobar12)\":(sdsd* me too)";
        (luceneValidator.checkQuotes(query) === undefined).should.be.true;

        query = "\"bar12";
        (luceneValidator.checkQuotes(query) === undefined).should.be.false;

        query = "\"\"";
        (luceneValidator.checkQuotes(query) === undefined).should.be.false;

        query = "ba12r\"";
        (luceneValidator.checkQuotes(query) === undefined).should.be.false;

        query = "\"foo bar\" \"bar";
        (luceneValidator.checkQuotes(query) === undefined).should.be.false;

        query = "\"foo bar\" bar\" me too";
        (luceneValidator.checkQuotes(query) === undefined).should.be.false;

        // test with a space in front
        query = " \"bar";
        (luceneValidator.checkQuotes(query) === undefined).should.be.false;

        // test the escaped case
        query = "foo\\\"";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;

        query = "foo\\\" \"foo bar\"";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;

        // try including other special characters
        query = "\"foo bar*ba?r\"";
        (luceneValidator.checkQuotes(query) === undefined).should.be.true;

        query = "foo:(ba*ba?r zoo \"zaa zoo\")";
        (luceneValidator.checkQuotes(query) === undefined).should.be.true;

        query = "\\\"\\\"bar12\\\"";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;

        query = "\\\"\\\"bar12\\\"\\\"";
        (luceneValidator.doCheckLuceneQueryValue(query) === undefined).should.be.true;
    });

    it('can validate colon', function(){
        var query = "foo bar is ok";
        (luceneValidator.checkColon(query) === undefined).should.be.true;

        query = "foobar12:isok";
        (luceneValidator.checkColon(query) === undefined).should.be.true;

        query = "(foobar12):(sdsd* me too)";
        (luceneValidator.checkColon(query) === undefined).should.be.true;

        query = "bar12:";
        (luceneValidator.checkColon(query) === undefined).should.be.false;

        query = ":ba12r";
        (luceneValidator.checkColon(query) === undefined).should.be.false;

        query = "foo:bar :bar";
        (luceneValidator.checkColon(query) === undefined).should.be.false;

        query = "foo:bar bar: me too";
        (luceneValidator.checkColon(query) === undefined).should.be.false;

        // test with a space in front
        query = " :bar";
        (luceneValidator.checkColon(query) === undefined).should.be.false;

        // test the escaped case
        query = "foo\\:";
        (luceneValidator.checkColon(query) === undefined).should.be.true;

        query = "foo\\: foo:bar";
        (luceneValidator.checkColon(query) === undefined).should.be.true;

        // try including other special characters
        query = "foo:bar*ba?r";
        (luceneValidator.checkColon(query) === undefined).should.be.true;

        query = "foo:(ba*ba?r zoo \"zaa zoo\")";
        (luceneValidator.checkColon(query) === undefined).should.be.true;
    });
});