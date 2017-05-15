
(function(exports) {
    var isNode = (typeof process !== 'undefined') && (process.release.name.search(/node|io.js/) !== -1);

    /**
     * this returns escaped regex if you really have to
     * @method escapeRegExp
     * @param str - input string
     * @returns {string}
     */
    exports.escapeRegExp = function(str) {
        return String(str).replace(/[\-\[\]\/\{\}\(\)\*\+\.\\\^\$\|]/g, "\\$&");
    }

    /**
     * Drops all non-alphanumeric chars out of a string
     * @param str - input string
     * @returns {string}
     */
    exports.cleanNonAlphaChars = function (str) {
        return str.replace(/\W/g, '');
    }

    /**
     * Generates a CSS friendly classname out of a regular string
     * @param str - input string
     * @returns {string}
     */
    exports.getClassFriendlyName = function(str) {
        if (typeof str === 'string'){
            return str.replace(/[^\w\s]/gi, '').replace(/[^\w]/gi, '-').toLowerCase();
        } else {
            if (console) {
                var err = new Error('Input of type string is required');
                throw err;
            } else {
                return "";
            }
        }
    };

    /**
     * Disables the right click button. Please don't be a terrible person and use this in a sane way.
     * @param bool - whether or not you'd like to disable or not
     */
    if(!isNode){
        exports.disableRightClick = function(bool) {
            var bool = bool || false;

            if( bool === true ) {
                document.oncontextmenu = document.body.oncontextmenu = function(){
                    return
                    false;
                }
            } else {
                document.oncontextmenu = document.body.oncontextmenu = null;
            }

        };
    }

    /**
     *  corrects widows by dropping in a &nbsp; entity whenever it's needed.
     * @param text - string of paragraph text
     * @returns {string}
     */
    exports.correctWidows = function(text) {
        var noWidows = String(text).split(" ");
        if (noWidows.length > 1) {
            noWidows[noWidows.length-2] += "&nbsp;" + noWidows[noWidows.length-1];
            noWidows.pop();
            noWidows = noWidows.join(" ");
        }
        return noWidows;
    };

    /**
     * ...sets a cookie.
     * @param cookieName - cookie's name
     * @param cookieVal - cookie's value
     * @param expiration - cookie's expiration
     */
    if(!isNode){
        exports.setCookie = function(cookieName, cookieVal, expiration) {
            var d = new Date();
            d.setTime(d.getTime() + (expiration*24*60*60*1000));
            var expires = "expires="+d.toUTCString();
            document.cookie = cookieName + "=" + cookieVal + "; " + expires;
        };
    }
    /**
     * gets that cookie of name 'cookieName' or cookies delimited with ';'
     * @param cookieName
     * @returns {*} - the cookie
     */
    if(!isNode) {
        exports.getCookie = function(cookieName) {
            var name = cookieName + "=";
            var cookieArray = document.cookie.split(';');
            for (var i = 0; i < cookieArray.length; i++) {
                var c = cookieArray[i];
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
            }
            return "";
        };
    }

    /**
     * Clears a cookie by setting the cookie's expiration to epoch
     * @param cookieName - the full name of the cookie you're clearing
     */
    if(!isNode)
        exports.clearCookie = function(cookieName) {
            document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        };

    /**
     * Returns the 'top' and 'left' css value for any element passed in as 'x' and 'y'. Useful for animations that need to happen arbitrarily on the page.
     * @param el - the element you'd like to get the absolute position of
     * @returns {{x: number, y: number}}
     */
    if(!isNode)
        exports.getAbsolutePosition = function(el) {
            var sOff = getScrollPositionOffset(), left = 0, top = 0, props;

            if (el.getBoundingClientRect) {
                props = el.getBoundingClientRect();
                left = props.left + sOff.x;
                top = props.top + sOff.y;
            } else {
                // for older browsers...
                do {
                    left += el.offsetLeft;
                    top += el.offsetTop;
                } while ((el = el.offsetParent));
            }
            return {x: Math.round(left), y: Math.round(top)};
        };


    /**
     * Internal method for getTotalPosition NOTE: not accessible from outside the library itself
     * @returns {{x: *, y: *}} - the X and Y position of the cookie
     */
    if(!isNode) {
        exports.getScrollPositionOffset = function(){
            var doc = document;
            var w = window;
            var x, y, docEl;

            if (typeof w.pageYOffset === 'number') {
                x = w.pageXOffset;
                y = w.pageYOffset;
            } else {
                docEl = (doc.compatMode && doc.compatMode === 'CSS1Compat') ?
                    doc.documentElement : doc.body;
                x = docEl.scrollLeft;
                y = docEl.scrollTop;
            }
            return {x: x, y: y};
        };
    }
    /**
     * joins the current path with the directory name
     * @param path
     */
    exports.joinPath = function(path){
        return require('path').join(__dirname, path);
    }

    /**
     * flattens a deeply nested array
     * @param arr
     */
    exports.flatten = arr => Array.isArray(arr) ? [].concat(...arr.map(exports.flatten)) : arr;

    /**
     * returns a percentage string based on the portion & whole input
     * @param portion
     * @param whole
     */
    exports.toPerc = function(portion, whole){
        return Math.round(portion * 100 / whole) + "%"
    }

    /**
     * accessor for the scroll x and scroll y position, patched for most browsers
     * @returns {Array}
     */
    exports.getScrollPosition = function(){
        var x = 0, y = 0;

        // these are all for convenience
        var deTop = document.documentElement.scrollTop;
        var deLeft = document.documentElement.scrollLeft;
        var bodyLeft = document.body.scrollLeft;
        var bodyTop = document.body.scrollTop;

        if( typeof( window.pageYOffset ) == 'number' ) {
            // Netscape
            x = window.pageXOffset;
            y = window.pageYOffset;
        } else if( document.body && ( bodyLeft || bodyTop ) ) {
            // DOM
            x = bodyLeft;
            y = bodyTop;
        } else if( document.documentElement && ( deLeft || deTop ) ) {
            // IE6 standards compliant mode
            x = deLeft;
            y = deTop;
        }
        return [x, y];
    };

    /**
     * simple find and replace wrapper for strings
     * @param find - string value you'd like to find
     * @param replace - string value you'd like to replace
     * @param string - the string you'd like to search over
     * @returns {string} - the output string
     */
    exports.replaceAll = function(find, replace, string){
        return string.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
    }

})(typeof exports === 'undefined'? this['toothpick']={}: exports);