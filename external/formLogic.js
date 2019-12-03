// 'use strict';

/* global $, dhis2, functionloader */

/**
 * STELLA: Sub Total ELement Lazy Adderupper
 *  Adds up column, row, and group numeric totals
 * @author: Greg Wilson <gwilson@baosystems.com> and Ben Guaraldi <ben@dhis2.org>
 * @requires: dhis2 utils
 */

/**
 * Assumptions:
 * Specific subindicator ids (ssid) are wrapped in a class prefixed with 'si_' (for subindicator)
 *   followed by a unique 8 alnum (eg. si_aaaaaaaa)
 * Each 'Form_EntryField' that contributed to a row or column count needs to have a
 *   respective "rowX" and "colY" class to indicate which row/column it contributes to.
 * Row total fields are readonly and have the class totrowX_aaaaaaaa where X is
 *   the row number and aaaaaaa is the same 8 alnum as the si_ class
 * Column total fields are readonly and have the class totcolY_aaaaaaaa where Y is
 *   the column number and aaaaaaa is the same 8 alnum as the si_ class
 * Grand "subtotal" fields are readonly and have the class total_aaaaaaaa where
 *   aaaaaaa is the same 8 alnum as the si_ class
 */

var stella = {};

stella.autocalcindex = {};
stella.autocalcrules = [];

/**
 * Load autocalc rules into stella.autocalcrules and stella.autocalcindex.
 *
 * stella.autocalcrules is an array of rules, where each rule has an array of operands to sum as index 0
 * and a single target to put that sum as index 1.   Each source could either be one specific subindicator id
 * (ssid) or an array with index 0 as an ssid and index 1 with a set of category option combos (coc).
 *
 * stella.autocalcindex is a hash, where the ssid is the key and the value is an array of indices
 * of rules from stella.autocalcrules.
 */
stella.autocalc = function (source, target) {
    // Add the rule to autocalcrules
    stella.autocalcrules.push([source, target]);

    // Consider each operand of the source
    source.forEach(function(s) {
        // s[0] is the ssid, which is the key for autocalcindex
        // (s[1], if it exists, is an array of cocs to consider;
        // any other cocs are ignored)

        // If we haven't seen this ssid, make an empty array for it
        if (!(s[0] in stella.autocalcindex)) {
            stella.autocalcindex[s[0]] = [];
        }

        // Add this rule to autocalcindex if it's not already there
        if (stella.autocalcindex[s[0]].indexOf(stella.autocalcrules.length - 1) === -1) {
            stella.autocalcindex[s[0]].push(stella.autocalcrules.length - 1);
        }
    });
};

/**
 * Delete all loaded autocalculations
 */
stella.kill = function () {
    stella.autocalcindex = {};
    stella.autocalcrules = [];
};

/**
 * Remove all displayed autocalculations
 */
stella.erase = function () {
    $('[class*="si_"]').find('.input_total').html('<span class="word_subtotal">Subtotal</span>');
};

/**
 * Update rows, columns, non-custom and custom totals when loading the page
 */
stella.load = function () {
    $('[class*="si_"]').each(function (i, d) {
        var ssid = this.className.match('si_(.{8})')[1]; // Use the ssid to sum
        stella.sumSlice(ssid, 'row');                    // the rows,
        stella.sumSlice(ssid, 'col');                    // the columns,
        stella.sumTotal([[ssid]], ssid);                 // and the non-custom totals
    });

    // For the custom totals, simply consider every rule once
    for (var r = 0; r < stella.autocalcrules.length; r++) {
        stella.sumTotal(stella.autocalcrules[r][0], stella.autocalcrules[r][1]);
    }
};

/**
 * When a form value is changed, consider autocalculation of rows, columns, totals, and custom rules
 * to determine whether any form fields need to be changed
 */
stella.changed = function (dv) {
    // Find the particular sub indicator group that was modified using the de and co properties
    // of dv from DHIS 2's dataValueSaved function
    var ssid = '';
    $('[class*="si_"]').each(function (i, d) {
        if ($(this).find('[id^=' + dv.de + '-' + dv.co + ']').length > 0) {
            ssid = this.className.match('si_(.{8})')[1];
            return;
        }
    });

    if (ssid !== '') {                    // If we have an ssid, then look at the related
        stella.sumSlice(ssid, 'row');       // rows,
        stella.sumSlice(ssid, 'col');       // columns,
        stella.sumTotal([[ssid]], ssid);    // totals,
        if (ssid in stella.autocalcindex) { // and custom rules
            stella.autocalcindex[ssid].forEach(function(e) {
                stella.sumTotal(stella.autocalcrules[e][0], stella.autocalcrules[e][1]);
            });
        }
    }
};

/**
 * Calculate the sums of a certain kind of slice of an ssid, usually either a row or a column
 */
stella.sumSlice = function (ssid, slice) {
    // An array to save the various sums of slices
    var slices = [];

    // Consider all Document Object Model (DOM) elements that match ssid
    $('.si_' + ssid).each(function () {
        // Get all of this DOM element's entry divs that have slice and that don't have 'tot'
        $(this).find('[class*=Form_EntryField][class*=' + slice + ']').not('[class*=tot]').each(function () {
            // Look for divs with 'slice' and then one or two numbers
            var s = this.className.match(slice + '\\d')[0];
            var val = stella.getVal(this);
            if (!slices[s]) {
                slices[s] = 0;
            }
            if (!isNaN(val)) {
                slices[s] += +val;
            }
        });
    });

    // Take all slices that we found display the sum we calculated
    for (var s in slices) {
        stella.display('.tot' + s + '_' + ssid, slices[s]);
    }
};

/**
 * Calculate the total sum for source, which is an array of operands, each with either just an ssid or an ssid
 * and cocs that restrict it.  Then place that total sum in target.  If created in an HTML template file, the
 * source and target will be the same ssid.  If specified in the CSV control file, they may be the same, but are
 * more likely to be different.
 */
stella.sumTotal = function (source, target) {
    var total = 0;

    // Consider each operand in source
    source.forEach(function (s) {
        var ssid = s[0];
        var cocs = s[1];

        // Consider all DOM elements that match ssid
        $('.si_' + ssid).each(function () {
            // Get all of this DOM element's entry divs, except for 'tot' fields
            $(this).find('[class*=Form_EntryField]').not('[class*=tot]').each(function () {
                // If we're only selecting a specific category option combo, check to see whether
                // this input has an id and whether that coc is referenced in that id
                if (!cocs || stella.idHasCoc(this, cocs)) {
                    // If we get a value, add it to the total
                    var val = stella.getVal(this);
                    if (!isNaN(val)) {
                        total += +val;
                    }
                }
            });
        });

        // Display the total sum in all DOM elements that match '.total_' + target.  (target is an ssid.)
        stella.display('.total_' + target, total);
    });
};

/**
 * Format a value and display it in all DOM elements matching selector.
 * If value is 0, show the text Subtotal in a small font.
 */
stella.display = function (selector, value) {
    $(selector).each(function () {
        if (value > 0) {
            // Round to 2 sig figs
            if (value.toFixed(2).indexOf('.00') == -1) {
                value = value.toFixed(2);
            }
            $(selector).find('.input_total').text(value);
        } else {
            $(selector).find('.input_total').html('<span class="word_subtotal">Subtotal</span>');
        }
    });
};

