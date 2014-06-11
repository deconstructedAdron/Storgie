/**
 * Created by adron on 4/15/14.
 * Description: Testing consociation calls.
 */

var should = require ("should");
var Consociator = require ('../consociations/consociator');

describe ('The consociator', function () {
    it ('should send data to consociate.', function () {
        Consociator.consociate ("something", "another").should.eql ("somethinganother");
    })
    it ('should send Lucene search.', function () {
        Consociator.search ('testing').should.eql ('testing');
    })
})
