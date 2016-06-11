/**
 * Created by qbunt on 4/27/16.
 */
describe('string manipulation', function () {
    it('should return a non alpha string', function () {
        var myString = "this is a cr@zy strin# m*n, shouldn>";

        expect(toothpick.cleanNonAlphaChars(myString)).not.toContain("@#/><-()")
    });

    it('returns a class friendly name', function () {
        var camelString = "This is an example String";
        expect(toothpick.getClassFriendlyName(camelString)).not.toContain(" ,");
    });

    it('should be able to replace all in a string', function(){
        var myString = "this is my is dream sometimes is just is whatever bro";
        expect(toothpick.replaceAll('is', '', myString)).not.toContain(('is'))
    });
});

describe('cookie access', function () {
    it("should be able to get & set a cookie", function () {
        toothpick.setCookie("testCookie", 'this is a test', 60);
        expect(toothpick.getCookie("testCookie")).toBe("this is a test")
    });

    it('should be able to clear a cookie', function () {
        toothpick.clearCookie("testCookie");
        expect(toothpick.getCookie("testCookie")).toBe("");
    });
});