/**
 * Get the DHIS 2 data value related to a DOM selector
 */
stella.getVal = function(selector) {
    // Try to get the value through the input child of selector
    var val = $(selector).find('input').val();

    // We didn't end up with a value, so check to see if we are in reports instead
    if (val === undefined) {
        val = parseInt($(selector).find('.val').text());
    }

    return val;
};

/**
 * Determine whether a given id references a coc
 */
stella.idHasCoc = function (w, cocs) {
    try {
        var x = $(w).find('input');
        if (x.length) {
            var id = x.attr('id');
        } else {
            x = $(w).find('span.val');
            if (!x.length) {
                return false;
            }
            var id = x.attr('data-de') + '-' + x.attr('data-co') + '-val';
        }

        for (var c = 0; c < cocs.length; c++) {
            if (id.indexOf(cocs[c]) !== -1) {
                return true;
            }
        }

        return false;

    } catch(e) {
        return false;
    }
};

/**
 * qbert: Quarter Based Form Locking
 *  Hides subforms if not in currently selected time period
 * @author: Greg Wilson <gwilson@baosystems.com>
 * @requires: dhis2 utils
 */

/**
 * Assumptions:
 */

var qbert = {};

//get the currently selected dataset/period/org
qbert.getPeriod = function () {
    return $('#selectedPeriodId').val();
};

qbert.erase = function () {
    $('.expanded').parent().find('input').each(function () {
        qbert._enable(this);
    });
    $('.expanded').parent().find('textarea').each(function () {
        qbert._enable(this);
    });
    $('.expanded').removeClass('expanded').removeClass('ic_title_disabled').next('.PEPFAR_Form_Collapse').slideDown();
};

qbert.eraseForm = function (form) {
    //Expand
    $(form).removeClass('expanded').next(".PEPFAR_Form_Collapse").slideDown();
    //reset the Title
    $(form).removeClass('ic_title_disabled');
    //make sure the title class is present
    //$(form).addClass('PEPFAR_Form_Title'); //Not sure why this was necessary (TH)
    //set input elements as RO
    $(form).parent().find("input").each(function () {
        qbert._enable(this);
    });
    $(form).parent().find("textarea").each(function () {
        qbert._enable(this);
    });
    //remove warning text
    //        append("div").removeClass("cadenceWarning").html("");
};

//find and disable form elements
qbert.disable = function (form) {
    //Collapse
    $(form).addClass('expanded').next(".PEPFAR_Form_Collapse").slideUp('fast');
    //grey out title
    $(form).addClass('ic_title_disabled');
    //remove existing Title Class (for collapse/expanding)
    //$(form).removeClass('PEPFAR_Form_Title'); //Not sure why this was necessary (TH)
    //set input elements as RO
    $(form).parent().find("input").each(function () {
        qbert._disable(this);
    });
    //set input elements as RO
    $(form).parent().find("textarea").each(function () {
        qbert._disable(this);
    });
    //add warning text
    //        append("div").addClass("cadenceWarning").html("Invalid time period. Data entry disabled.");
};

//disable a form element
qbert._disable = function (elem) {
    if ($(elem).val() === '') {
        $(elem).addClass('ic_disabled').prop('disabled', true);
    } else {
        $(elem).addClass('ic_disabled').prop('disabled', false);
    }
};

qbert._enable = function (elem) {
    $(elem).removeClass('ic_disabled').prop('disabled', false).removeClass("ic_conflict");
};

/**
 * On-load method to update which sections are visible
 */
qbert.load = function () {
    var period = qbert.getPeriod();

    //If the period is not found we are probably not in the data entry app, exit
    if (period == undefined) {
        return;
    }

    //parse the current period
    var re = /20[1-9][0-9]Q([1-4])/; //we don't expect this to be running in 2100
    var found = period.match(re);

    if (found !== null) {
        //Reset the indicators
        var noentry = $(".ic_title_disabled");
        $(noentry).each(function () {
            qbert.eraseForm(this);
        });

        //only show annual in Q4 of FYOCT
        if (found[1] === '4' || found[1] === '1' || found[1] === '2') {
            var anns = $(".PEPFAR_Form_Title_Annually");
            $(anns).each(function () {
                qbert.disable(this);
            });
        }
        //only show semi in Q2, Q4 of FYOCT
        if (found[1] === '4' || found[1] === '2') {
            var qs = $(".PEPFAR_Form_Title_Semiannually");
            $(qs).each(function () {
                qbert.disable(this);
            });
        }
        //always show quarterly (PEPFAR_Form_Title_Quarterly)
    }
};

/**
 * CERULEAN: Make sections of forms designated "conditional" expandable and contractible
 * @author: Greg Wilson <gwilson@baosystems.com> and Ben Guaraldi <ben@dhis2.org>
 * @requires: jQuery
 */

var cerulean = {};

/**
 * Delete all of cerulean
 */
cerulean.erase = function () {
    $('.cerulean').remove();
}

/**
 * On load of form, add expand/collapse buttons and hide sections that do not have values
 */
cerulean.load = function () {
    // Start with a clean slate
    cerulean.erase();

    // Add new buttons
    var buttonDiv = '<div class="cerulean"><span><i class="fa fa-minus-square-o" aria-hidden="true"></i> Collapse</span><span><i class="fa fa-plus-square-o" aria-hidden="true"></i> Expand</span></div>';
    var buttons = $(buttonDiv).appendTo('.PEPFAR_Form_Priority_conditional > .PEPFAR_Form_Description').click(function () {
        cerulean.toggle(this);
    });

    // Set up initial state for each section, by considering each of the sets of buttons that was just created
    buttons.each(function () {
        // If there are no values, hide the conditional form section; otherwise, show it
        cerulean.toggle(this, cerulean.hasValues(this));
    });
};

/**
 * If visible is true, show the conditional area
 * If visible is false, hide the conditional area
 * If visible is undefined, then reverse the visibility of the conditional area
 * Also, make other necessary changes, like switching the text from Expand to Collapse or vice versa
 */
cerulean.toggle = function (buttonDiv, visible) {
    var sectionTitleDiv = $(buttonDiv).parent().parent().parent();
    if (visible === undefined) {
        // Turn on or off the conditional form area
        $(sectionTitleDiv).siblings().toggle();
        // Reverse the visibility of the Expand and Collapse divs, so only one shows at a time
        $(buttonDiv).children().toggle();
    } else {
        // If visible is true, show the conditional form area; otherwise, hide it
        $(sectionTitleDiv).siblings().toggle(visible);
        // If visible is true, show the Collapse button; otherwise, hide it
        $(buttonDiv).children().first().toggle(visible);
        // If visible is true, hide the Expand button; otherwise, show it
        $(buttonDiv).children().last().toggle(!visible);
    }
};

/**
 * Test to see if a selector has values
 */
