## Toothpick.js

Y'know when you have something between your teeth and literally the only way to get it the hell out of there is with a toothpick?

This is like that.

These are a collection of utils that I've used across several projects. There was a good reason for them at the time, like disabling the right click menu.

### Usage


Node:
```
var toothpick = require('toothpick');
```

Browser:
```
<script src="toothpick.js"></script>
<script>
    toothpick.getClassFriendlyName("This is a string!");
    // returns 'this-is-a-string'
</script>
```

## API

### escapeRegExp(str)

if you must, this returns escaped regex

**Parameters**

**str**: , input string

**Returns**: `string`


### cleanNonAlphaChars(str)

Drops all non-alpha chars out of a string

**Parameters**

**str**: , input string

**Returns**: `string`


### getClassFriendlyName(str)

Generates a CSS friendly classname out of a regular string

**Parameters**

**str**: , input string

**Returns**: `string`


### disableRightClick(bool)

Disables the right click button. Please don't be a terrible person and use this in a sane way.

**Parameters**

**bool**: , whether or not you'd like to disable or not



### correctWidows(text)

corrects widows by dropping in a &nbsp; entity whenever it's needed.

**Parameters**

**text**: , string of paragraph text

**Returns**: `string`


### setCookie(cookieName, cookieVal, expiration)

...sets a cookie.

**Parameters**

**cookieName**: , cookie's name

**cookieVal**: , cookie's value

**expiration**: , cookie's expiration



### getCookie(cookieName)

gets that cookie of name 'cookieName' or cookies delimited with ';'

**Parameters**

**cookieName**: , gets that cookie of name 'cookieName' or cookies delimited with ';'

**Returns**: `*`, - the cookie


### clearCookie(cookieName)

Clears a cookie by setting the cookie's expiration to epoch

**Parameters**

**cookieName**: , the full name of the cookie you're clearing



### getAbsolutePosition(el)

Returns the 'top' and 'left' css value for any element passed in as 'x' and 'y'. Useful for anmations that need to happen arbitrarily on the page.

**Parameters**

**el**: , the element you'd like to get the absolute position of

**Returns**: `Object`


### getScrollPositionOffset()

Internal method for getTotalPosition NOTE: not accessible from outside the library itself

**Returns**: `Object`, - the X and Y position of the cookie


### getScrollPosition()

accessor for the scroll x and scroll y position, patched for most browsers

**Returns**: `Array`


### replaceAll(find, replace, string)

simple find and replace wrapper for strings

**Parameters**

**find**: , string value you'd like to find

**replace**: , string value you'd like to replace

**string**: , the string you'd like to search over

**Returns**: `string`, - the output string
