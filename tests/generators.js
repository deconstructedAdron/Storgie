var assert = require("assert")

describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(-1, [1, 2, 3].indexOf(5));
            assert.equal(-1, [1, 2, 3].indexOf(0));
        })
    })
})

var android_generator = require('../generators/android');
var ios_generator = require('../generators/ios');
var windows_generator = require('../generators/windows');

describe('generator', function () {
    describe('plural', function () {
        it('should return multiple generated android idents', function () {
            assert.equal(android_generator.idents_generate(10).length, 10);
        })
    })
})


describe('generator', function () {
    describe('plural', function () {
        it('should return multiple generated iOS idents', function () {
            assert.equal(ios_generator.idents_generate(8).length, 8);
        })
    })
})