cerulean.hasValues = function(selector) {
    // Get the entry fields
    var fields = $(selector).parent().parent().parent().parent().find('[class*=Form_EntryField]');

    // Consider them one at a time
    for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        var input = $(field).find('input');
        // Skip the total fields
        if ($(field).attr('class').indexOf('tot') === -1) {
            // Attempt to find the value using two different methods, as the html and css for
            // the Data Entry app and the Data Approval app are different
            var val = $(input).val();
            if (typeof(val) === 'undefined') {
                val = $(field).find('.val').text();
                if (typeof(val) !== 'undefined' && val != '') {
                    return true;
                }
            } else if (val != '') {
                return true;
            }
        }
    }
    // We looked at all of the inputs in all of the fields and we didn't find any values
    return false;
};

(function() {
    dhis2.util.on(dhis2.de.event.dataValuesLoaded, function(event, ds) {
        functionloader.dataValuesLoaded(ds);
    });

    dhis2.util.on(dhis2.de.event.formReady, function(event, ds) {
        //Form ready extra js to run
        //#formReady#
    });
})();

dhis2.util.on(dhis2.de.event.dataValueSaved, function(event, ds, dv) {
    stella.changed(dv);
    meany.changed(dv);

    //dataValueSaved extra JS to run
    //#dataValueSaved#
});

var functionloader = {};
functionloader.dataSetToRunFor = false;
functionloader.lastSelectedForm = false;

