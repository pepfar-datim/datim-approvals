export function trigger() {
    /* global $ */
    $('#PEPFAR_Tabs_vertical').tabs().removeClass('ui-tabs').find('ul').removeClass('ui-helper-hidden');
    $('#PEPFAR_Tabs_vertical li').removeClass('ui-corner-top');
    $('[id ^= PEPFAR_Tabs_h]').tabs().find('ul').removeClass('ui-helper-hidden');


    /* global $ */
    setTimeout(() => {
        $('#shareForm').remove();
    }, 2000);

    /* global jQuery, dhis2*/

    function fireDataEntryEvents() {
        var $document = jQuery(document);
        $document.trigger(dhis2.de.event.formLoaded);
        $document.trigger(dhis2.de.event.dataValuesLoaded);
        $document.trigger(dhis2.de.event.formReady);
    }

    setTimeout(() => {
        try {
            fireDataEntryEvents();
        } catch (e) {
            console.error('trigger.js ERROR');
            console.error(e);
        }
    }, 1000);
}