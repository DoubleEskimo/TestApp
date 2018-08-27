var expect = require("chai").expect;
var requestHandlers = require("../requestHandlers");
var database = require("../database");

describe("updateValueByKey(key, val)", function () {
    it("should add 'val' to value of the 'key' in database", function () {
        // 1. ARRANGE
        var key = 'count';
        var orgVal = "4";
        var val = "5";
        var expectedResult = parseInt(orgVal) + parseInt(val);
        database.client.set(key, orgVal);
        // 2. ACT
        database.updateValueByKey(key, val, function() {
            // 3. ASSERT
            database.client.get(key, function (error, result) {
                if (error) {
                    console.log(error);
                    throw error;
                }
                expect(result).to.be.equal(expectedResult);
            });
        });
    });

    it("should nod add 'val' to value of the 'key' in database", function () {
        // 1. ARRANGE
        var key = 'count';
        var orgVal = "4";
        var val = "five";
        var expectedResult = orgVal;
        database.client.set(key, orgVal);
        // 2. ACT
        database.updateValueByKey(key, val, function() {
            // 3. ASSERT
            database.client.get(key, function (error, result) {
                if (error) {
                    console.log(error);
                    throw error;
                }
                expect(result).to.be.equal(expectedResult);
            });
        });
    });
});