functionloader.dataValuesLoaded = function (ds) {
    $('#PEPFAR_loading').show();
    if (!functionloader.dataSetToRunFor) {
        // dataSetToRunFor is not set, so this is the first time we've been run
        console.log('PEPFAR: MER | Custom JS Loaded: v20190114 | Loading all javascript for ' + ds);
        functionloader.erase();
        functionloader.dataSetToRunFor = ds;
        functionloader.lastSelectedForm = functionloader.identifySelectedForm();
        qbert.load();

        $('.PEPFAR_Form_EntryField').find('.entryfield').addClass('PEPFAR_Form_EntryField_input');
        $('.PEPFAR_Form_OptionSet').find('.entryoptionset').addClass('PEPFAR_Form_EntryField_optionset');
        $('.PEPFAR_Form_Narrative').find('.entryarea').addClass('PEPFAR_Form_EntryField_narrative');

        //Data Values Loaded extra js to run

        stella.autocalc([['seiuydsd']], [['UrRXTdsd']]);
        stella.autocalc([['rkomedsd']], [['ERekDdsd']]);
        stella.autocalc([['lueikdsd']], [['U2ZzZdsd']]);
        stella.autocalc([['okwikdsd']], [['H868ydsd']]);
        stella.autocalc([['okwikdsd', ['aUwnyHuwMoM', 'NDSiHWlZgdn', 'iZDhpMYrUhD', 'f5UCCdzK3Tv', 'zu9HrgDHyQT', 'nL4Hn7rQRkH', 'RX6Bt5WZBTp', 'mm3OwXbMrDO', 't6SVZj25Y51', 'SgTYo6S71cR', 'IO9GD263u2H', 'zq6hDM0eyHD', 'xaE1rwbDcrA', 'rMROM7S9IcM', 'DWK907m2A1w', 'EjDC8XG5FTV', 'ewXoNYCdpYZ', 'Z0yw0rYHyNT', 'qbvstlhbKQN', 'qFe4iOwYox4', 'RP3AayX1LAk', 'zcgpWAmwXDe']]], [['SuPvadsd']]);
        stella.autocalc([['okwikdsd', ['TtarAq69fxc', 'IpGAJ8qpFHU', 'rZkSjF483iM', 'FAVPrIMm5hQ', 'YKar5VC8roP', 'CQQuvHn7dJa', 'd4eyjtfMJjV', 'h0g9DokFKAZ', 'RK5FpyT6bYE', 'uRHqJGCDJgi', 'jNekVyCzOqR', 'I6c24vig2M7', 'NRQe2llLF96', 'YQoLsMtht8U', 'ba5JcnE1DUJ', 'ZjLjyxbIXcD', 'UE87jwNYjtB', 'FAw0peqrDtE', 'n1vpOIvT6Xv', 'bIuKoX80N2Z', 'KQErAdoXLqV', 'CHWnztu6NhK']]], [['rM1aqdsd']]);
        stella.autocalc([['seiuyxta']], [['Ts8ZHxta']]);
        stella.autocalc([['rkomexta']], [['oV2UGxta']]);
        stella.autocalc([['lueikxta']], [['KjWvKxta']]);
        stella.autocalc([['okwikxta']], [['hnZXixta']]);
        stella.autocalc([['okwikxta', ['aUwnyHuwMoM', 'iZDhpMYrUhD', 'nL4Hn7rQRkH', 'RX6Bt5WZBTp', 'mm3OwXbMrDO', 'SgTYo6S71cR', 'zq6hDM0eyHD', 'rMROM7S9IcM', 'qbvstlhbKQN', 'qFe4iOwYox4', 'zcgpWAmwXDe', 'NDSiHWlZgdn', 'f5UCCdzK3Tv', 'zu9HrgDHyQT', 't6SVZj25Y51', 'IO9GD263u2H', 'xaE1rwbDcrA', 'DWK907m2A1w', 'EjDC8XG5FTV', 'ewXoNYCdpYZ', 'Z0yw0rYHyNT', 'RP3AayX1LAk']]], [['PbucYxta']]);
        stella.autocalc([['okwikxta', ['TtarAq69fxc', 'IpGAJ8qpFHU', 'rZkSjF483iM', 'FAVPrIMm5hQ', 'YKar5VC8roP', 'CQQuvHn7dJa', 'd4eyjtfMJjV', 'h0g9DokFKAZ', 'RK5FpyT6bYE', 'uRHqJGCDJgi', 'jNekVyCzOqR', 'I6c24vig2M7', 'NRQe2llLF96', 'YQoLsMtht8U', 'ba5JcnE1DUJ', 'ZjLjyxbIXcD', 'UE87jwNYjtB', 'FAw0peqrDtE', 'n1vpOIvT6Xv', 'bIuKoX80N2Z', 'KQErAdoXLqV', 'CHWnztu6NhK']]], [['Yx37mxta']]);
        stella.autocalc([['smoqedsd'], ['maqkadsd'], ['qyoyedsd'], ['leyiwdsd'], ['jgsgadsd'], ['nymqkdsd'], ['zcckgdsd', ['HTuFkqNl46u', 'GJBPjJZBrRn', 'pVFmF7dKnTq', 'GcAEOo6pgjG', 'tNnfZGycqoK', 'gcWll55WCHc', 'BiJwnz9vw41', 'mA6G2IcNQ5s', 'rL9fEh5MSHf', 'fN5EhNea5na', 'WUOsioCfTH1', 'aReRE4UUoKW', 'zRdpU5xlOQI', 'EsEgz70ex5M', 'FsaFnYgYYiE', 'XDgqQlbNOma', 'XqbMOMJhdoo', 'JqROtRoCBHP', 'mN07ApGjAKh', 'GNrMxECWqDp', 'fu8H9OdUyZ6', 'XEIYBLvAzIb', 'O4M73r7CEs1', 'pW32ZkMbRSO', 'G6ksZzf4PuP', 'tb2OliToe2g']], ['zcckgdsd', ['VemdciGizc8', 'ClRyt3CO2CU', 'Ys91wCxDGwp', 'hLjLWfjGWpK', 'gWPhDYzmbw5', 'IsuCX2xSvKQ', 'oBVan2Rcsdj', 'ew4H9zzs0GI', 'fpnwXTQGmD5', 'eVb1NqOEUoq', 'LokBv4egnfg', 'zzHeHMx5Mh1', 'dywO69YrrUq', 'Lq9WappoJ2W', 'ewxqtAm93uz', 'T7F0DwyrbBV', 'zDtqexNpaj8', 'uPn8wdfqpnK', 'i9N7JojYiQO', 'Rxd6hW5bqRu', 'hjgWcKahM96', 'V6ykris04Kr', 'o3zyOwZyxi7', 'vUUk6jQrXdb', 'rHymehDGb3n', 'wem5QqoRkkh']]], [['wHxYDdsd']]);
        stella.autocalc([['zcckgdsd', ['VemdciGizc8', 'ClRyt3CO2CU', 'Ys91wCxDGwp', 'hLjLWfjGWpK', 'gWPhDYzmbw5', 'IsuCX2xSvKQ', 'oBVan2Rcsdj', 'ew4H9zzs0GI', 'fpnwXTQGmD5', 'eVb1NqOEUoq', 'LokBv4egnfg', 'zzHeHMx5Mh1', 'dywO69YrrUq', 'Lq9WappoJ2W', 'ewxqtAm93uz', 'T7F0DwyrbBV', 'zDtqexNpaj8', 'uPn8wdfqpnK', 'i9N7JojYiQO', 'Rxd6hW5bqRu', 'hjgWcKahM96', 'V6ykris04Kr', 'o3zyOwZyxi7', 'vUUk6jQrXdb', 'rHymehDGb3n', 'wem5QqoRkkh']], ['smoqedsd', ['yPnEtFpqtt5', 'z6KOjZfpQcx', 'Z2jmPAIHrel', 'lbfOsYfiypV', 'NGYepD2stMO', 'OdBhPUGWQ5m', 'NlZJe4oDEFK', 'Q27GSYLDkGk', 'FmEMWg0TP1j', 'eSoHGswqAsd', 'RnaDS67VAvQ', 'irSyYG6qqBZ', 'renXtk3VqTM', 'KY39qXVMOj1', 'QdKC55saRRw', 'KAyyHkzmuL1', 'HYtbCWnAdG9', 'zrFplyGIhtL', 'fhtynTWtvqv', 'tDVcPbjxTPK', 'rZH5lIUD4nH', 'PPg7Yzjq0oF', 'BoN2WhPnYl1', 'MMyMkF05moq', 'Y2GIRv9dnAI', 'T6zWRBnlJhR']], ['maqkadsd', ['PrS9RqE1nmz', 'mq33twqgDWZ', 'LnYfq7wx1hN', 'WhxSPg1g9Og', 'XDTwB2A1yY0', 'E2NnF5pE5K1']], ['qyoyedsd', ['yPnEtFpqtt5', 'z6KOjZfpQcx', 'Z2jmPAIHrel', 'lbfOsYfiypV', 'NGYepD2stMO', 'OdBhPUGWQ5m', 'NlZJe4oDEFK', 'Q27GSYLDkGk', 'FmEMWg0TP1j', 'eSoHGswqAsd', 'RnaDS67VAvQ', 'irSyYG6qqBZ', 'renXtk3VqTM', 'KY39qXVMOj1', 'QdKC55saRRw', 'KAyyHkzmuL1', 'HYtbCWnAdG9', 'zrFplyGIhtL', 'fhtynTWtvqv', 'tDVcPbjxTPK', 'rZH5lIUD4nH', 'PPg7Yzjq0oF', 'BoN2WhPnYl1', 'MMyMkF05moq', 'Y2GIRv9dnAI', 'T6zWRBnlJhR']], ['leyiwdsd', ['PrS9RqE1nmz', 'mq33twqgDWZ', 'LnYfq7wx1hN', 'WhxSPg1g9Og', 'XDTwB2A1yY0', 'E2NnF5pE5K1']], ['jgsgadsd', ['yPnEtFpqtt5', 'z6KOjZfpQcx', 'Z2jmPAIHrel', 'lbfOsYfiypV', 'NGYepD2stMO', 'OdBhPUGWQ5m', 'NlZJe4oDEFK', 'Q27GSYLDkGk', 'FmEMWg0TP1j', 'eSoHGswqAsd', 'RnaDS67VAvQ', 'irSyYG6qqBZ', 'renXtk3VqTM', 'KY39qXVMOj1', 'QdKC55saRRw', 'KAyyHkzmuL1', 'HYtbCWnAdG9', 'zrFplyGIhtL', 'fhtynTWtvqv', 'tDVcPbjxTPK', 'rZH5lIUD4nH', 'PPg7Yzjq0oF', 'BoN2WhPnYl1', 'MMyMkF05moq', 'Y2GIRv9dnAI', 'T6zWRBnlJhR']], ['nymqkdsd', ['PrS9RqE1nmz', 'mq33twqgDWZ', 'LnYfq7wx1hN', 'WhxSPg1g9Og', 'XDTwB2A1yY0', 'E2NnF5pE5K1']]], [['cWqLvdsd']]);
        stella.autocalc([['zcckgdsd', ['VemdciGizc8', 'ClRyt3CO2CU', 'Ys91wCxDGwp', 'hLjLWfjGWpK', 'gWPhDYzmbw5', 'IsuCX2xSvKQ', 'oBVan2Rcsdj', 'ew4H9zzs0GI', 'fpnwXTQGmD5', 'eVb1NqOEUoq', 'LokBv4egnfg', 'zzHeHMx5Mh1', 'dywO69YrrUq', 'Lq9WappoJ2W', 'ewxqtAm93uz', 'T7F0DwyrbBV', 'zDtqexNpaj8', 'uPn8wdfqpnK', 'i9N7JojYiQO', 'Rxd6hW5bqRu', 'hjgWcKahM96', 'V6ykris04Kr', 'o3zyOwZyxi7', 'vUUk6jQrXdb', 'rHymehDGb3n', 'wem5QqoRkkh']]], [['px2d0dsd']]);
        stella.autocalc([['zcckgdsd', ['HTuFkqNl46u', 'GJBPjJZBrRn', 'pVFmF7dKnTq', 'GcAEOo6pgjG', 'tNnfZGycqoK', 'gcWll55WCHc', 'BiJwnz9vw41', 'mA6G2IcNQ5s', 'rL9fEh5MSHf', 'fN5EhNea5na', 'WUOsioCfTH1', 'aReRE4UUoKW', 'zRdpU5xlOQI', 'EsEgz70ex5M', 'FsaFnYgYYiE', 'XDgqQlbNOma', 'XqbMOMJhdoo', 'JqROtRoCBHP', 'mN07ApGjAKh', 'GNrMxECWqDp', 'fu8H9OdUyZ6', 'XEIYBLvAzIb', 'O4M73r7CEs1', 'pW32ZkMbRSO', 'G6ksZzf4PuP', 'tb2OliToe2g']]], [['u3VpZdsd']]);
        stella.autocalc([['zcckgdsd', ['HTuFkqNl46u', 'GJBPjJZBrRn', 'pVFmF7dKnTq', 'GcAEOo6pgjG', 'tNnfZGycqoK', 'gcWll55WCHc', 'BiJwnz9vw41', 'mA6G2IcNQ5s', 'rL9fEh5MSHf', 'fN5EhNea5na', 'WUOsioCfTH1', 'aReRE4UUoKW', 'zRdpU5xlOQI', 'EsEgz70ex5M', 'FsaFnYgYYiE', 'XDgqQlbNOma', 'XqbMOMJhdoo', 'JqROtRoCBHP', 'mN07ApGjAKh', 'GNrMxECWqDp', 'fu8H9OdUyZ6', 'XEIYBLvAzIb', 'O4M73r7CEs1', 'pW32ZkMbRSO', 'G6ksZzf4PuP', 'tb2OliToe2g']], ['zcckgdsd', ['VemdciGizc8', 'ClRyt3CO2CU', 'Ys91wCxDGwp', 'hLjLWfjGWpK', 'gWPhDYzmbw5', 'IsuCX2xSvKQ', 'oBVan2Rcsdj', 'ew4H9zzs0GI', 'fpnwXTQGmD5', 'eVb1NqOEUoq', 'LokBv4egnfg', 'zzHeHMx5Mh1', 'dywO69YrrUq', 'Lq9WappoJ2W', 'ewxqtAm93uz', 'T7F0DwyrbBV', 'zDtqexNpaj8', 'uPn8wdfqpnK', 'i9N7JojYiQO', 'Rxd6hW5bqRu', 'hjgWcKahM96', 'V6ykris04Kr', 'o3zyOwZyxi7', 'vUUk6jQrXdb', 'rHymehDGb3n', 'wem5QqoRkkh']]], [['uSujTdsd']]);
        meany.autoexclude([['smoqedsd']], [['maqkadsd']]);
        meany.autoexclude([['qyoyedsd']], [['leyiwdsd']]);
        meany.autoexclude([['jgsgadsd']], [['nymqkdsd']]);
        stella.autocalc([['jqoaqdsd']], [['gasgcdsd']]);
        stella.autocalc([['esgqcdsd']], [['bwgysdsd']]);
        stella.autocalc([['zcckgdsd']], [['S6Kucdsd']]);
        stella.autocalc([['fsewcdsd']], [['KuIvvdsd']]);
        stella.autocalc([['gaswgdsd']], [['yFpMTdsd']]);
        stella.autocalc([['smoqexta'], ['maqkaxta'], ['qyoyexta'], ['leyiwxta'], ['jgsgaxta'], ['nymqkxta'], ['zcckgxta', ['HTuFkqNl46u', 'GJBPjJZBrRn', 'pVFmF7dKnTq', 'GcAEOo6pgjG', 'tNnfZGycqoK', 'gcWll55WCHc', 'BiJwnz9vw41', 'mA6G2IcNQ5s', 'rL9fEh5MSHf', 'fN5EhNea5na', 'WUOsioCfTH1', 'aReRE4UUoKW', 'zRdpU5xlOQI', 'EsEgz70ex5M', 'FsaFnYgYYiE', 'XDgqQlbNOma', 'XqbMOMJhdoo', 'JqROtRoCBHP', 'mN07ApGjAKh', 'GNrMxECWqDp', 'fu8H9OdUyZ6', 'XEIYBLvAzIb', 'O4M73r7CEs1', 'pW32ZkMbRSO', 'G6ksZzf4PuP', 'tb2OliToe2g']], ['zcckgxta', ['VemdciGizc8', 'ClRyt3CO2CU', 'Ys91wCxDGwp', 'hLjLWfjGWpK', 'gWPhDYzmbw5', 'IsuCX2xSvKQ', 'oBVan2Rcsdj', 'ew4H9zzs0GI', 'fpnwXTQGmD5', 'eVb1NqOEUoq', 'LokBv4egnfg', 'zzHeHMx5Mh1', 'dywO69YrrUq', 'Lq9WappoJ2W', 'ewxqtAm93uz', 'T7F0DwyrbBV', 'zDtqexNpaj8', 'uPn8wdfqpnK', 'i9N7JojYiQO', 'Rxd6hW5bqRu', 'hjgWcKahM96', 'V6ykris04Kr', 'o3zyOwZyxi7', 'vUUk6jQrXdb', 'rHymehDGb3n', 'wem5QqoRkkh']]], [['mxrb0xta']]);
        stella.autocalc([['zcckgxta', ['VemdciGizc8', 'ClRyt3CO2CU', 'Ys91wCxDGwp', 'hLjLWfjGWpK', 'gWPhDYzmbw5', 'IsuCX2xSvKQ', 'oBVan2Rcsdj', 'ew4H9zzs0GI', 'fpnwXTQGmD5', 'eVb1NqOEUoq', 'LokBv4egnfg', 'zzHeHMx5Mh1', 'dywO69YrrUq', 'Lq9WappoJ2W', 'ewxqtAm93uz', 'T7F0DwyrbBV', 'zDtqexNpaj8', 'uPn8wdfqpnK', 'i9N7JojYiQO', 'Rxd6hW5bqRu', 'hjgWcKahM96', 'V6ykris04Kr', 'o3zyOwZyxi7', 'vUUk6jQrXdb', 'rHymehDGb3n', 'wem5QqoRkkh']], ['smoqexta', ['yPnEtFpqtt5', 'z6KOjZfpQcx', 'Z2jmPAIHrel', 'lbfOsYfiypV', 'NGYepD2stMO', 'OdBhPUGWQ5m', 'NlZJe4oDEFK', 'Q27GSYLDkGk', 'FmEMWg0TP1j', 'eSoHGswqAsd', 'RnaDS67VAvQ', 'irSyYG6qqBZ', 'renXtk3VqTM', 'KY39qXVMOj1', 'QdKC55saRRw', 'KAyyHkzmuL1', 'HYtbCWnAdG9', 'zrFplyGIhtL', 'fhtynTWtvqv', 'tDVcPbjxTPK', 'rZH5lIUD4nH', 'PPg7Yzjq0oF', 'BoN2WhPnYl1', 'MMyMkF05moq', 'Y2GIRv9dnAI', 'T6zWRBnlJhR']], ['maqkaxta', ['PrS9RqE1nmz', 'mq33twqgDWZ', 'LnYfq7wx1hN', 'WhxSPg1g9Og', 'XDTwB2A1yY0', 'E2NnF5pE5K1']], ['qyoyexta', ['yPnEtFpqtt5', 'z6KOjZfpQcx', 'Z2jmPAIHrel', 'lbfOsYfiypV', 'NGYepD2stMO', 'OdBhPUGWQ5m', 'NlZJe4oDEFK', 'Q27GSYLDkGk', 'FmEMWg0TP1j', 'eSoHGswqAsd', 'RnaDS67VAvQ', 'irSyYG6qqBZ', 'renXtk3VqTM', 'KY39qXVMOj1', 'QdKC55saRRw', 'KAyyHkzmuL1', 'HYtbCWnAdG9', 'zrFplyGIhtL', 'fhtynTWtvqv', 'tDVcPbjxTPK', 'rZH5lIUD4nH', 'PPg7Yzjq0oF', 'BoN2WhPnYl1', 'MMyMkF05moq', 'Y2GIRv9dnAI', 'T6zWRBnlJhR']], ['leyiwxta', ['PrS9RqE1nmz', 'mq33twqgDWZ', 'LnYfq7wx1hN', 'WhxSPg1g9Og', 'XDTwB2A1yY0', 'E2NnF5pE5K1']], ['jgsgaxta', ['yPnEtFpqtt5', 'z6KOjZfpQcx', 'Z2jmPAIHrel', 'lbfOsYfiypV', 'NGYepD2stMO', 'OdBhPUGWQ5m', 'NlZJe4oDEFK', 'Q27GSYLDkGk', 'FmEMWg0TP1j', 'eSoHGswqAsd', 'RnaDS67VAvQ', 'irSyYG6qqBZ', 'renXtk3VqTM', 'KY39qXVMOj1', 'QdKC55saRRw', 'KAyyHkzmuL1', 'HYtbCWnAdG9', 'zrFplyGIhtL', 'fhtynTWtvqv', 'tDVcPbjxTPK', 'rZH5lIUD4nH', 'PPg7Yzjq0oF', 'BoN2WhPnYl1', 'MMyMkF05moq', 'Y2GIRv9dnAI', 'T6zWRBnlJhR']], ['nymqkxta', ['PrS9RqE1nmz', 'mq33twqgDWZ', 'LnYfq7wx1hN', 'WhxSPg1g9Og', 'XDTwB2A1yY0', 'E2NnF5pE5K1']]], [['oZrr7xta']]);
        stella.autocalc([['zcckgxta', ['VemdciGizc8', 'ClRyt3CO2CU', 'Ys91wCxDGwp', 'hLjLWfjGWpK', 'gWPhDYzmbw5', 'IsuCX2xSvKQ', 'oBVan2Rcsdj', 'ew4H9zzs0GI', 'fpnwXTQGmD5', 'eVb1NqOEUoq', 'LokBv4egnfg', 'zzHeHMx5Mh1', 'dywO69YrrUq', 'Lq9WappoJ2W', 'ewxqtAm93uz', 'T7F0DwyrbBV', 'zDtqexNpaj8', 'uPn8wdfqpnK', 'i9N7JojYiQO', 'Rxd6hW5bqRu', 'hjgWcKahM96', 'V6ykris04Kr', 'o3zyOwZyxi7', 'vUUk6jQrXdb', 'rHymehDGb3n', 'wem5QqoRkkh']]], [['sTeLWxta']]);
        stella.autocalc([['zcckgxta', ['HTuFkqNl46u', 'GJBPjJZBrRn', 'pVFmF7dKnTq', 'GcAEOo6pgjG', 'tNnfZGycqoK', 'gcWll55WCHc', 'BiJwnz9vw41', 'mA6G2IcNQ5s', 'rL9fEh5MSHf', 'fN5EhNea5na', 'WUOsioCfTH1', 'aReRE4UUoKW', 'zRdpU5xlOQI', 'EsEgz70ex5M', 'FsaFnYgYYiE', 'XDgqQlbNOma', 'XqbMOMJhdoo', 'JqROtRoCBHP', 'mN07ApGjAKh', 'GNrMxECWqDp', 'fu8H9OdUyZ6', 'XEIYBLvAzIb', 'O4M73r7CEs1', 'pW32ZkMbRSO', 'G6ksZzf4PuP', 'tb2OliToe2g']]], [['aUBmpxta']]);
        stella.autocalc([['zcckgxta', ['HTuFkqNl46u', 'GJBPjJZBrRn', 'pVFmF7dKnTq', 'GcAEOo6pgjG', 'tNnfZGycqoK', 'gcWll55WCHc', 'BiJwnz9vw41', 'mA6G2IcNQ5s', 'rL9fEh5MSHf', 'fN5EhNea5na', 'WUOsioCfTH1', 'aReRE4UUoKW', 'zRdpU5xlOQI', 'EsEgz70ex5M', 'FsaFnYgYYiE', 'XDgqQlbNOma', 'XqbMOMJhdoo', 'JqROtRoCBHP', 'mN07ApGjAKh', 'GNrMxECWqDp', 'fu8H9OdUyZ6', 'XEIYBLvAzIb', 'O4M73r7CEs1', 'pW32ZkMbRSO', 'G6ksZzf4PuP', 'tb2OliToe2g']], ['zcckgxta', ['VemdciGizc8', 'ClRyt3CO2CU', 'Ys91wCxDGwp', 'hLjLWfjGWpK', 'gWPhDYzmbw5', 'IsuCX2xSvKQ', 'oBVan2Rcsdj', 'ew4H9zzs0GI', 'fpnwXTQGmD5', 'eVb1NqOEUoq', 'LokBv4egnfg', 'zzHeHMx5Mh1', 'dywO69YrrUq', 'Lq9WappoJ2W', 'ewxqtAm93uz', 'T7F0DwyrbBV', 'zDtqexNpaj8', 'uPn8wdfqpnK', 'i9N7JojYiQO', 'Rxd6hW5bqRu', 'hjgWcKahM96', 'V6ykris04Kr', 'o3zyOwZyxi7', 'vUUk6jQrXdb', 'rHymehDGb3n', 'wem5QqoRkkh']]], [['Cmy2Yxta']]);
        meany.autoexclude([['smoqexta']], [['maqkaxta']]);
        meany.autoexclude([['qyoyexta']], [['leyiwxta']]);
        meany.autoexclude([['jgsgaxta']], [['nymqkxta']]);
        stella.autocalc([['jqoaqxta']], [['gasgcxta']]);
        stella.autocalc([['esgqcxta']], [['bwgysxta']]);
        stella.autocalc([['zcckgxta']], [['LjWZBxta']]);
        stella.autocalc([['fsewcxta']], [['iMJ7ixta']]);
        stella.autocalc([['gaswgxta']], [['jgscwxta']]);


        functionloader.loadWithDelay();

    } else if (functionloader.dataSetToRunFor == ds && functionloader.lastSelectedForm && functionloader.lastSelectedForm == functionloader.identifySelectedForm()) {
        // dataSetToRunFor is set, but this appears to be the same form, due to a quirk in DHIS 2
        // that causes dataValuesLoaded to be called twice, so we do nothing
        console.log('PEPFAR: MER | dataValuesLoaded with previous ' + ds + ' and the same form, doing nothing');
        functionloader.lastSelectedForm = functionloader.identifySelectedForm();
        $('#PEPFAR_loading').hide();

    } else if (functionloader.dataSetToRunFor == ds) {
        // dataSetToRunFor is set, and either we are not able to determine the last selected form or it's a different form
        // Therefore, don't reconstruct the rules, but reload them on the page
        console.log('PEPFAR: MER | dataValuesLoaded with previous ' + ds + ', reloading custom JS');
        functionloader.erase();
        functionloader.lastSelectedForm = functionloader.identifySelectedForm();
        qbert.load();
        functionloader.loadWithDelay();

    } else {
        // Due to another quirk in DHIS 2, this javascript might be trying to run for a different form, as DHIS 2
        // may not wipe out custom javascript if the new form is not a custom form or does not have custom javascript.
        // Therefore, we delete our variables and reset all of the CSS, JS, and the like
        console.log('PEPFAR: MER | ' + functionloader.dataSetToRunFor + ' does not match ' + ds + ', so custom JS should not run; clearing out saved variables');
        functionloader.lastSelectedForm == false;
        functionloader.erase();
        meany.kill();
        stella.kill();
        $('#PEPFAR_loading').hide();
    }
}

