
var assert = require("assert")

describe('Array', function(){
    describe('#indexOf()', function(){
        it('should return -1 when the value is not present', function(){
            assert.equal(-1, [1,2,3].indexOf(5));
            assert.equal(-1, [1,2,3].indexOf(0));
        })
    })
})

var android_generator = require('../generators/android');

describe('generator', function(){
    describe('plural', function(){
        it('should return multiple generated android idents', function(){
            assert.equal(android_generator.android_idents(10).length, 10);
        })
    })
})