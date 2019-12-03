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
    }catch (e){
        console.error(`dhis2.de.js ERROR`);
        console.error(e);
    }
}());