functionloader.erase = function () {
    qbert.erase();
    meany.erase();
    stella.erase();
    cerulean.erase();
}

/**
 * After a short delay to allow execution of form display code, load cerulean, stella, and meany
 * Then remove the gray background formatting that DHIS2 applied to form fields that were disabled, but no longer are
 */
functionloader.loadWithDelay = function () {
    setTimeout(function() {
        cerulean.load();
        stella.load();
        meany.load();
        $('.entryfield').each(function(index) {
            if ($(this).css('background-color') != 'rgb(255, 255, 255)' && !$(this).hasClass('disabled')) {
                $(this).css('background-color', 'rgb(255, 255, 255)');
            }
        });
        $('#PEPFAR_loading').hide();
    }, 10);
}

/**
 * Uniquely identify the form, by adding the uid from the org hierarchy to the various selections from the selection box
 * and turn them all into a string
 */
functionloader.identifySelectedForm = function () {
    var orgUnit = $('#orgUnitTree .selected').parent('li').attr('id');
    if (typeof(orgUnit) !== 'undefined') {
        return $('#orgUnitTree .selected').parent('li').attr('id') + ' ' +
            Object.values($('#selectedDataSetId,#selectedPeriodId,#category-SH885jaRe0o')
                .map(function() {
                    return $(this).val();
                }).sort()
            ).join(' ');
    } else {
        return false;
    }
}

