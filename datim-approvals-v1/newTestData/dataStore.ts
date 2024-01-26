import {DataStoreObject, editDataStore} from "@pepfar-react-lib/dhis2-helpers";

let lateDate = new Date("2025-01-01");

export function openPeriodsInDataStore() {
    editDataStore('approvals', 'periodSettings', (dataStore: DataStoreObject) => {
        dataStore["MER Targets"]["2020Oct"]["end"] = lateDate
        dataStore["MER Results"]["2020Q3"]["end"] = lateDate
        dataStore["MER Results"]["2020Q4"]["end"] = lateDate
        return dataStore;
    })
}