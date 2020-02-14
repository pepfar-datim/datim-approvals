import React from 'react';
import MaterialTable, {MTableBodyRow} from "material-table";
import {tableIcons} from "./resultsTableIcons";
import {Typography} from "@material-ui/core";
import makeId from "../../../shared/services/makeId.service";
import MechanismModel from "../../../shared/models/mechanism.model";

const cellStyle = {padding: "0px 5px"};

const tableColumns = [
    {title: "Mechanism", field: "name", cellStyle: cellStyle, defaultSort: "asc" as ('asc' | 'desc')},
    {title: "OU", field: "ou", cellStyle: cellStyle},
    {title: "Agency", field: "agency", cellStyle: cellStyle},
    {title: "Partner", field: "partner", cellStyle: cellStyle},
    {title: "Status", field: "status", cellStyle: cellStyle},
];

const localization = {
    toolbar: {nRowsSelected: '{0} mechanism(s) selected'}
};

const tableOptions = {
    pageSize: 20,
    pageSizeOptions: [20, 50, 100],
    selection: true,
    emptyRowsWhenPaging: false,
    thirdSortClick: false
};

function tranformMechanisms(allMechanisms:MechanismModel[]){
    return allMechanisms.map(mechanism=>{
        return {
            name: mechanism.info.name,
            ou: mechanism.info.ou,
            agency: mechanism.info.agency,
            partner: mechanism.info.partner,
            status: mechanism.state.status,
            _originalMechanism: mechanism
        }
    })
}


function extractOrig(cb){
    return function(rowData){
        cb(rowData.map(m=>m._originalMechanism));
    }
}

function ResultsTable({mechanisms, onMechanismsSelected}:{mechanisms: MechanismModel[], onMechanismsSelected: (mechanisms:MechanismModel[])=>void}) {
    return <MaterialTable
        columns={tableColumns}
        data={tranformMechanisms(mechanisms)}
        icons={tableIcons as any}
        title={<Typography>{mechanisms.length} mechanisms</Typography>}
        options={tableOptions}
        components={{Row: props=><MTableBodyRow {...props} id={`cy_results_${makeId(props.data.name)}`}/>}}
        localization={localization}
        onSelectionChange={extractOrig(onMechanismsSelected)}
    />;
}

export default React.memo(ResultsTable);