/**
 * MEANY: Mutually Exclusivity Automatic Nickel Yak
 *  Disables input fields based on user-entered data from rules
 *  created by mertide.py and established at form load
 * @author: Greg Wilson <gwilson@baosystems.com> and Ben Guaraldi <ben@dhis2.org>
 * @requires: dhis2 utils
 */

var meany = {};

meany.autoexcludeindex = {};
meany.autoexcluderules = [];
meany.loaded = false;

/**
 * Load autoexclude rules into meany.autoexcluderules and meany.autoexcludeindex.
 *
 * meany.autoexcluderules is an array of rules, where one side of the mutually exclusive rule (muex)
 * is index 0 and the other side is index 1. Both indices could either be just a specific subindicator id
 * (ssid) or an array of ssids and category option combos (coc).
 *
 * meany.autoexcludeindex is a hash, where the ssid is the key and the value is an array of indices
 * of rules from meany.autoexcluderules.  If the rule index is negative, it refers to a flipped version
 * of the rule represented by the equivalent positive number.
 */
meany.autoexclude = function (left, right) {
    // Add the rule to autoexcluderules
    meany.autoexcluderules.push([left, right]);

    // Consider each operand of the left side
    left.forEach(function(l) {
        // l[0] is the ssid, which is the key for autoexcludeindex
        // (l[1], if it exists, is an array of cocs to consider;
        // any other cocs are ignored)

        // If we haven't seen this ssid, make an empty array for it
        if (!(l[0] in meany.autoexcludeindex)) {
            meany.autoexcludeindex[l[0]] = [];
        }

        // Add this rule to autoexcludeindex
        meany.autoexcludeindex[l[0]].push(meany.autoexcluderules.length);
    });

    // Consider each operand of the right side, just like the left side
    right.forEach(function(r) {
        if (!(r[0] in meany.autoexcludeindex)) {
            meany.autoexcludeindex[r[0]] = [];
        }
        // Create a negative rule index so we know the rule should be flipped
        // before evaluating it from the right side's perspective
        meany.autoexcludeindex[r[0]].push(-1 * meany.autoexcluderules.length);
    });
}

