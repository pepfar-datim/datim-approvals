/* global jQuery, dhis2*/

function fireDataEntryEvents() {
    var $document = jQuery(document);
    $document.trigger(dhis2.de.event.formLoaded);
    $document.trigger(dhis2.de.event.dataValuesLoaded);
    $document.trigger(dhis2.de.event.formReady);
}

setTimeout(()=>{
    try {
        fireDataEntryEvents();
    } catch (e) {
        console.error(`trigger.js ERROR`);
        console.error(e);
    }
}, 1000);