/**
 * Created by adron on 3/10/14.
 * Determines if keys are available.
 * License: Apache 2.0 =>
 */

var should = require('should');
var Orchestrate_key = require('../key/orchestrate_key');
var Consociation_token = require('../key/consociation_token');

describe('the orchestrate key', function () {
    it('should exist when constructed.', function () {
        var orchestrate_key = new Orchestrate_key();
        orchestrate_key.should.exist;
    })
    it('should return the key value.', function () {
        var orchestrate_key = new Orchestrate_key();
        orchestrate_key.access_key.should.exist;
    })
})

describe('the consociation key', function () {
    it('should exist when constructed.', function () {
        var consociation_token = new Consociation_token();
        consociation_token.should.exist;
    })
    it('should return the token value.', function () {
        var consociation_token = new Consociation_token();
        consociation_token.access_token.should.exist;
    })
})