/**
 * Delete all loaded rules
 */
meany.kill = function () {
    meany.autoexcludeindex = {};
    meany.autoexcluderules = [];
    meany.loaded = false;
};

/**
 * Reset all form fields to enabled
 */
meany.erase = function () {
    $('.muex_disabled').prop('disabled', false).removeClass('muex_disabled').css('background-color', 'rgb(255, 255, 255)');
    $('.muex_conflict').prop('disabled', false).removeClass('muex_conflict').css('background-color', 'rgb(255, 255, 255)');
    meany.loaded = false;
};

/**
 * Run all of the rules to potentially disable relevant form fields
 */
meany.load = function () {
    // meany.erase should have been run just before this, so all form fields are enabled

    meany.autoexcluderules.forEach(function(rule) {
        // Evaluate the rule from both perspectives, to see if anything on the form
        // needs to be disabled or enabled
        meany.evaluateRuleConsequences([rule[0], rule[1]], false);
        meany.evaluateRuleConsequences([rule[1], rule[0]], false);
    });

    meany.loaded = true;
}

/**
 * When a form value is changed, consider each relevant mutual exclusion rule to determine
 * whether any form fields need to be hidden or shown
 */
meany.changed = function (dv) {
    // Find the particular sub indicator group that was modified using the de and co properties
    // of dv from DHIS 2's dataValueSaved function
    var ssid = '';
    $('[class*="si_"]').each(function (i, d) {
        if ($(this).find('[id^=' + dv.de + '-' + dv.co + ']').length > 0) {
            var c = $(this).attr('class');
            ssid = c.substr(c.indexOf('si_') + 3, 8);
            return;
        }
    });

    if (ssid !== '') {
        if($('input[id^=' + dv.de + '-' + dv.co + '-val]').hasClass('muex_conflict')) {
            // The recently edited field has a conflict, so perhaps it needs to be disabled
            meany.disableOperand([ssid, [dv.co]]);
            meany.maybeEnableOperand([ssid, [dv.co]]);
        }
        if (ssid in meany.autoexcludeindex) {
            // If we have rules in the autoexcludeindex for this ssid, operate them
            meany.autoexcludeindex[ssid].forEach(function(index) {
                meany.evaluateRuleConsequences(meany.getRule(index), dv.co);
            });
        }
    }
};

/**
 * Given an index, return the rule that corresponds to that index.
 */
meany.getRule = function (index) {
    if (index > 0) {
        // This rule has a positive index, so it is not flipped
        return meany.autoexcluderules[index - 1];

    } else {
        // If the rule's index is negative, then it's actually saying swap the sides of the
        // positive index rule.  So if the rule is "values in A mean that there should be
        // no values in B" and flip it to "values in B mean there should be no values in A"

        // So first, find the rule to flip, which is -1 times the index minus 1
        var original = meany.autoexcluderules[(-1 * index) - 1];

        // Now, flip the rule and return it
        return [original[1], original[0]];
    }
}

