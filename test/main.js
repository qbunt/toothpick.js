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

        var puncString = "This is a string!";
        expect(toothpick.getClassFriendlyName(puncString)).not.toContain("!");
        expect(toothpick.getClassFriendlyName(puncString)).not.toContain(" ");
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

describe('percentage should work with a variety of values', ()=>{

    it('should return a string containing a percentage', ()=>{
        expect(toothpick.toPerc(getRandNum(1,500), getRandNum(501,1000))).toContain('%')
    });
    it('should accept a string returning a string', ()=>{
        expect(typeof toothpick.toPerc(getRandNum(1,500).toString(), getRandNum(501,1000))).toBe('string')
    });
    it('should calculate the appropriate value', ()=>{
        expect(toothpick.toPerc("75", 300)).toBe('25%')
    });
});


function getRandNum(min, max) {
    return Math.random() * (max - min) + min;
}
