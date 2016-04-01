var qbuntutils = (function () {
    /**
     * If you absolutely have to, this properly escapes regex
     * @param string
     * @returns {XML|void}
     */
    escapeRegExp = function(string){
        return string.replace(/[\-\[\]\/\{\}\(\)\*\+\.\\\^\$\|]/g, "\\$&");
    };

    /**
     * Drops all non-alpha chars out of a string
     * @param string
     * @returns {string}
     */
    cleanNonAlphaChars = function(string){
        return string.replace(/\W/g, '');
    };

    /**
     * Generates a CSS friendly classname out of a regular string
     * @param str
     * @returns {string}
     */
    getClassFriendlyName = function(str){
        if (typeof str === 'string'){
            return str.replace(/[^\w\s]/gi, '').replace(/[^\w]/gi, '-').toLowerCase();
        }
    };

    /**
     * Please only use this for good, this is truly not something you should do unless you have a sane reason
     * @param bool
     */
    disableRightClick = function(bool){
        if(bool){
            document.oncontextmenu = document.body.oncontextmenu = function () {return false;}
        }else{
            document.oncontextmenu = document.body.oncontextmenu = null;
        }
    };

    /**
     *  corrects widows by dropping in a '&nbsp;' entity whenever it's needed.
     * @param text
     * @returns {Array}
     */
    correctWidows = function(text){
        var noWidows = text.split(" ");
        if (noWidows.length > 1) {
            noWidows[noWidows.length-2] += "&nbsp;" + noWidows[noWidows.length-1];
            noWidows.pop();
            noWidows = noWidows.join(" ");
        }
        return noWidows;
    };

    /**
     * ...sets a cookie.
     * @param cookieName
     * @param cookieVal
     * @param expiration
     */
    setCookie  =  function(cookieName, cookieVal, expiration){
        var d = new Date();
        d.setTime(d.getTime() + (expiration*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cookieName + "=" + cookieVal + "; " + expires;
    };

    /**
     * gets that cookie of name 'cookieName' or cookies delimited with ';'
     * @param cookieName
     * @returns {*}
     */
    getCookie = function(cookieName){
        var name = cookieName + "=";
        var cookieArray = document.cookie.split(';');
        for(var i=0; i<cookieArray.length; i++) {
            var c = cookieArray[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    };

    /**
     * Clears a cookie by setting the cookie's expiration to epoch
     * @param name
     */
    clearCookie = function(name){
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };

    /**
     * Returns the 'top' and 'left' css value for any element passed in as 'x' and 'y'. Useful for anmations that need to happen arbitrarily on the page.
     * @param el
     * @returns {{x: number, y: number}}
     */
    getAbsolutePosition = function (el) {
        var sOff = getScrollPositionOffset(), left = 0, top = 0, props;

        if ( el.getBoundingClientRect ) {
            props = el.getBoundingClientRect();
            left = props.left + sOff.x;
            top = props.top + sOff.y;
        } else {
            // for older browsers...
            do {
                left += el.offsetLeft;
                top += el.offsetTop;
            } while ( (el = el.offsetParent) );
        }
        return { x: Math.round(left), y: Math.round(top) };
    };

    /**
     * Internal method for getTotalPosition
     * @returns {{x: *, y: *}}
     */
    getScrollPositionOffset = function () {
        var doc = document, w = window;
        var x, y, docEl;

        if ( typeof w.pageYOffset === 'number' ) {
            x = w.pageXOffset;
            y = w.pageYOffset;
        } else {
            docEl = (doc.compatMode && doc.compatMode === 'CSS1Compat')?
                doc.documentElement: doc.body;
            x = docEl.scrollLeft;
            y = docEl.scrollTop;
        }
        return {x:x, y:y};
    };

    /**
     * accessor for the scroll x and scroll y position, patched for most browsers
     * @returns {Array}
     */
    getScrollPosition = function() {
        var x = 0, y = 0;
        if( typeof( window.pageYOffset ) == 'number' ) {
            // Netscape
            x = window.pageXOffset;
            y = window.pageYOffset;
        } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
            // DOM
            x = document.body.scrollLeft;
            y = document.body.scrollTop;
        } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
            // IE6 standards compliant mode
            x = document.documentElement.scrollLeft;
            y = document.documentElement.scrollTop;
        }
        return [x, y];
    };

    /**
     * simple find and replace wrapper for strings
     * @param find
     * @param replace
     * @param string
     * @returns {XML|string|void}
     */
    replaceAll = function(find, replace, string){
        return string.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
    };

    return {
        escapeRegExp            : escapeRegExp,
        cleanNonAlphaChars      : cleanNonAlphaChars,
        getClassFriendlyName    : getClassFriendlyName,
        disableRightClick       : disableRightClick,
        correctWidows           : correctWidows,
        setCookie               : setCookie,
        getCookie               : getCookie,
        clearCookie             : clearCookie,
        getAbsolutePosition     : getAbsolutePosition,
        getScrollPosition       : getScrollPosition,
        replaceAll              : replaceAll
    }
    
})();
