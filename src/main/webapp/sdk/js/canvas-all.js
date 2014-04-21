/**
 * Copyright (c) 2011, salesforce.com, inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided
 * that the following conditions are met:
 *
 *    Redistributions of source code must retain the above copyright notice, this list of conditions and the
 *    following disclaimer.
 *
 *    Redistributions in binary form must reproduce the above copyright notice, this list of conditions and
 *    the following disclaimer in the documentation and/or other materials provided with the distribution.
 *
 *    Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or
 *    promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
/*jslint bitwise:false */
(function (global) {

    "use strict";

    if (global.Sfdc && global.Sfdc.canvas && global.Sfdc.canvas.module) {
        return;
    }

    // Preserve any external modules created on canvas
    // (This is the case with controller.js)
    var extmodules = {};
    if (global.Sfdc && global.Sfdc.canvas) {
        for (var key in global.Sfdc.canvas) {
            if (global.Sfdc.canvas.hasOwnProperty(key)) {
                extmodules[key] = global.Sfdc.canvas[key];
            }
        }
    }

    // cached references
    //------------------

    var oproto = Object.prototype,
        aproto = Array.prototype,
        doc = global.document,
        keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

        /**
        * @class Canvas
        * @exports $ as Sfdc.canvas
        */
        // $ functions
        // The Sfdc.canvas global object is made available in the global scope.  The reveal to the global scope is done later.
        $ = {

            // type utilities
            //---------------
            
            /**
            * @description Checks whether an object contains an uninherited property.
            * @param {Object} obj The object to check
            * @param {String} prop The property name to check for
            * @returns {Boolean} <code>true</code> if the property exists for the object and isn't inherited; otherwise <code>false</code>
            */
            hasOwn: function (obj, prop) {
                return oproto.hasOwnProperty.call(obj, prop);
            },
            
            /**
            * @description Checks whether an object is currently undefined.
            * @param {Object} value The object to check
            * @returns {Boolean} <code>true</code> if the object or value is of type undefined; otherwise <code>false</code>
            */
            isUndefined: function (value) {
                var undef;
                return value === undef;
            },
            
            /**
            * @description Checks whether an object is undefined, null, or an empty string.
            * @param {Object} value The object to check
            * @returns {Boolean} <code>true</code> if the object or value is of type undefined; otherwise <code>false</code>
            */
            isNil: function (value) {
                return $.isUndefined(value) || value === null || value === "";
            },
            
            /**
            * @description Checks whether a value is a number. This function doesn't resolve strings to numbers.
            * @param {Object} value Object to check
            * @returns {Boolean} <code>true</code> if the object or value is a number; otherwise <code>false</code>
            */
            isNumber: function (value) {
                return !!(value === 0 || (value && value.toExponential && value.toFixed));
            },

            /**
            * @description Checks whether an object is a function.
            * @param {Object} value The object to check
            * @returns {Boolean} <code>true</code> if the object or value is a function; otherwise <code>false</code>
            */
            isFunction: function (value) {
                return !!(value && value.constructor && value.call && value.apply);
            },
            
            /**
            * @description Checks whether an object is an array.
            * @param {Object} value The object to check
            * @function
            * @returns {Boolean} <code>true</code> if the object or value is of type array; otherwise <code>false</code>
            */
            isArray: Array.isArray || function (value) {
                return oproto.toString.call(value) === '[object Array]';
            },
            
            /**
            * @description Checks whether an object is the argument set for a function.
            * @param {Object} value The object to check
            * @returns {Boolean} <code>true</code> if the object or value is the argument set for a function; otherwise <code>false</code>
            */
            isArguments: function (value) {
                return !!(value && $.hasOwn(value, 'callee'));
            },
            
            /**
            * @description Checks whether a value is of type object and isn't null.
            * @param {Object} value The object to check
            * @returns {Boolean} <code>true</code> if the object or value is of type object; otherwise <code>false</code>
            */
            isObject: function (value) {
                return value !== null && typeof value === 'object';
            },

            /**
             * @description Checks whether a value is of type string and isn't null.
             * @param {Object} value The string to check
             * @returns {Boolean} <code>true</code> if the string or value is of type string; otherwise <code>false</code>
             */
            isString: function(value) {
                return value !== null && typeof value == "string";
            },

            /**
             * @description Checks whether the value appears to be JSON.
             * @param {String} value The JSON string to check
             * @returns {Boolean} <code>true</code> if the string starts and stops with {} , otherwise <code>false</code>
             */
            appearsJson: function (value) {
                return (/^\{.*\}$/).test(value);
            },

            // common functions
            //-----------------
            
            /**
            * @description An empty or blank function.  
            */
            nop: function () {
                /* no-op */
            },
            
            /**
            * @description Runs the specified function.
            * @param {Function} fn The function to run
            */
            invoker: function (fn) {
                if ($.isFunction(fn)) {
                    fn();
                }
            },
            
            /**
            * @description Returns the argument.
            * @param {Object} obj The object to return, untouched.
            * @returns {Object} The argument used for this function call
            */
            identity: function (obj) {
                return obj;
            },

            // @todo consider additional tests for: null, boolean, string, nan, element, regexp... as needed
            /**
            * @description Calls a defined function for each element in an object.
            * @param {Object} obj The object to loop through.  
                The object can be an array, an array like object, or a map of properties.
            * @param {Function} it The callback function to run for each element
            * @param {Object} [ctx] The context object to be used for the callback function.
                Defaults to the original object if not provided.
            */
            each: function (obj, it, ctx) {
                if ($.isNil(obj)) {
                    return;
                }
                var nativ = aproto.forEach, i = 0, l, key;
                l = obj.length;
                ctx = ctx || obj;
                // @todo: looks like native method will not break on return false; maybe throw breaker {}
                if (nativ && nativ === obj.forEach) {
                    obj.forEach(it, ctx);
                }
                else if ($.isNumber(l)) { // obj is an array-like object
                    while (i < l) {
                        if (it.call(ctx, obj[i], i, obj) === false) {
                            return;
                        }
                        i += 1;
                    }
                }
                else {
                    for (key in obj) {
                        if ($.hasOwn(obj, key) && it.call(ctx, obj[key], key, obj) === false) {
                            return;
                        }
                    }
                }
            },
            
            /**
             * @description Convenience method to prepend a method with a fully qualified url, if the
             * method does not begin with http protocol.
             * @param {String} orig The original url to check
             * @param {String} newUrl The new url to use if it does not begin with http(s) protocol.
             * @returns {String} orig if the url begins with http, or newUrl if it does not.
             */
            startsWithHttp: function(orig, newUrl) {
                return  !$.isString(orig) ? orig : (orig.substring(0, 4) === "http") ? orig : newUrl;
            },

            
            /**
            * @description Creates a new array with the results of calling the
                function on each element in the object.
            * @param {Object} obj The object to use
            * @param {Function} it The callback function to run for each element
            * @param {Object} [ctx] The context object to be used for the callback function.
                Defaults to the original object if not provided.
            * @returns {Array} The array that is created by calling the function on each
                element in the object.
            */
            map: function (obj, it, ctx) {
                var results = [], nativ = aproto.map;
                if ($.isNil(obj)) {
                    return results;
                }
                if (nativ && obj.map === nativ) {
                    return obj.map(it, ctx);
                }
                ctx = ctx || obj;
                $.each(obj, function (value, i, list) {
                    results.push(it.call(ctx, value, i, list));
                });
                return results;
            },
            
            /** 
            * @description Creates an array containing all the elements of the given object.
            * @param {Object} obj The source object used to create the array
            * @returns {Array} An array containing all the elements in the object.
            */
            values: function (obj) {
                return $.map(obj, $.identity);
            },
            
            /**
            * @description Creates a new array containing the selected elements of the given array.
            * @param {Array} array The array to subset
            * @param {Integer} [begin=0] The index that specifies where to start the selection
            * @param {Integer} [end = array.length] The index that specifies where to end the selection
            * @returns {Array} A new array that contains the selected elements.
            */
            slice: function (array, begin, end) {
                /* FF doesn't like undefined args for slice so ensure we call with args */
                return aproto.slice.call(array, $.isUndefined(begin) ? 0 : begin, $.isUndefined(end) ? array.length : end);
            },

            /**
            * @description Creates an array from an object.
            * @param {Object} iterable The source object used to create the array.
            * @returns {Array} The new array created from the object.
            */
            toArray: function (iterable) {
                if (!iterable) {
                    return [];
                }
                if (iterable.toArray) {
                    return iterable.toArray;
                }
                if ($.isArray(iterable)) {
                    return iterable;
                }
                if ($.isArguments(iterable)) {
                    return $.slice(iterable);
                }
                return $.values(iterable);
            },
            
            /**
            * @description Calculates the number of elements in an object.
            * @param {Object} obj The object to size
            * @returns {Integer} The number of elements in the object.
            */
            size: function (obj) {
                return $.toArray(obj).length;
            },
            
            /**
            * @description Returns the location of an element in an array.
            * @param {Array} array The array to check
            * @param {Object} item The item to search for within the array
            * @returns {Integer} The index of the element within the array.  
                Returns -1 if the element isn't found.
            */            
            indexOf: function (array, item) {
                var nativ = aproto.indexOf, i, l;
                if (!array) {
                    return -1;
                }
                if (nativ && array.indexOf === nativ) {
                    return array.indexOf(item);
                }
                for (i = 0, l = array.length; i < l; i += 1) {
                    if (array[i] === item) {
                        return i;
                    }
                }
                return -1;
            },
            
            /**
             * @description Returns true if the object is null, or the object has no 
             * enumerable properties/attributes.
             * @param {Object} obj The object to check
             * @returns {Boolean} <code>true</code> if the object or value is null, or is an object with
             * no enumerable properties/attributes.
             */            
            isEmpty: function(obj){
                if (obj === null){
                    return true;
                }
                if ($.isArray(obj) || $.isString(obj)){
                	return obj.length === 0;
                }
                for (var key in obj){
                    if ($.hasOwn(obj, key)){
                        return false;
                    }
                } 
                return true;
            },
            
            /**
            * @description Removes an element from an array.
            * @param {Array} array The array to modify
            * @param {Object} item The element to remove from the array
            */
            remove: function (array, item) {
                var i = $.indexOf(array, item);
                if (i >= 0) {
                    array.splice(i, 1);
                }
            },

            /**
             * @description Serializes an object into a string that can be used as a URL query string.
             * @param {Object|Array} a The array or object to serialize
             * @param {Boolean} [encode=false] Indicates that the string should be encoded
             * @returns {String} A string representing the object as a URL query string.
             */
            param: function (a, encode) {
                var s = [];

                encode = encode || false;

                function add( key, value ) {

                    if ($.isNil(value)) {return;}
                    value = $.isFunction(value) ? value() : value;
                    if ($.isArray(value)) {
                        $.each( value, function(v, n) {
                            add( key, v );
                        });
                    }
                    else {
                        if (encode) {
                            s[ s.length ] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
                        }
                        else {
                            s[ s.length ] = key + "=" + value;
                        }
                    }
                }

                if ( $.isArray(a)) {
                    $.each( a, function(v, n) {
                        add( n, v );
                    });
                } else {
                    for ( var p in a ) {
                        if ($.hasOwn(a, p)) {
                            add( p, a[p]);
                        }
                    }
                }
                return s.join("&").replace(/%20/g, "+");
            },

            /**
             * @description Converts a query string into an object.
             * @param {String} q param1=value1&amp;param1=value2&amp;param2=value2
             * @return {Object} {param1 : ['value1', 'value2'], param2 : 'value2'}
             */
            objectify : function (q) {
                var arr, obj = {}, i, p, n, v, e;
                if ($.isNil(q)) {return obj;}
                if (q.substring(0, 1) == '?') {
                    q = q.substring(1);
                }
                arr = q.split('&');
                for (i = 0; i < arr.length; i += 1) {
                    p = arr[i].split('=');
                    n = p[0];
                    v = p[1];
                    e = obj[n];
                    if (!$.isNil(e)) {
                        if ($.isArray(e)) {
                            e[e.length] = v;
                        }
                        else {
                            obj[n] = [];
                            obj[n][0] = e;
                            obj[n][1] = v;
                        }
                    }
                    else {
                        obj[n] = v;
                    }
                }
                return obj;
            },

            /**
             * @description Strips out the URL to {scheme}://{host}:{port}.  Removes any path and query string information.
             * @param {String} url The URL to be modified
             * @returns {String} The {scheme}://{host}:{port} portion of the URL.
             */
            stripUrl : function(url) {
                return ($.isNil(url)) ? null : url.replace( /([^:]+:\/\/[^\/\?#]+).*/, '$1');
            },

            /**
             * @description Appends the query string to the end of the URL and removes any hash tag.
             * @param {String} url The URL to be appended to
             * @returns The URL with the query string appended.
             */
            query : function(url, q) {
                if ($.isNil(q)) {
                    return url;
                }
                // Strip any old hash tags
                url = url.replace(/#.*$/, '');
                url += (/^\#/.test(q)) ? q  : (/\?/.test( url ) ? "&" : "?") + q;
                return url;
            },


            // strings
            //--------
            /**
            * @description Adds the contents of two or more objects to
                a destination object.
            * @param {Object} dest The destination object to modify
            * @param {Object} mixin1-n An unlimited number of objects to add to the destination object
            * @returns {Object} The modified destination object
            */
            extend: function (dest /*, mixin1, mixin2, ... */) {
                $.each($.slice(arguments, 1), function (mixin, i) {
                    $.each(mixin, function (value, key) {
                        dest[key] = value;
                    });
                });
                return dest;
            },

            /**
             * @description Determines if a string ends with a particular suffix.
             * @param {String} str The string to check
             * @param {String} suffix The suffix to check for
             * @returns {boolean} <code>true</code>, if the string ends with suffix; otherwise, <code>false</code>.
             */
            endsWith: function (str, suffix) {
                return str.indexOf(suffix, str.length - suffix.length) !== -1;
            },

            capitalize: function(str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            },

            uncapitalize: function(str) {
                return str.charAt(0).toLowerCase() + str.slice(1);
            },

            /**
             * @description decode a base 64 string.
             * @param {String} str - base64 encoded string
             * @return decoded string
             */
            decode : function(str) {
                var output = [], chr1, chr2, chr3 = "", enc1, enc2, enc3, enc4 = "", i = 0;
                str = str.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                do {
                    enc1 = keyStr.indexOf(str.charAt(i++));
                    enc2 = keyStr.indexOf(str.charAt(i++));
                    enc3 = keyStr.indexOf(str.charAt(i++));
                    enc4 = keyStr.indexOf(str.charAt(i++));
                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;
                    output.push(String.fromCharCode(chr1));
                    if (enc3 !== 64) {
                        output.push(String.fromCharCode(chr2));
                    }
                    if (enc4 !== 64) {
                        output.push(String.fromCharCode(chr3));
                    }
                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";
                } while (i < str.length);
                return output.join('');
            },


            // Events
            //--------
            /**
             * @description Validates the event name.
             * @param {String} name Name of the event; can include the namespace (namespace.name).
             * @param {String} res Reserved namespace name to allow against default
             * @returns {int} error code, 0 if valid
             */
             validEventName : function(name, res) {
                var ns, parts = name.split(/\./),
                    regex = /^[$A-Z_][0-9A-Z_$]*$/i,
                    reserved = {
                        'sfdc':true, 'canvas':true,
                        'force':true, 'salesforce':true, 'chatter':true
                    };
                $.each($.isArray(res) ? res : [res], function (v) {
                    reserved[v] = false;
                });
                if (parts.length > 2) {
                    return 1;
                }
                if (parts.length === 2) {
                    ns = parts[0].toLowerCase();
                    if (reserved[ns]) {
                        return 2;
                    }
                }
                if (!regex.test(parts[0]) || !regex.test(parts[1])) {
                    return 3;
                }
                return 0;
            },


            /**
            * @name Sfdc.canvas.prototypeOf
            * @function
            * @description Returns the prototype of the specified object.
            * @param {Object} obj The object for which to find the prototype
            * @returns {Object} The object that is the prototype of the given object.
            */
            prototypeOf: function (obj) {
                var nativ = Object.getPrototypeOf,
                    proto = '__proto__';
                if ($.isFunction(nativ)) {
                    return nativ.call(Object, obj);
                }
                else {
                    if (typeof {}[proto] === 'object') {
                        return obj[proto];
                    }
                    else {
                        return obj.constructor.prototype;
                    }
                }
            },

            /**
            * @description Adds a module to the global.Sfdc.canvas object.
            * @param {String} ns The namespace for the new module
            * @decl {Object} The module to add.
            * @returns {Object} The global.Sfdc.canvas object with a new module added.
            */
            module: function(ns, decl) {
                var parts = ns.split('.'), parent = global.Sfdc.canvas, i, length;

                // strip redundant leading global
                if (parts[1] === 'canvas') {
                    parts = parts.slice(2);
                }

                length = parts.length;
                for (i = 0; i < length; i += 1) {
                    // create a property if it doesn't exist
                    if ($.isUndefined(parent[parts[i]])) {
                        parent[parts[i]] = {};
                    }
                    parent = parent[parts[i]];
                }

                if ($.isFunction(decl)) {
                    decl = decl();
                }
                return $.extend(parent, decl);
            },

            // dom
            //----            
            // Returns window.document element when invoked from a browser otherwise mocked document for
            // testing. (Do not add JSDoc tags for this one)
            document: function() {
                return doc;
            },
            /**
            * @description Returns the DOM element with the given ID in the current document. 
            * @param {String} id The ID of the DOM element
            * @returns {DOMElement} The DOM element with the given ID.  Returns null if the element doesn't exist.
            */
            byId: function (id) {
                return doc.getElementById(id);
            },
            /**
            * @description Returns a set of DOM elements with the given class names in the current document.
            * @param {String} class The class names to find in the DOM; multiple
                classnames can be passed, separated by whitespace
            * @returns {Array} Set of DOM elements that all have the given class name
            */
            byClass: function (clazz) {
                return doc.getElementsByClassName(clazz);
            },
            /**
            * @description Returns the value for the given attribute name on the given DOM element.
            * @param {DOMElement} el The element on which to check the attribute.
            * @param {String} name The name of the attribute for which to find a value.
            * @returns {String} The given attribute's value.
            */
            attr : function(el, name) {
                var a = el.attributes, i;
                for (i = 0; i < a.length; i += 1) {
                    if (name === a[i].name) {
                        return a[i].value;
                    }
                }
            },

            /**
             * @description Registers a callback to be called after the DOM is ready.
             * @param {Function} cb The callback function to be called
             */
            onReady : function(cb) {
                if ($.isFunction(cb)) {
                    readyHandlers.push(cb);
                }
            },

            console : (function() {

                var enabled = false;

                // Prevent errors in browsers without console.log
                if (window && !window.console) {window.console = {};}
                if (window && !window.console.log) {window.console.log = function(){};}
                if (window && !window.console.error) {window.console.error = function(){};}

                function isSessionStorage() {
                    try {
                        return 'sessionStorage' in window && window.sessionStorage !== null;
                    } catch (e) {
                        return false;
                    }
                }

                /**
                * @description Writes a message to the console. You may pass as many arguments as you'd like.
                * The first argument to log may be a string containing printf-like string substitution patterns.
                * Note: this function will be ignored for versions of IE that don't support console.log
                *
                * @public
                * @name Sfdc.canvas.console#log
                * @function
                * @param {Object} arguments Objects(s) to pass to the logger
                * @example
                * // Log a simple string to the console if the logger is enbabled.
                * Sfdc.canvas.console.log("Hello world");
                *
                * @example
                * // Log a formatted string to the console if the logger is enbabled.
                * Sfdc.canvas.console.log("Hello %s", "world");
                *
                * @example
                * // Log an object to the console if the logger is enbabled.
                * Sfdc.canvas.console.log({hello : "Hello", world : "World"});
                *
                */
                function log() {}

                /**
                * @description Writes an error message to the console. You may pass as many arguments as you'd like.
                * The first argument to log may be a string containing printf-like string substitution patterns.
                * Note: this function will be ignored for versions of IE that don't support console.error
                *
                * @public
                * @name Sfdc.canvas.console#error
                * @function
                * @param {Object} arguments Objects(s) to pass to the logger

                 * @example
                * // Log a simple string to the console if the logger is enbabled.
                * Sfdc.canvas.console.error("Something wrong");
                *
                * @example
                * // Log a formatted string to the console if the logger is enbabled.
                * Sfdc.canvas.console.error("Bad Status %i", 404);
                *
                * @example
                * // Log an object to the console if the logger is enbabled.
                * Sfdc.canvas.console.error({text : "Not Found", status : 404});
                *
                */
                function error() {}

                function activate() {
                    if (Function.prototype.bind) {
                        log = Function.prototype.bind.call(console.log, console);
                        error = Function.prototype.bind.call(console.error, console);
                    }
                    else {
                        log = function() {
                            Function.prototype.apply.call(console.log, console, arguments);
                        };
                        error = function() {
                            Function.prototype.apply.call(console.error, console, arguments);
                        };
                    }
                }

                function deactivate() {
                    log = function() {};
                    error = function() {};
                }

                /**
                * @description Enable logging. subsequent calls to log() or error() will be displayed on the javascript console.
                * This command can be typed from the javascript console.
                *
                * @example
                * // Enable logging
                * Sfdc.canvas.console.enable();
                */
                function enable() {
                    enabled = true;
                    if (isSessionStorage()) {sessionStorage.setItem("canvas_console", "true");}
                    activate();
                }

                /**
                * @description Disable logging. Subsequent calls to log() or error() will be ignored. This command can be typed
                * from the javascript console.
                *
                * @example
                * // Disable logging
                * Sfdc.canvas.console.disable();
                */
                function disable() {
                    enabled = false;
                    if (isSessionStorage()) {sessionStorage.setItem("canvas_console", "false");}
                    deactivate();
                }

                // Survive page refresh, if enabled or disable previously honor it.
                // This is only called once when the page is loaded
                enabled = (isSessionStorage() && sessionStorage.getItem("canvas_console") === "true");
                if (enabled) {activate();} else {deactivate();}

                return {
                    enable : enable,
                    disable : disable,
                    log : log,
                    error : error
                };
            }())
        },

        readyHandlers = [],

        /**
         * @description
         * @param {Function} cb The function to run when ready.
         */
        canvas = function (cb) {
            if ($.isFunction(cb)) {
                readyHandlers.push(cb);
            }
        };

        /**
         * Provide a consistent/performant DOMContentLoaded across all browsers
         * Implementation was based off of the following tutorial
         * http://javascript.info/tutorial/onload-ondomcontentloaded?fromEmail=1
         */
        (function () {

            var called = false, isFrame, fn;

            function ready() {
                if (called) {return;}
                called = true;
                ready = $.nop;
                $.each(readyHandlers, $.invoker);
                readyHandlers = [];
            }

            function tryScroll(){
                if (called) {return;}
                try {
                    document.documentElement.doScroll("left");
                    ready();
                } catch(e) {
                    setTimeout(tryScroll, 30);
                }
            }

            if ( document.addEventListener ) { // native event
                document.addEventListener( "DOMContentLoaded", ready, false );
            } else if ( document.attachEvent ) {  // IE

                try {
                    isFrame = self !== top;
                } catch(e) {}

                // IE, the document is not inside a frame
                if ( document.documentElement.doScroll && !isFrame ) {
                    tryScroll();
                }

                // IE, the document is inside a frame
                document.attachEvent("onreadystatechange", function(){
                    if ( document.readyState === "complete" ) {
                        ready();
                    }
                });
            }

            // Old browsers
            if (window.addEventListener) {
                window.addEventListener('load', ready, false);
            } else if (window.attachEvent) {
                window.attachEvent('onload', ready);
            } else {
                fn = window.onload; // very old browser, copy old onload
                window.onload = function() { // replace by new onload and call the old one
                    if (fn) {fn();}
                    ready();
                };
            }
        }());

    $.each($, function (fn, name) {
        canvas[name] = fn;
    });

    // Add those external modules back in
    $.each(extmodules, function (fn, name) {
        canvas[name] = fn;
    });


    (function () {
        var method;
        var noop = function () { };
        var methods = [
            'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
            'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
            'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
            'timeStamp', 'trace', 'warn'
        ];
        var length = methods.length;
        var console = (typeof window !== 'undefined' && window.console) ? window.console : {};

        while (length--) {
            method = methods[length];

            // Only stub undefined methods.
            if (!console[method]) {
                console[method] = noop;
            }
        }

    }());


    if (!global.Sfdc) {
        global.Sfdc = {};
    }

    global.Sfdc.canvas = canvas;


}(this));

(function ($$) {

    "use strict";

    var module =  (function() {

        function isSecure()
        {
            return window.location.protocol === 'https:';
        }

        /**
       * @description Create a cookie
       * @param {String} name Cookie name
       * @param {String} value Cookie value
       * @param {Integer} [days] Number of days for the cookie to remain active.
                If not provided, the cookie never expires
       */
       function set(name, value, days) {
           var expires = "", date;
           if (days) {
               date = new Date();
               date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
               expires = "; expires=" + date.toGMTString();
           }
           else {
               expires = "";
           }
           document.cookie = name + "=" + value + expires + "; path=/" +  ((isSecure() === true) ? "; secure" : "");
       }
       
       /**
       * @description Get the cookie with the specified name
       * @param {String} name The name of the cookie to retrieve
       * @returns The value of the cookie if the name is found, otherwise null
       */
       function get(name) {
           var nameEQ, ca, c, i;

           if ($$.isUndefined(name)) {
               return document.cookie.split(';');
           }

           nameEQ = name + "=";
           ca = document.cookie.split(';');
           for (i = 0; i < ca.length; i += 1) {
               c = ca[i];
               while (c.charAt(0) === ' ') {c = c.substring(1, c.length);}
               if (c.indexOf(nameEQ) === 0) {
                   return c.substring(nameEQ.length, c.length);
               }
           }
           return null;
       }
       
       /**
       * @description Remove the specified cookie by setting the expiry date to one day ago
       * @param {String} name The name of the cookie to remove.
       */
       function remove(name) {
           set(name, "", -1);
       }

       return {
            set : set,
            get : get,
            remove : remove
        };
    }());


    $$.module('Sfdc.canvas.cookies', module);

}(Sfdc.canvas));
/**
 *@namespace Sfdc.canvas.oauth
 *@name Sfdc.canvas.oauth
 */
(function ($$) {

    "use strict";

    var storage = (function() {

        function isLocalStorage() {
            try {
                return 'sessionStorage' in window && window.sessionStorage !== null;
            } catch (e) {
                return false;
            }
        }

        return {
            get : function get(key) {
                if (isLocalStorage()) {
                    return sessionStorage.getItem(key);
                }
                return $$.cookies.get(key);
            },
            set : function set(key, value) {
                if (isLocalStorage()) {
                    return sessionStorage.setItem(key, value);
                }
                return $$.cookies.set(key, value);
            },
            remove : function remove(key) {
                if (isLocalStorage()) {
                    return sessionStorage.removeItem(key);
                }
                return $$.cookies.remove(key);
            }
        };

    }());

    var module =   (function() {

        var accessToken,
            instUrl,
            instId,
            tOrigin,
            childWindow;

        function init() {
            // Get the access token from the sessionStorage or cookie (needed to survive refresh),
            // and then remove the cookie per security's request.
            accessToken = storage.get("access_token");
            storage.remove("access_token");
        }

        function query(params) {
            var r = [], n;
            if (!$$.isUndefined(params)) {
                for (n in params) {
                    if (params.hasOwnProperty(n)) {
                        // probably should encode these
                        r.push(n + "=" + params[n]);
                    }
                }
                return "?" + r.join('&');
            }
            return '';
        }
        /**
         *@private
         */
        function refresh() {
            // Temporarily set the oauth token in a sessionStorage or cookie and then remove it
            // after the refresh.
            storage.set("access_token", accessToken);
            self.location.reload();
        }
        /**
         * @name Sfdc.canvas.oauth#login
         * @function
         * @description Opens the OAuth popup window to retrieve an OAuth token.
         * @param {Object} ctx  The context object that contains the URL, the response type, the client ID, and the callback URL
         * @docneedsimprovement
         * @example
         * function clickHandler(e)
         * {
         *  var uri;
         *  if (! connect.oauth.loggedin())
         *  {
         *   uri = connect.oauth.loginUrl();
         *   connect.oauth.login(
         *    {uri : uri,
         *     params: {
         *      response_type : "token",
         *      client_id :  "<%=consumerKey%>",
         *      redirect_uri : encodeURIComponent("/sdk/callback.html")
         *      }});
         *  } else {
         *     connect.oauth.logout();
         *  }
         *  return false;
         * }
         */
        function login(ctx) {
            var uri;

            ctx = ctx || {};
            uri = ctx.uri || "/rest/oauth2";
            ctx.params = ctx.params || {state : ""};
            ctx.params.state = ctx.params.state || ctx.callback || window.location.pathname;  // @TODO REVIEW THIS
            ctx.params.display= ctx.params.display || 'popup';
            ctx.params.redirect_uri = $$.startsWithHttp(ctx.params.redirect_uri, 
                    encodeURIComponent(window.location.protocol + "//" + window.location.hostname + ":" + window.location.port) + ctx.params.redirect_uri);
            uri = uri + query(ctx.params);
            childWindow = window.open(uri, 'OAuth', 'status=0,toolbar=0,menubar=0,resizable=0,scrollbars=1,top=50,left=50,height=500,width=680');
        }

        /**
         * @name Sfdc.canvas.oauth#token
         * @function
         * @description Sets, gets, or removes the <code>access_token</code> from this JavaScript object. <br>
         <p>This function does one of three things: <br>
         	1) If the 't' parameter isn't passed in, the current value for the <code>access_token</code> value is returned. <br>
         	2) If the the 't' parameter is null, the <code>access_token</code> value is removed. <br>
         	3) Otherwise the <code>access_token</code>  value is set to the 't' parameter and then returned.<br><br>
         	Note: for longer-term storage of the OAuth token, store it server-side in the session.  Access tokens
             should never be stored in cookies.
         * @param {String} [t] The OAuth token to set as the <code>access_token</code> value
         * @returns {String} The resulting <code>access_token</code> value if set; otherwise null
         */
        function token(t) {
            if (arguments.length === 0) {
                if (!$$.isNil(accessToken)) {return accessToken;}
            }
            else {
                accessToken = t;
            }

            return accessToken;
        }

        /**
         * @name Sfdc.canvas.oauth#instance
         * @function
         * @description Sets, gets, or removes the <code>instance_url</code> cookie. <br>
         <p> This function does one of three things: <br>
         1) If the 'i' parameter is not passed in, the current value for the <code>instance_url</code> cookie is returned. <br>
         2) If the 'i' parameter is null, the <code>instance_url</code> cookie is removed. <br>
         3) Otherwise, the <code>instance_url</code> cookie value is set to the 'i' parameter and then returned.
         * @param {String} [i] The value to set as the <code>instance_url</code> cookie
         * @returns {String} The resulting <code>instance_url</code> cookie value if set; otherwise null
         */
        function instanceUrl(i) {
            if (arguments.length === 0) {
                if (!$$.isNil(instUrl)) {return instUrl;}
                instUrl = storage.get("instance_url");
            }
            else if (i === null) {
                storage.remove("instance_url");
                instUrl = null;
            }
            else {
                storage.set("instance_url", i);
                instUrl = i;
            }
            return instUrl;
        }

        /**
         *@private
         */
            // Example Results of tha hash....
            // Name [access_token] Value [00DU0000000Xthw!ARUAQMdYg9ScuUXB5zPLpVyfYQr9qXFO7RPbKf5HyU6kAmbeKlO3jJ93gETlJxvpUDsz3mqMRL51N1E.eYFykHpoda8dPg_z]
            // Name [instance_url] Value [https://na12.salesforce.com]
            // Name [id] Value [https://login.salesforce.com/id/00DU0000000XthwMAC/005U0000000e6PoIAI]
            // Name [issued_at] Value [1331000888967]
            // Name [signature] Value [LOSzVZIF9dpKvPU07icIDOf8glCFeyd4vNGdj1dhW50]
            // Name [state] Value [/crazyrefresh.html]
        function parseHash(hash) {
            var i, nv, nvp, n, v;

            if (! $$.isNil(hash)) {
                if (hash.indexOf('#') === 0) {
                    hash = hash.substr(1);
                }
                nvp = hash.split("&");

                for (i = 0; i < nvp.length; i += 1) {
                    nv = nvp[i].split("=");
                    n = nv[0];
                    v = decodeURIComponent(nv[1]);
                    if ("access_token" === n) {
                        token(v);
                    }
                    else if ("instance_url" === n) {
                        instanceUrl(v);
                    }
                    else if ("target_origin" === n) {
                        tOrigin = decodeURIComponent(v);
                    }
                    else if ("instance_id" === n) {
                        instId = v;
                    }
                }
            }
        }

        /**
         * @name Sfdc.canvas.oauth#checkChildWindowStatus
         * @function
         * @description Refreshes the parent window only if the child window is closed. This
         * method is no longer used. Leaving in for backwards compatability.
         */
        function checkChildWindowStatus() {
            if (!childWindow || childWindow.closed) {
                refresh();
            }
        }

        /**
         * @name Sfdc.canvas.oauth#childWindowUnloadNotification
         * @function
         * @description Parses the hash value that is passed in and sets the
         <code>access_token</code> and <code>instance_url</code> cookies if they exist.  Use this method during
         User-Agent OAuth Authentication Flow to pass the OAuth token.
         * @param {String} hash A string of key-value pairs delimited by
         the ampersand character.
         * @example
         * Sfdc.canvas.oauth.childWindowUnloadNotification(self.location.hash);
         */
        function childWindowUnloadNotification(hash) {
            // Here we get notification from child window. Here we can decide if such notification is
            // raised because user closed child window, or because user is playing with F5 key.
            // NOTE: We can not trust on "onUnload" event of child window, because if user reload or refresh
            // such window in fact he is not closing child. (However "onUnload" event is raised!)

            var retry = 0, maxretries = 10;

            // Internal check child window status with max retry logic
            function cws() {

                retry++;
                if (!childWindow || childWindow.closed) {
                    refresh();
                }
                else if (retry < maxretries) {
                    setTimeout(cws, 50);
                }
            }

            parseHash(hash);
            setTimeout(cws, 50);
        }

        /**
         * @name Sfdc.canvas.oauth#logout
         * @function
         * @description Removes the <code>access_token</code> OAuth token from this object.
         */
        function logout() {
            // Remove the oauth token and refresh the browser
            token(null);
        }

        /**
         * @name Sfdc.canvas.oauth#loggedin
         * @function
         * @description Returns the login state.
         * @returns {Boolean} <code>true</code> if the <code>access_token</code> is available in this JS object.
         * Note: <code>access tokens</code> (for example, OAuth tokens) should be stored server-side for more durability.
         * Never store OAuth tokens in cookies as this can lead to a security risk.
         */
        function loggedin() {
            return !$$.isNil(token());
        }

        /**
         * @name Sfdc.canvas.oauth#loginUrl
         * @function
         * @description Returns the URL for the OAuth authorization service.
         * @returns {String} The URL for the OAuth authorization service or default if there's
         *   no value for loginUrl in the current URL's query string
         */
        function loginUrl() {
            var i, nvs, nv, q = self.location.search;

            if (q) {
                q = q.substring(1);
                nvs = q.split("&");
                for (i = 0; i < nvs.length; i += 1)
                {
                    nv = nvs[i].split("=");
                    if ("loginUrl" === nv[0]) {
                        return decodeURIComponent(nv[1]) + "/services/oauth2/authorize";
                    }
                }
            }
            return "https://login.salesforce.com/services/oauth2/authorize";
        }

        function targetOrigin(to) {

            if (!$$.isNil(to)) {
                tOrigin = to;
                return to;
            }

            if (!$$.isNil(tOrigin)) {return tOrigin;}

            // This relies on the parent passing it in. This may not be there as the client can do a
            // redirect or link to another page
            parseHash(document.location.hash);
            return tOrigin;
        }

        function instanceId(id) {

            if (!$$.isNil(id)) {
                instId = id;
                return id;
            }

            if (!$$.isNil(instId)) {return instId;}

            // This relies on the parent passing it in. This may not be there as the client can do a
            // redirect or link to another page
            parseHash(document.location.hash);
            return instId;
        }

        function client() {
            return {oauthToken : token(), instanceId : instanceId(), targetOrigin : targetOrigin()};
        }

        return {
            init : init,
            login : login,
            logout : logout,
            loggedin : loggedin,
            loginUrl : loginUrl,
            token : token,
            instance : instanceUrl,
            client : client,
            checkChildWindowStatus : checkChildWindowStatus,
            childWindowUnloadNotification: childWindowUnloadNotification
        };
    }());

    $$.module('Sfdc.canvas.oauth', module);

    $$.oauth.init();

}(Sfdc.canvas));
(function ($$, window) {

    "use strict";

    var module =   (function() {

        var internalCallback;

        /**
        * @description Pass a message to the target url
        * @param {String} message The message to send
        * @param {String} target_url Specifies what the origin of the target must be for the event to be dispatched.
        * @param {String} [target] The window that is the message's target. Defaults to the parent of the current window.
        */
        function postMessage(message, target_url, target) {
			var sfdcJson = Sfdc.JSON || JSON;

            // If target url was not supplied (client may have lost it), we could default to '*',
            // However there are security implications here as other canvas apps could receive this
            // canvas apps oauth token.
            if ($$.isNil(target_url)) {
                throw "ERROR: target_url was not supplied on postMessage";
            }
            var otherWindow = $$.stripUrl(target_url);

            target = target || parent;  // default to parent
            if (window.postMessage) {
                // the browser supports window.postMessage, so call it with a targetOrigin
                // set appropriately, based on the target_url parameter.

                // Add the targetModule as Canvas so we are the only ones interested in these events
                if ($$.isObject(message)) {message.targetModule = "Canvas";}
                message = sfdcJson.stringify(message);
                $$.console.log("Sending Post Message ", message);
                target.postMessage(message, otherWindow);
            }
        }
        
        /**
        * @name Sfdc.canvas.xd#receive
        * @description Runs the callback function when the message event is received.
        * @param {Function} callback Function to run when the message event is received 
            if the event origin is acceptable.
        * @param {String} source_origin The origin of the desired events
        */
        function receiveMessage(callback, source_origin) {

            // browser supports window.postMessage (if not not supported for pilot - removed per securities request)
            if (window.postMessage) {
                // bind the callback to the actual event associated with window.postMessage
                if (callback) {
                    internalCallback = function(e) {

                        var data, r;
						var sfdcJson = Sfdc.JSON || JSON;

                        $$.console.log("Post Message Got callback", e);

                        if (!$$.isNil(e)) {
                            if (typeof source_origin === 'string' && e.origin !== source_origin) {
                                $$.console.log("source origin's don't match", e.origin, source_origin);
                                return false;
                            }
                            if ($$.isFunction(source_origin)) {
                                r = source_origin(e.origin, e.data);
                                if (r === false) {
                                    $$.console.log("source origin's function returning false", e.origin, e.data);
                                    return false;
                                }
                            }
                            if ($$.appearsJson(e.data))  {
                                try {
                                    data = sfdcJson.parse(e.data);
                                } catch (ignore) {
                                    // Ignore parsing errors of any non json objects sent from other frames
                                }
                                // If we could parse the data and there is a targetModule make sure it is for us
                                if (!$$.isNil(data) && ($$.isNil(data.targetModule) || data.targetModule === "Canvas")) {
                                    $$.console.log("Invoking callback");
                                    callback(data, r);
                                }
                            }
                        }
                    };
                }
                if (window.addEventListener) {
                    window.addEventListener('message', internalCallback, false);
                } else {
                    window.attachEvent('onmessage', internalCallback);
                }
            }
        }
        
        /**
        * @description Removes the message event listener
        * @public     
        */
        function removeListener() {

            // browser supports window.postMessage
            if (window.postMessage) {
                if (window.removeEventListener) {
                    window.removeEventListener('message', internalCallback, false);
                } else {
                    window.detachEvent('onmessage', internalCallback);
                }
            }
        }

        return {
            post : postMessage,
            receive : receiveMessage,
            remove : removeListener
        };
    }());

    $$.module('Sfdc.canvas.xd', module);

}(Sfdc.canvas, this));/**
 *@namespace Sfdc.canvas.client
 *@name Sfdc.canvas.client
 */
(function ($$) {

    "use strict";

    var pversion, cversion = "31.0";

    var module =   (function() /**@lends module */ {

        var purl;

        // returns the url of the Parent Window
        function getTargetOrigin(to) {
            var h;
            if (to === "*") {return to;}
            if (!$$.isNil(to)) {
                h = $$.stripUrl(to);
                purl = $$.startsWithHttp(h, purl);
                if (purl) {return purl;}
            }
            // This relies on the parent passing it in. This may not be there as the client can do a redirect.
            h = $$.document().location.hash;
            if (h) {
                h = decodeURIComponent(h.replace(/^#/, ''));
                purl = $$.startsWithHttp(h, purl);
            }
            return purl;
        }

        // The main cross domain callback handler
        function xdCallback(data) {
            if (data) {
                if (submodules[data.type]) {
                    submodules[data.type].callback(data);
                }
                // Just ignore...
            }
        }

        var submodules = (function () {

            var cbs = [], seq = 0, autog = true;

            // Functions common to submodules...

            function postit(clientscb, message) {
                var wrapped, to, c;

                // need to keep a mapping from request to callback, otherwise
                // wrong callbacks get called. Unfortunately, this is the only
                // way to handle this as postMessage acts more like topic/queue.
                // limit the sequencers to 100 avoid out of memory errors
                seq = (seq > 100) ? 0 : seq + 1;
                cbs[seq] = clientscb;
                wrapped = {seq : seq, src : "client", clientVersion : cversion, parentVersion: pversion, body : message};

                c  = message && message.config && message.config.client;
                to = getTargetOrigin($$.isNil(c) ? null : c.targetOrigin);
                if ($$.isNil(to)) {
                    throw "ERROR: targetOrigin was not supplied and was not found on the hash tag, this can result from a redirect or link to another page.";
                }
                $$.console.log("posting message ", {message : wrapped, to : to});
                $$.xd.post(wrapped, to, parent);
            }

            function validateClient(client, cb) {
                var msg;

                client = client || $$.oauth && $$.oauth.client();

                if ($$.isNil(client) || $$.isNil(client.oauthToken)) {
                    msg = {status : 401, statusText : "Unauthorized" , parentVersion : pversion, payload : "client or client.oauthToken not supplied"};
                }
                if ($$.isNil(client.instanceId) || $$.isNil(client.targetOrigin)) {
                    msg = {status : 400, statusText : "Bad Request" , parentVersion : pversion, payload : "client.instanceId or client.targetOrigin not supplied"};
                }
                if (!$$.isNil(msg)) {
                    if ($$.isFunction(cb)) {
                        cb(msg);
                        return false;
                    }
                    else {
                        throw msg;
                    }
                }
                return true;
            }

            // Submodules...

            var event = (function() {
                var subscriptions = {}, STR_EVT = "sfdc.streamingapi";

                function validName(name, res) {
                    var msg, r = $$.validEventName(name, res);
                    if (r !== 0) {
                        msg = {1 : "Event names can only contain one namespace",
                               2 : "Namespace has already been reserved",
                               3 : "Event name contains invalid characters"
                        };
                        throw msg[r];
                    }
                }

                function findSubscription(event) {
                    var s, name = event.name;

                    if (name === STR_EVT) {
                        if (!$$.isNil(subscriptions[name])) {
                            s = subscriptions[name][event.params.topic];
                        }
                    } else {
                        s = subscriptions[name];
                    }

                    if (!$$.isNil(s) && ($$.isFunction(s.onData) || $$.isFunction(s.onComplete))) {
                        return s;
                    }

                    return null;
                }

                return  {
                    callback : function (data) {
                        var event = data.payload,
                            subscription = findSubscription(event),
                            func;

                        if (!$$.isNil(subscription)) {
                            if (event.method === "onData") {
                                func = subscription.onData;
                            } else if (event.method === "onComplete") {
                                func = subscription.onComplete;
                            }

                            if (!$$.isNil(func) && $$.isFunction(func)) {
                                func(event.payload);
                            }
                        }
                    },

                    /**
                     * @description Subscribes to parent or custom events. Events
                     * with the namespaces 'canvas', 'sfdc', 'force', 'salesforce', and 'chatter' are reserved by Salesforce.
                     * Developers can choose their own namespace and event names.
                     * Event names must be in the form <code>namespace.eventname</code>.
                     * @public
                     * @name Sfdc.canvas.client#subscribe
                     * @function
                     * @param {client} client The object from the signed request
                     * @param {Object} s The subscriber object or array of objects with name and callback functions
                     * @example
                     * // Subscribe to the parent window onscroll event.
                     * Sfdc.canvas(function() {
                     *     sr = JSON.parse('<%=signedRequestJson%>');
                     *     // Capture the onScrolling event of the parent window.
                     *     Sfdc.canvas.client.subscribe(sr.client,
                     *          {name : 'canvas.scroll', onData : function (event) {
                     *              console.log("Parent's contentHeight; " + event.heights.contentHeight);
                     *              console.log("Parent's pageHeight; " + event.heights.pageHeight);
                     *              console.log("Parent's scrollTop; " + event.heights.scrollTop);
                     *              console.log("Parent's contentWidth; " + event.widths.contentWidth);
                     *              console.log("Parent's pageWidth; " + event.widths.pageWidth);
                     *              console.log("Parent's scrollLeft; " + event.widths.scrollLeft);
                     *          }}
                     *     );
                     * });
                     *
                     * @example
                     * // Subscribe to a custom event.
                     * Sfdc.canvas(function() {
                     *     sr = JSON.parse('<%=signedRequestJson%>');
                     *     Sfdc.canvas.client.subscribe(sr.client,
                     *         {name : 'mynamespace.someevent', onData : function (event) {
                     *             console.log("Got custom event ",  event);
                     *         }}
                     *     );
                     * });
                     *
                     * @example
                     * // Subscribe to multiple events
                     * Sfdc.canvas(function() {
                     *     sr = JSON.parse('<%=signedRequestJson%>');
                     *     Sfdc.canvas.client.subscribe(sr.client, [
                     *         {name : 'mynamespace.someevent1', onData : handler1},
                     *         {name : 'mynamespace.someevent2', onData : handler2},
                     *     ]);
                     * });
                     *
                     * @example
                     * //Subscribe to Streaming API events.  
                     * //The PushTopic to subscribe to must be passed in.
                     * //The 'onComplete' method may be defined,
                     * //and will fire when the subscription is complete.
                     * Sfdc.canvas(function() {
                     *     sr = JSON.parse('<%=signedRequestJson%>');
                     *     var handler1 = function(){ console.log("onData done");},
                     *     handler2 = function(){ console.log("onComplete done");};
                     *     Sfdc.canvas.client.subscribe(sr.client,
                     *         {name : 'sfdc.streamingapi', params:{topic:"/topic/InvoiceStatements"}},
                     *          onData : handler1, onComplete : handler2}
                     *     );
                     * });
                     *
                     * 
                     */
                    subscribe : function(client, s) {
                        var subs = {};

                        if ($$.isNil(s) || (!validateClient(client))) {
                            throw "precondition fail";
                        }

                        $$.each($$.isArray(s) ? s : [s], function (v) {
                            if (!$$.isNil(v.name)) {
                                validName(v.name, ["canvas", "sfdc"]);

                                if (v.name === STR_EVT) {
                                    if (!$$.isNil(v.params) && !$$.isNil(v.params.topic)) {
                                        if ($$.isNil(subscriptions[v.name])) {
                                            subscriptions[v.name] = {};
                                        }
                                        subscriptions[v.name][v.params.topic] = v;
                                    } else {
                                        throw "[" +STR_EVT +"] topic is missing";
                                    }
                                } else {
                                    subscriptions[v.name] = v;
                                }

                                subs[v.name] = {
                                    params : v.params
                                };
                            } else {
                                throw "subscription does not have a 'name'";
                            }
                        });
                        if (!client.isVF) {
                            postit(null, {type : "subscribe", config : {client : client}, subscriptions : subs});
                        }
                    },
                    /**
                     * @description Unsubscribes from parent or custom events.
                     * @public
                     * @name Sfdc.canvas.client#unsubscribe
                     * @function
                     * @param {client} client The object from the signed request
                     * @param {Object} s The events to unsubscribe from
                     * @example
                     * //Unsubscribe from the canvas.scroll method.
                     * Sfdc.canvas(function() {
                     *     sr = JSON.parse('<%=signedRequestJson%>');
                     *     Sfdc.canvas.client.unsubscribe(sr.client, "canvas.scroll");
                     *});
                     *
                     * @example
                     * //Unsubscribe from the canvas.scroll method by specifying the object name.
                     * Sfdc.canvas(function() {
                     *     sr = JSON.parse('<%=signedRequestJson%>');
                     *     Sfdc.canvas.client.unsubscribe(sr.client, {name : "canvas.scroll"});
                     *});
                     *
                     * @example
                     * //Unsubscribe from multiple events.
                     * Sfdc.canvas(function() {
                     *     sr = JSON.parse('<%=signedRequestJson%>');
                     *     Sfdc.canvas.client.unsubscribe(sr.client, ['canvas.scroll', 'foo.bar']);
                     *});
                     *
                     * @example
                     * //Unsubscribe from Streaming API events.
                     * //The PushTopic to unsubscribe from  must be passed in.
                     * Sfdc.canvas(function() {
                     *     sr = JSON.parse('<%=signedRequestJson%>');
                     *     Sfdc.canvas.client.unsubscribe(sr.client, {name : 'sfdc.streamingapi',
                     *               params:{topic:"/topic/InvoiceStatements"}});
                     *});
                     */
                    unsubscribe : function(client, s) {
                        // client can pass in the handler object or just the name
                        var subs = {};

                        if ($$.isNil(s) || !validateClient(client)) {
                            throw "PRECONDITION FAIL: need fo supply client and event name";
                        }

                        if ($$.isString(s)) {
                            subs[s] = {};
                            delete subscriptions[s];
                        }
                        else {
                            $$.each($$.isArray(s) ? s : [s], function (v) {
                                var name = v.name ? v.name : v;
                                validName(name, ["canvas", "sfdc"]);
                                subs[name] = {
                                    params : v.params
                                };
                                if (name === STR_EVT) {
                                    if(!$$.isNil(subscriptions[name])) {
                                        if (!$$.isNil(subscriptions[name][v.params.topic])) {
                                            delete subscriptions[name][v.params.topic];
                                        }
                                        if ($$.size(subscriptions[name]) <= 0) {
                                            delete subscriptions[name];
                                        }
                                    }
                                } else {
                                    delete subscriptions[name];
                                }
                            });
                        }
                        if (!client.isVF) {
                            postit(null, {type : "unsubscribe", config : {client : client}, subscriptions : subs});
                        }
                    },
                    /**
                     * @description Publishes a custom event. Events are published to all subscribing canvas applications
                     * on the same page, regardless of domain. Choose a unique namespace so the event doesn't collide with other
                     * application events. Events can have payloads of arbitrary JSON objects.
                     * @public
                     * @name Sfdc.canvas.client#publish
                     * @function
                     * @param {client} client The object from the signed request
                     * @param {Object} e The event to publish
                     * @example
                     * // Publish the foo.bar event with the specified payload.
                     * Sfdc.canvas(function() {
                     *     sr = JSON.parse('<%=signedRequestJson%>');
                     *     Sfdc.canvas.client.publish(sr.client,
                     *         {name : "foo.bar", payload : {some : 'stuff'}});
                     *});
                     */
                    publish : function(client, e) {
                        if (!$$.isNil(e) && !$$.isNil(e.name)) {
                            validName(e.name);
                            if (validateClient(client)) {
                                postit(null, {type : "publish", config : {client : client}, event : e});
                            }
                        }
                    }
                };
            }());

            var callback = (function() {
                return  {
                    callback : function (data) {
                        // If the server is telling us the access_token is invalid, wipe it clean.
                        if (data.status === 401 &&
                            $$.isArray(data.payload) &&
                            data.payload[0].errorCode &&
                            data.payload[0].errorCode === "INVALID_SESSION_ID") {
                            // Session has expired logout.
                            if ($$.oauth) {$$.oauth.logout();}
                        }
                        // Find appropriate client callback an invoke it.
                        if ($$.isFunction(cbs[data.seq])) {
                            if (!$$.isFunction(cbs[data.seq])) {
                                alert("not function");
                            }
                            cbs[data.seq](data);
                        }
                        else {
                            // This can happen when the user switches out canvas apps real quick,
                            // before the request from the last canvas app have finish processing.
                            // We will ignore any of these results as the canvas app is no longer active to
                            // respond to the results.
                        }
                    }
                };
            }());

            var services = (function() {

                var sr;

                return  {
                    /**
                     * @description Performs a cross-domain, asynchronous HTTP request.
                     <br>Note: this method shouldn't be used for same domain requests.
                     * @param {String} url The URL to which the request is sent
                     * @param {Object} settings A set of key/value pairs to configure the request
                     <br>The success setting is required at minimum and should be a callback function
                     * @config {String} [client] The required client context {oauthToken: "", targetOrigin : "", instanceId : ""}
                     * @config {String} [contentType] "application/json"
                     * @config {String} [data] The request body
                     * @config {String} [headers] request headers
                     * @config {String} [method="GET"] The type of AJAX request to make
                     * @config {Function} [success] Callback for all responses from the server (failure and success). Signature: success(response); interesting fields: [response.data, response.responseHeaders, response.status, response.statusText}
                     * @config {Boolean} [async=true] Asynchronous: only <code>true</code> is supported.
                     * @name Sfdc.canvas.client#ajax
                     * @function
                     * @throws An error if the URL is missing or the settings object doesn't contain a success callback function.
                     * @example
                     * //Posting to a Chatter feed:
                     * var sr = JSON.parse('<%=signedRequestJson%>');
                     * var url = sr.context.links.chatterFeedsUrl+"/news/"
                     *                                   +sr.context.user.userId+"/feed-items";
                     * var body = {body : {messageSegments : [{type: "Text", text: "Some Chatter Post"}]}};
                     * Sfdc.canvas.client.ajax(url,
                     *   {client : sr.client,
                     *     method: 'POST',
                     *     contentType: "application/json",
                     *     data: JSON.stringify(body),
                     *     success : function(data) {
                     *     if (201 === data.status) {
                     *          alert("Success"
                     *          }
                     *     }
                     *   });
                     * @example
                     * // Gets a list of Chatter users:
                     * // Paste the signed request string into a JavaScript object for easy access.
                     * var sr = JSON.parse('<%=signedRequestJson%>');
                     * // Reference the Chatter user's URL from Context.Links object.
                     * var chatterUsersUrl = sr.context.links.chatterUsersUrl;
                     *
                     * // Make an XHR call back to Salesforce through the supplied browser proxy.
                     * Sfdc.canvas.client.ajax(chatterUsersUrl,
                     *   {client : sr.client,
                     *   success : function(data){
                     *   // Make sure the status code is OK.
                     *   if (data.status === 200) {
                     *     // Alert with how many Chatter users were returned.
                     *     alert("Got back "  + data.payload.users.length +
                     *     " users"); // Returned 2 users
                     *    }
                     * })};
                     */
                    ajax : function (url, settings) {

                        var ccb, config, defaults;

                        if (!url) {
                            throw "PRECONDITION ERROR: url required with AJAX call";
                        }
                        if (!settings || !$$.isFunction(settings.success)) {
                            throw "PRECONDITION ERROR: function: 'settings.success' missing.";
                        }
                        if (! validateClient(settings.client, settings.success)) {
                            return;
                        }

                        ccb = settings.success;
                        defaults = {
                            method: 'GET',
                            async: true,
                            contentType: "application/json",
                            headers: {"Authorization" : "OAuth "  + settings.client.oauthToken,
                                "Accept" : "application/json"},
                            data: null
                        };
                        config = $$.extend(defaults, settings || {});

                        // Remove any listeners as functions cannot get marshaled.
                        config.success = undefined;
                        config.failure = undefined;
                        // Don't allow the client to set "*" as the target origin.
                        if (config.client.targetOrigin === "*") {
                            config.client.targetOrigin = null;
                        }
                        else {
                            // We need to set this here so we can validate the origin when we receive the call back
                            purl = $$.startsWithHttp(config.targetOrigin, purl);
                        }
                        postit(ccb, {type : "ajax", url : url, config : config});
                    },
                    /**
                     * @description Returns the context for the current user and organization.
                     * @public
                     * @name Sfdc.canvas.client#ctx
                     * @function
                     * @param {Function} clientscb The callback function to run when the call to ctx completes
                     * @param {Object} client The signedRequest.client.
                     * @example
                     * // Gets context in the canvas app.
                     *
                     * function callback(msg) {
                     *   if (msg.status !== 200) {
                     *     alert("Error: " + msg.status);
                     *     return;
                     *   }
                     *   alert("Payload: ", msg.payload);
                     * }
                     * var ctxlink = Sfdc.canvas.byId("ctxlink");
                     * var client = Sfdc.canvas.oauth.client();
                     * ctxlink.onclick=function() {
                     *   Sfdc.canvas.client.ctx(callback, client)};
                     * }
                     */
                    ctx : function (clientscb, client) {
                        if (validateClient(client, clientscb)) {
                            postit(clientscb, {type : "ctx", accessToken : client.oauthToken, config : {client : client}});
                        }
                    },
                    /**
                     * @public
                     * @function
                     * @name Sfdc.canvas.client#token
                     * @description Stores or gets the oauth token in a local javascript variable. Note, if longer term
                     * (survive page refresh) storage is needed store the oauth token on the server side.
                     * @param {String} t oauth token, if supplied it will be stored in a volatile local JS variable.
                     * @returns {Object} the oauth token.
                     */
                    token : function(t) {
                        return $$.oauth && $$.oauth.token(t);
                    },
                    /**
                     * @description Returns the current version of the client.
                     * @public
                     * @function
                     * @name Sfdc.canvas.client#version
                     * @returns {Object} {clientVersion : "29.0", parentVersion : "29.0"}.
                     */
                    version : function() {
                        return {clientVersion: cversion, parentVersion : pversion};
                    },
                    /**
                     * @function
                     * @public
                     * @name Sfdc.canvas.client#signedrequest
                     * @description Temporary storage for the signed request. An alternative for users storing SR in
                     * a global variable. Note: if you would like a new signed request take a look at refreshSignedRequest().
                     * @param {Object} s signedrequest to be temporarily stored in Sfdc.canvas.client object.
                     * @returns {Object} the value previously stored
                     */
                    signedrequest : function(s) {
                        if (arguments.length > 0) {
                            sr = s;
                        }
                        return sr;
                    },
                    /**
                     * @function
                     * @public
                     * @name Sfdc.canvas.client#refreshSignedRequest
                     * @description Refresh the signed request. Obtain a new signed request on demand. Note the
                     * authentication mechanism of the canvas app must be set to SignedRequest and not OAuth.
                     * @param {Function} clientscb The client's callback function to receive the base64 encoded signed request.
                     * @example
                     * // Gets a signed request on demand.
                     *  Sfdc.canvas.client.refreshSignedRequest(function(data) {
                     *      if (data.status === 200) {
                     *          var signedRequest =  data.payload.response;
                     *          var part = signedRequest.split('.')[1];
                     *          var obj = JSON.parse(Sfdc.canvas.decode(part));
                     *      }
                     *   }
                     */
                    refreshSignedRequest : function(clientscb) { //, name) {
                        // Leave in for manual testing (possibly automate this not sure how)
                        // var id = (name) ? name : window.name.substring("canvas-frame-".length),
                        var id = window.name.substring("canvas-frame-".length),
                            client = {oauthToken : "null", instanceId : id, targetOrigin : "*"};
                        postit(clientscb, {type : "refresh", accessToken : client.oauthToken, config : {client : client}});
                    },
                    /**
                     * @public
                     * @function
                     * @name Sfdc.canvas.client#repost
                     * @description Repost the signed request. Instruct the parent window to initiate a new post to the
                     * canvas url. Note the authentication mechanism of the canvas app must be set to SignedRequest and not OAuth.
                     * @param {Boolean}[refresh=false] Refreshes the signed request when set to true.
                     * @example
                     * // Gets a signed request on demand, without refreshing the signed request.
                     *  Sfdc.canvas.client.repost();
                     * // Gets a signed request on demand, first by refreshing the signed request.
                     *  Sfdc.canvas.client.repost({refresh : true});
                     */
                    repost : function(refresh) {
                        var id = window.name.substring("canvas-frame-".length),
                            client = {oauthToken : "null", instanceId : id, targetOrigin : "*"},
                            r= refresh || false;
                        postit(null, {type : "repost", accessToken : client.oauthToken, config : {client : client}, refresh : r});
                    }

                };
            }());

            var frame = (function() {
                return  {
                    /**
                     * @public
                     * @name Sfdc.canvas.client#size
                     * @function
                     * @description Returns the current size of the iFrame.
                     * @return {Object}<br>
                     * <code>heights.contentHeight</code>: the height of the virtual iFrame, all content, not just visible content.<br>
                     * <code>heights.pageHeight</code>: the height of the visible iFrame in the browser.<br>
                     * <code>heights.scrollTop</code>: the position of the scroll bar measured from the top.<br>
                     * <code>widths.contentWidth</code>: the width of the virtual iFrame, all content, not just visible content.<br>
                     * <code>widths.pageWidth</code>: the width of the visible iFrame in the browser.<br>
                     * <code>widths.scrollLeft</code>: the position of the scroll bar measured from the left.
                     * @example
                     * //get the size of the iFrame and print out each component.
                     * var sizes = Sfdc.canvas.client.size();
                     * console.log("contentHeight; " + sizes.heights.contentHeight);
                     * console.log("pageHeight; " + sizes.heights.pageHeight);
                     * console.log("scrollTop; " + sizes.heights.scrollTop);
                     * console.log("contentWidth; " + sizes.widths.contentWidth);
                     * console.log("pageWidth; " + sizes.widths.pageWidth);
                     * console.log("scrollLeft; " + sizes.widths.scrollLeft);
                     */
                    size : function() {
                        var docElement = $$.document().documentElement;
                        var contentHeight = docElement.scrollHeight,
                            pageHeight = docElement.clientHeight,
                            scrollTop = (docElement && docElement.scrollTop) || $$.document().body.scrollTop,
                            contentWidth = docElement.scrollWidth,
                            pageWidth = docElement.clientWidth,
                            scrollLeft = (docElement && docElement.scrollLeft) || $$.document().body.scrollLeft;

                        return {heights : {contentHeight : contentHeight, pageHeight : pageHeight, scrollTop : scrollTop},
                            widths : {contentWidth : contentWidth, pageWidth : pageWidth, scrollLeft : scrollLeft}};
                    },
                    /**
                     * @public
                     * @name Sfdc.canvas.client#resize
                     * @function
                     * @description Informs the parent window to resize the canvas iFrame. If no parameters are specified,
                     * the parent window attempts to determine the height of the canvas app based on the
                     * content and then sets the iFrame width and height accordingly. To explicitly set the dimensions,
                     * pass in an object with height and/or width properties.
                     * @param {Client} client The object from the signed request
                     * @param {size} size The optional height and width information
                     * @example
                     * //Automatically determine the size
                     * Sfdc.canvas(function() {
                     *     sr = JSON.parse('<%=signedRequestJson%>');
                     *     Sfdc.canvas.client.resize(sr.client);
                     * });
                     *
                     * @example
                     * //Set the height and width explicitly
                     * Sfdc.canvas(function() {
                     *     sr = JSON.parse('<%=signedRequestJson%>');
                     *     Sfdc.canvas.client.resize(sr.client, {height : "1000px", width : "900px"});
                     * });
                     *
                     * @example
                     * //Set only the height
                     * Sfdc.canvas(function() {
                     *     sr = JSON.parse('<%=signedRequestJson%>');
                     *     Sfdc.canvas.client.resize(sr.client, {height : "1000px"});
                     * });
                     *
                     */
                    resize : function(client, size) {
                        var sh, ch, sw, cw, s = {height : "", width : ""},
                            docElement = $$.document().documentElement;

                        // If the size was not supplied, adjust window
                        if ($$.isNil(size)) {
                            sh = docElement.scrollHeight;
                            ch = docElement.clientHeight;
                            if (ch !== sh) {
                                s.height = sh + "px";
                            }
                            sw = docElement.scrollWidth;
                            cw = docElement.clientWidth;
                            if (sw !== cw) {
                                s.width = sw + "px";
                            }
                        }
                        else {
                            if (!$$.isNil(size.height)) {
                                s.height = size.height;
                            }
                            if (!$$.isNil(size.width)) {
                                s.width = size.width;
                            }
                        }
                        if (!$$.isNil(s.height) || !$$.isNil(s.width)) {
                            postit(null, {type : "resize", config : {client : client}, size : s});
                        }
                    },
                    /**
                     * @public
                     * @name Sfdc.canvas.client#autogrow
                     * @function
                     * @description Starts or stops a timer which checks the content size of the iFrame and
                     * adjusts the frame accordingly.
                     * Use this function when you know your content is changing size, but you're not sure when. There's a delay as
                     * the resizing is done asynchronously. Therfore, if you know when your content changes size, you should 
                     * explicitly call the resize() method and save browser CPU cycles.
                     * Note: you should turn off scrolling before this call, otherwise you might get a flicker.
                     * @param {client} client The object from the signed request
                     * @param {boolean} b Whether it's turned on or off; defaults to <code>true</code>
                     * @param {Integer} interval The interval used to check content size; default timeout is 300ms.
                     * @example
                     *
                     * // Turn on auto grow with default settings.
                     * Sfdc.canvas(function() {
                     *     sr = JSON.parse('<%=signedRequestJson%>');
                     *     Sfdc.canvas.client.autogrow(sr.client);
                     * });
                     *
                     * // Turn on auto grow with a polling interval of 100ms (milliseconds).
                     * Sfdc.canvas(function() {
                     *     sr = JSON.parse('<%=signedRequestJson%>');
                     *     Sfdc.canvas.client.autogrow(sr.client, true, 100);
                     * });
                     *
                     * // Turn off auto grow.
                     * Sfdc.canvas(function() {
                     *     sr = JSON.parse('<%=signedRequestJson%>');
                     *     Sfdc.canvas.client.autogrow(sr.client, false);
                     * });
                     */
                    autogrow : function(client, b, interval) {
                        var ival = ($$.isNil(interval)) ? 300 : interval;
                        autog  = ($$.isNil(b)) ? true : b;
                        if (autog === false) {
                            return;
                        }
                        setTimeout(function () {
                            submodules.frame.resize(client);
                            submodules.frame.autogrow(client, autog);
                        },ival);
                    }
                };
            }());

            return {
                services : services,
                frame : frame,
                event : event,
                callback : callback
            };
        }());

        $$.xd.receive(xdCallback, getTargetOrigin);

        return {
            ctx : submodules.services.ctx,
            ajax : submodules.services.ajax,
            token : submodules.services.token,
            version : submodules.services.version,
            resize : submodules.frame.resize,
            size : submodules.frame.size,
            autogrow : submodules.frame.autogrow,
            subscribe : submodules.event.subscribe,
            unsubscribe : submodules.event.unsubscribe,
            publish : submodules.event.publish,
            signedrequest : submodules.services.signedrequest,
            refreshSignedRequest : submodules.services.refreshSignedRequest,
            repost : submodules.services.repost
        };
    }());

    $$.module('Sfdc.canvas.client', module);

}(Sfdc.canvas));