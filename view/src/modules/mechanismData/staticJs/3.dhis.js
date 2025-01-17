

//dhis2.util.js

"use strict";

var dhis2 = dhis2 || {};
dhis2['util'] = dhis2['util'] || {};

/**
 * Creates namespace object based on path
 *
 * @param path {String} The path of the namespace, i.e. 'a.b.c'
 *
 * @returns {object} Namespace object
 */
dhis2.util.namespace = function( path ) {
    var parts = path.split('.');
    var parent = window;
    var currentPart = '';

    for( var i = 0, length = parts.length; i < length; i++ ) {
        currentPart = parts[i];
        parent[currentPart] = parent[currentPart] || {};
        parent = parent[currentPart];
    }

    return parent;
};

/**
 * Escape function for regular expressions.
 */
dhis2.util.escape = function( text ) {
    return text.replace(/[-[\]{}()*+?.,\/\\^$|#\s]/g, "\\$&");
};

/**
 * Convert a Java properties file into a javascript object.
 */
dhis2.util.parseJavaProperties = function( javaProperties ) {
    var obj = {}, lines;

    if (typeof javaProperties !== 'string') {
        return obj;
    }

    lines = javaProperties.split(/\n/);

    for (var i = 0, a; i < lines.length; i++) {
        if (!!(typeof lines[i] === 'string' && lines[i].length && lines[i].indexOf('=') !== -1)) {
            a = lines[i].split('=');
            obj[a[0].trim()] = eval('"' + a[1].trim().replace(/"/g, '\'') + '"');
        }
    }

    return obj;
};

/**
 * jQuery cannot correctly filter strings with () in them, so here is a fix
 * until jQuery gets updated.
 */
dhis2.util.jqTextFilterCaseSensitive = function( key, not ) {
    key = dhis2.util.escape(key);
    not = not || false;

    if( not ) {
        return function( i, el ) {
            return !!!$(el).text().match("" + key);
        };
    }
    else {
        return function( i, el ) {
            return !!$(el).text().match("" + key);
        };
    }
};

dhis2.util.jqTextFilter = function( key, not ) {
    key = dhis2.util.escape(key).toLowerCase();
    not = not || false;

    if( not ) {
        return function( i, el ) {
            return !!!$(el).text().toLowerCase().match("" + key);
        };
    }
    else {
        return function( i, el ) {
            return !!$(el).text().toLowerCase().match("" + key);
        };
    }
};

/**
 * Generates a valid UUID.
 */
dhis2.util.uuid = function() {
    var S4 = function() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
};

/**
 * Generates a valid UID.
 */
dhis2.util.uid = function() {
    var letters = "abcdefghijklmnopqrstuvwxyz" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var allowedChars = "0123456789" + letters;
    var NUMBER_OF_CODEPOINTS = allowedChars.length;
    var CODESIZE = 11;
    var uid;

    //the uid should start with a char
    uid = letters.charAt( Math.random() * (letters.length) );

    for ( var i = 1; i < CODESIZE; ++i ){
        uid += allowedChars.charAt( Math.random() * (NUMBER_OF_CODEPOINTS) );
    }

    return uid;
};

/**
 * Normalizes an argument object returned from a jQuery promise. If the argument
 * is undefined, not an array or an empty array, undefined is returned. If the
 * argument is a single promise object, the object is wrapped in an array. If the
 * argument is an array of promise objects, the array is returned unmodified.
 */
dhis2.util.normalizeArguments = function( args ) {
    if( !args || !args.length || !args[0] ) {
        return undefined;
    }

    if( $.isArray(args[0]) ) {
        return args;
    }
    else {
        var arr = [];
        arr[0] = args;
        return arr;
    }
};

/**
 * Convenience method to be used from inside custom forms. When a function is
 * registered inside a form it will be loaded every time the form is loaded,
 * hence the need to unregister and the register the function.
 */
dhis2.util.on = function( event, fn ) {
    $( document ).off( event ).on( event, fn );
};

/**
 * Returns a query parameter string where _ is the parameter and the time stamp
 * in milliseconds is the value, intended to force fresh non-cached responses
 * from server.
 */
dhis2.util.cacheBust = function() {
    return "_=" + new Date().getTime();
}

/**
 * Sorts the two given objects on the name property.
 */
dhis2.util.nameSort = function( a, b ) {
    return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
}

/**
 * adds ':containsNC' to filtering.
 * $(sel).find(':containsNC(key)').doSomething();
 */
$.expr.pseudos.containsNC = function( a, i, m, r ) {
    var search = dhis2.util.escape(m[3]);
    return jQuery(a).text().toUpperCase().indexOf(m[search].toUpperCase()) >= 0;
};

/**
 * adds ':regex' to filtering, use to filter by regular expression
 */
$.expr.pseudos.regex = function( a, i, m, r ) {
    var re = new RegExp(m[3], 'i');
    return re.test(jQuery(a).text());
};

/**
 * adds ':regex' to filtering, use to filter by regular expression
 * (this is the case sensitive version)
 */
$.expr.pseudos.regexCS = function( a, i, m, r ) {
    var re = new RegExp(m[3]);
    return re.test(jQuery(a).text());
};

/**
 * Returns an array of the keys in a given object. Will use ES5 Object.keys() if
 * available, if not it will provide a pure javascript implementation.
 * @returns array of keys
 */
if( !Object.keys ) {
    Object.keys = function( obj ) {
        var keys = [];
        for( var k in obj )
            if( obj.hasOwnProperty(k) )
                keys.push(k);
        return keys;
    };
}

// http://stackoverflow.com/questions/3326650/console-is-undefined-error-for-internet-explorer
(function() {
    var method;
    var noop = function() {
    };

    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];

    var length = methods.length;
    var console = (window.console = window.console || {});

    while( length-- ) {
        method = methods[length];

        // Only stub undefined methods.
        if( !console[method] ) {
            console[method] = noop;
        }
    }

    // this shouldn't really be used anymore, but leaving it in for legacy reasons
    window.log = function( msg ) {
        console.log(msg);
    }
}());

////

// dhis2.de.js

/* global dhis2 */
/**
 * Creates the events as they exist in data entry so they can be subscribed to.
 * This is needed so that subscriptions to these events in custom forms do not cause the
 * form to behave differently between reports and approvals.
 */

/* global jQuery */
(function createDataEntryEvents() {
    try {
        window.dhis2 = window.dhis2 || {};
        dhis2.de = dhis2.de || {};
        dhis2.de.event = {
            // Fired
            formLoaded: 'dhis2.de.event.formLoaded',
            dataValuesLoaded: 'dhis2.de.event.dataValuesLoaded',
            formReady: 'dhis2.de.event.formReady',
            // Never fired in approvals (but can be subscribed to in custom form)
            dataValueSaved: 'dhis2.de.event.dataValueSaved',
            completed: 'dhis2.de.event.completed',
            uncompleted: 'dhis2.de.event.uncompleted',
            validationSucces: 'dhis2.de.event.validationSuccess',
            validationError: 'dhis2.de.event.validationError'
        };
        window.dhis2 = dhis2
    }catch (e){
        console.error(`dhis2.de.js ERROR`);
        console.error(e);
    }
}());