/**
 * Consider a specific mutual exclusion rule and decide whether any form fields need to be hidden or shown.
 *
 * This function only considers one direction of the mutual exclusion, so it's looking at the fields on the left side
 * to determine whether the fields on the right side should be hidden or shown.
 */
meany.evaluateRuleConsequences = function (rule, coc) {
    var hasValues = false;

    // Consider each operand on the left side
    for (var o = 0; o < rule[0].length; o++) {
        var lcocs = rule[0][o][1];
        // If we're targeting a rule to specific category option combos and this data value
        // isn't associated with that category option combo, we can ignore it
        if (coc && lcocs && !lcocs.includes(coc)) {
            continue;
        }
        hasValues = meany.checkValues(rule[0][o]);
        // If any of the left side has values, we can stop looking for values
        if (hasValues) {
            break;
        }
    }

    for (var o = 0; o < rule[1].length; o++) {
        // We disable the right side if there were any values in the left side;
        // otherwise, we maybe enable it
        if (hasValues) {
            meany.disableOperand(rule[1][o]);
        } else {
            meany.maybeEnableOperand(rule[1][o]);
        }
    }
}

/**
 * Consider an operand (split into an ssid and an array of cocs) and determine whether it has any values.
 */
meany.checkValues = function (operand) {
    var ssid, cocs;
    [ssid, cocs] = operand;

    // Examine all instances of this ssid (which is probably just one)
    for (var i = 0; i < $('.si_' + ssid).length; i++) {
        // Get all the entry divs
        var entryDivs = $('.si_' + ssid + ':eq(' + i + ')').find('[class*=Form_EntryField]');
        for (var j = 0; j < entryDivs.length; j++) {
            var entryDiv = entryDivs[j];
            var input = $(entryDiv).find('input');

            // Skip the total fields.  Also, if we're only selecting a specific category option combo,
            // check to see whether this input has an id and whether that coc is referenced in that id
            if ($(entryDiv).attr('class').indexOf('tot') === -1 && (!cocs || meany.idHasCoc($(input).attr('id'), cocs))) {
                var val = $(input).val();
                if (typeof(val) === 'undefined') {
                    val = $(entryDiv).find('.val').text();
                    if (typeof(val) !== 'undefined' && val != '') {
                        return true;
                    }
                } else if (val != '') {
                    return true;
                }
            }
        }
    }
    return false;
};

/**
 * Determine whether a given id references a coc
 */
meany.idHasCoc = function (id, cocs) {
    if (typeof id === 'undefined') {
        return false;
    }
    for (var c = 0; c < cocs.length; c++) {
        if (id.indexOf(cocs[c]) !== -1) {
            return true;
        }
    }
    return false;
}

/**
 * Check to see whether one side of a rule has an operand that matches
 * a particular ssid and coc
 */
meany.operandMatch = function (side, ssid, coc) {
    for (var o = 0; o < side.length; o++) {
        if (side[o][0] === ssid && (typeof side[o][1] === 'undefined' || side[o][1].includes(coc))) {
            return true;
        }
    }
    return false;
}

/**
 * Check to see whether a rule indicates that a certain field (defined by ssid and coc)
 * should remain disabled
 */
meany.keepCocDisabled = function (rule, ssid, coc) {
    if (coc === 'all' || meany.operandMatch(rule[0], ssid, coc)) {
        for (var o = 0; o < rule[1].length; o++) {
            if (meany.checkValues(rule[1][o])) {
                return true;
            }
        }
    }
    return false;
};

/**
 * Consider an operand that has had one mutual exclusion removed to see if it has other mutual exclusions
 * restricting it, or if it should be enabled.  Since any rule can target any coc, this must be done on a
 * field-by-field basis.
 */
meany.maybeEnableOperand = function (operand) {
    // During load, we enable all fields and then progressively disable them,
    // so we don't need to run this function if we haven't finished loading yet
    if (!meany.loaded) {
        return;
    }

    var ssid, cocs;
    [ssid, cocs] = operand;
    if (ssid !== '' && ssid in meany.autoexcludeindex) {
        var keepCocDisabled = {};
        if (!cocs) {
            cocs = ['all'];
        }
        for (var c = 0; c < cocs.length; c++) {
            keepCocDisabled[cocs[c]] = false;

            // Since mutually exclusive rules are symmetric, we can check to see if any fields
            // require this field to remain disabled, and if not, enable it
            for (var i = 0; i < meany.autoexcludeindex[ssid].length; i++) {
                var index = meany.autoexcludeindex[ssid][i];
                var rule = meany.getRule(index);
                keepCocDisabled[cocs[c]] = meany.keepCocDisabled(rule, ssid, cocs[c]);
                if (keepCocDisabled[cocs[c]]) {
                    break;
                }
            }
        }

        for (c = 0; c < cocs.length; c++) {
            if (!keepCocDisabled[cocs[c]]) {
                if (cocs[c] == 'all') {
                    $('.si_' + ssid).find('input:not([readonly])').prop('disabled', false).removeClass('muex_disabled').removeClass('muex_conflict');
                } else {
                    $('.si_' + ssid).find('input[id*=' + cocs[c] + ']:not([readonly])').prop('disabled', false).removeClass('muex_disabled').removeClass('muex_conflict');
                }
            }
        }
    }
};

/**
 * Disable a particular mutually exclusive operand
 */
meany.disableOperand = function (operand) {
    var ssid, cocs;
    [ssid, cocs] = operand;
    if (cocs) {
        cocs.forEach(function(c) {
            $('.si_' + ssid).find('input[id*=' + c + ']:not([readonly])').filter(function() { return this.value != ''; }).prop('disabled', false).addClass('muex_conflict').removeClass('muex_disabled');
            $('.si_' + ssid).find('input[id*=' + c + ']:not([readonly])').filter(function() { return this.value == ''; }).prop('disabled', true).addClass('muex_disabled').removeClass('muex_conflict');
        });
    } else {
        // Just disable the whole thing
        $('.si_' + ssid).find('input:not([readonly])').filter(function() { return this.value != ''; }).prop('disabled', false).addClass('muex_conflict').removeClass('muex_disabled');
        $('.si_' + ssid).find('input:not([readonly])').filter(function() { return this.value == ''; }).prop('disabled', true).addClass('muex_disabled').removeClass('muex_conflict');
    }
};
$(function () {
    $('.PEPFAR_Form_Title').click(function (e) {
        var SH = this.SH ^= 1; // "Simple toggler"
        $(this).toggleClass("expanded")
            .next(".PEPFAR_Form_Collapse").slideToggle();
    });

    $('.PEPFAR_Form_ShowHide').click(function (e) {
        var SH = this.SH ^= 1; // "Simple toggler"
        //$(this).text(SH ? 'Expand All' : 'Collapse All')
        $(this).toggleClass("expanded");
        if (SH)
            $(this).parent().find(".PEPFAR_Form_Title").addClass('expanded')
                .next(".PEPFAR_Form_Collapse").slideUp();
        else
            $(this).parent().find(".PEPFAR_Form_Title", this.parent).removeClass('expanded')
                .next(".PEPFAR_Form_Collapse").slideDown();
    });
});