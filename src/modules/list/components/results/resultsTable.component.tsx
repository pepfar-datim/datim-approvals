import React from 'react';
import MaterialTable, {MTableBodyRow} from "material-table";
import {tableIcons} from "./resultsTableIcons";
import {Typography} from "@material-ui/core";
import makeId from "../../../shared/services/makeId.service";
import {SearchMechanism} from "../../models/searchMechanism.model";

const cellStyle = {padding: "0px 5px"};

type SortOutput = -1|0|1;

function sortByKey(key:string, mech1:SearchMechanism, mech2:SearchMechanism):SortOutput{
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
    return function sortFunction(mech1:SearchMechanism, mech2:SearchMechanism):SortOutput{
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
    thirdSortClick: false,
    draggable: false
};


export default class ResultsTable extends React.Component <{mechanisms: SearchMechanism[], onMechanismsSelected: (mechanisms:SearchMechanism[])=>void},{}>{
    // shouldComponentUpdate(nextProps, nextState){
        // if (!nextProps.selectedMechanisms || !this.props.selectedMechanisms) return false;
        // return this.props.selectedMechanisms.length!==nextProps.selectedMechanisms.length;
        // return true;
    // }
    render(){
        console.log('ResultTable render event')
        // return <>{JSON.stringify(this.props.mechanisms)}</>
        return <MaterialTable
            columns={tableColumns}
            data={this.props.mechanisms}
            icons={tableIcons as any}
            title={<Typography>{this.props.mechanisms.length} mechanisms</Typography>}
            options={tableOptions}
            components={{Row: props => <MTableBodyRow {...props} id={`cy_results_${makeId(props.data.name)}`} />}}
            localization={localization}
            onSelectionChange={this.props.onMechanismsSelected}
        />;
    }
}