/**
 * Created by qbunt on 4/27/16.
 */

var chai = require('chai')
var should = chai.should();
var expect = require('chai').expect
var toothpick = require('../toothpick')

describe('should escape regex properly', ()=>{
    it('should not return the same string',()=>{
        var exp = '/#?([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/g';
        expect(toothpick.escapeRegExp(exp).length).not.to.equal(exp.length)
    })
})

describe('string manipulation', () =>{
    it('should return a non alpha string', () =>{
        var myString = "this is a cr@zy strin# m*n, shouldn>";

        expect(toothpick.cleanNonAlphaChars(myString)).not.to.contain("@#/><-()")
    });

    it('returns a class friendly name', () =>{
        var friendlyCamel = toothpick.getClassFriendlyName("This is an example String")
        expect(friendlyCamel).not.to.contain(" ,");

        var puncString = "This is a string!";
        expect(toothpick.getClassFriendlyName(puncString)).not.to.contain("!");
        expect(toothpick.getClassFriendlyName(puncString)).not.to.contain(" ");
    });

    it('returns an error when passed a non-string', ()=>{
        expect(()=>{
            var myThing = toothpick.getClassFriendlyName({"test":'test'})
        }).to.throw(Error);
    })

    it('should be able to replace all in a string', () =>{
        var myString = "this is my is dream sometimes is just is whatever bro";
        expect(toothpick.replaceAll('is', '', myString)).not.to.contain(('is'))
    });

    it('corrects the widows',()=>{
        var lorem = require('./helpers')
        expect(toothpick.correctWidows(lorem)).to.contain('&nbsp;')
    })
});
//
// describe('cookie access', function () {
//     it("should be able to get & set a cookie", function () {
//         toothpick.setCookie("testCookie", 'this is a test', 60);
//         expect(toothpick.getCookie("testCookie")).toBe("this is a test")
//     });
//
//     it('should be able to clear a cookie', function () {
//         toothpick.clearCookie("testCookie");
//         expect(toothpick.getCookie("testCookie")).toBe("");
//     });
// });

describe('percentage should work with a variety of values', () =>{

    it('should return a string containing a percentage', () =>{
        expect(toothpick.toPerc(getRandNum(1,500), getRandNum(501,1000))).to.contain('%')
    });
    it('should accept a string returning a string', () =>{
        expect(typeof toothpick.toPerc(getRandNum(1,500).toString(), getRandNum(501,1000))).to.be.a('string')
    });
    it('should calculate the appropriate value', () =>{
        expect(toothpick.toPerc("75", 300)).to.equal('25%')
    });
    it('should run on very large values', () =>{
        expect(toothpick.toPerc(10000000000000000, 100000000000000000)).to.equal('10%')
    })
});

describe('should accurately perform the file path join', ()=>{
    it('not return the passed path', ()=>{
        var lengthTest = toothpick.joinPath('/test/path/to/nowhere').split('/')
        expect(lengthTest).to.not.equal(4)
    })
})

describe('returns a flattened array correctly',()=>{
    it('should return the correct length array', ()=>{
        var myArray = ['one', 'two', ['four', ['five'], ['six', ['seven', 'eight']]]]
        expect(toothpick.flatten(myArray).length).to.equal(7)
    })
})


function getRandNum(min, max) {
    return Math.random() * (max - min) + min;
}
