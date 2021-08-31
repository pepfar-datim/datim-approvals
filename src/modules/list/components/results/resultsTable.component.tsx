import React from 'react';
import MaterialTable, {MTableBodyRow} from "material-table";
import {tableIcons} from "./resultsTableIcons";
import {Typography} from "@material-ui/core";
import makeId from "../../../shared/services/makeId.service";
import MechanismModel from "../../../shared/models/mechanism.model";

const cellStyle = {padding: "0px 5px"};

type SearchRow = {
    name:string;
    ou:string;
    agency:string;
    partner:string;
    status:string;
    _originalMechanism: MechanismModel;
    tableData:{checked?:boolean}
}

type SortOutput = -1|0|1;

function sortByKey(key:string,mech1:SearchRow, mech2:SearchRow):SortOutput{
    let v1 = mech1[key];
    let v2 = mech2[key];
    if (key==='name'){
        v1 = parseInt(v1);
        v2 = parseInt(v2);
        if (isNaN(v1)) return 1;
        if (isNaN(v2)) return -1;
    }
    if (v1===v2) return 0;
    return v1<v2?-1:1;
}

function sortFactory(primary:string, secondary:string){
    return function sortFunction(mech1:SearchRow,mech2:SearchRow):SortOutput{
        const sortResult = sortByKey(primary, mech1, mech2);
        if (sortResult===0) return sortByKey(secondary, mech1, mech2);
        else return sortResult;
    }
}

const tableColumns = [
    {title: "Mechanism", field: "name", cellStyle: cellStyle, defaultSort: "asc" as ('asc' | 'desc'), customSort: sortFactory('name','ou')},
    {title: "OU", field: "ou", cellStyle: cellStyle, defaultSort: "asc" as ('asc' | 'desc'), customSort: sortFactory('ou','name')},
    {title: "Agency", field: "agency", cellStyle: cellStyle, defaultSort: "asc" as ('asc' | 'desc'), customSort: sortFactory('agency','name')},
    {title: "Partner", field: "partner", cellStyle: cellStyle, customSort: sortFactory('partner','name')},
    {title: "Status", field: "status", cellStyle: cellStyle, customSort: sortFactory('status','name')},
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

function tranformMechanisms(allMechanisms:MechanismModel[]):SearchRow[]{
    return allMechanisms.map(mechanism=>{
        return {
            name: mechanism.info.name,
            ou: mechanism.info.ou,
            agency: mechanism.info.agency,
            partner: mechanism.info.partner,
            status: mechanism.state.status,
            _originalMechanism: mechanism,
            tableData:{}
        }
    })
}


function extractOrig(cb){
    return function(rowData){
        console.log(rowData);
        cb(rowData.map(m=>m._originalMechanism));
    }
}

function markSelected(filteredRows:SearchRow[], selectedMechanisms:MechanismModel[]):SearchRow[]{
    console.log(filteredRows, selectedMechanisms);
    if (!selectedMechanisms) return filteredRows;
    return filteredRows.map(row=>{
        let coId = row._originalMechanism.meta.coId;
        let cocId = row._originalMechanism.meta.cocId;
        let ou = row._originalMechanism.meta.ou;
        if (selectedMechanisms.some(m=>m.meta.coId===coId && m.meta.cocId===cocId && m.meta.ou===ou)) {
            row.tableData.checked = true;
            console.log('checked', row)
        }
        return row;
    });
}

export default class ResultsTable extends React.Component <{mechanisms: MechanismModel[], selectedMechanisms: MechanismModel[], onMechanismsSelected: (mechanisms:MechanismModel[])=>void},{}>{
    shouldComponentUpdate(nextProps, nextState){
        if (!nextProps.selectedMechanisms || !this.props.selectedMechanisms) return false;
        return this.props.selectedMechanisms.length!==nextProps.selectedMechanisms.length;
    }
    render(){
        console.log('ResultTable render event')
        return <MaterialTable
            columns={tableColumns}
            data={markSelected(tranformMechanisms(this.props.mechanisms), this.props.selectedMechanisms)}
            icons={tableIcons as any}
            title={<Typography>{this.props.mechanisms.length} mechanisms</Typography>}
            options={tableOptions}
            components={{Row: props => <MTableBodyRow {...props} id={`cy_results_${makeId(props.data.name)}`}/>}}
            localization={localization}
            onSelectionChange={extractOrig(this.props.onMechanismsSelected)}
        />;
    }
}