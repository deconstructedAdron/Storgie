var assert = require ("assert")
var fs = require('fs');

describe ('Array', function () {
    describe ('#indexOf()', function () {
        it ('should return -1 when the value is not present', function () {
            assert.equal (-1, [1, 2, 3].indexOf (5));
            assert.equal (-1, [1, 2, 3].indexOf (0));
        })
    })
})

var android_generator = require ('../generators/android');
var ios_generator = require ('../generators/ios');

describe ('generator', function () {
    describe ('plural', function () {
        it ('should return multiple generated android idents', function () {
            assert.equal (android_generator.idents_generate (10).length, 10);
        })
    })
})

describe ('generator', function () {
    describe ('plural', function () {
        it ('should return multiple generated iOS idents', function () {
            assert.equal (ios_generator.idents_generate (8).length, 8);
        })
    })
})

function GetDeconstructedConfig(fileName) {
    fs.exists(fileName, function (exists) {
        if (exists) {
            fs.stat(fileName, function (error, stats) {
                fs.open(fileName, "r", function (error, fd) {
                    var buffer = new Buffer(stats.size);
                    fs.read(fd, buffer, 0, buffer.length, null, function (error, bytesRead, buffer) {
                        var data = buffer.toString("utf8", 0, buffer.length);
                        console.log(data);
                        var json = JSON.parse(data);
                        console.log(json.key);
                        fs.close(fd);
                        return json.key;
                    });
                });
            });
        }
    });
}

describe('The configuration file', function () {
    it('should have a key value set with the database API key.', function () {
        var file = './config.json';
        var result = GetDeconstructedConfig(file);

        assert.equal('win!', result);
    })
})