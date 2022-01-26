import * as React from 'react';
import {DataGrid, GridSortModel} from '@mui/x-data-grid';
import {SearchMechanism} from "../../models/searchMechanism.model";
import {ResultsHeader} from "./resultsHeader.component";
import {useState} from "react";

const style={
    '& .MuiDataGrid-cell': {
        whiteSpace: 'normal'
    },
    border: 'none',
};

function compareMechNames(name1:string,name2:string):1|-1{
    let mech1Nr = parseInt(name1);
    let mech2Nr = parseInt(name2);
    return mech2Nr<mech1Nr?1:-1;
}

const columns = [
    {
        field: 'name',
        headerName: 'Mechanism',
        width: 320,
        sortComparator: compareMechNames,
    }, {
        field: 'ou',
        headerName: 'OU',
        width: 80,
    }, {
        field: 'agency',
        headerName: 'Agency',
        width: 80,
    }, {
        field: 'partner',
        headerName: 'Partner',
        width: 180,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 170,
    },
];

function updateSelection(mechanisms:SearchMechanism[], onMechanismsSelected: (mechanisms:SearchMechanism[])=>void){
    return (selectedIds)=>{
        mechanisms.forEach((m:SearchMechanism)=>{
            m.selected = selectedIds.includes(m.id)
        });
        onMechanismsSelected(mechanisms);
    }
}

function filterMechanisms(filterBy:string, mechanisms: SearchMechanism[]):SearchMechanism[]{
    return mechanisms.filter(m=>m.name.toLocaleLowerCase().includes(filterBy.toLocaleLowerCase()));
}

export default function ResultsTable({mechanisms, onMechanismsSelected}:{mechanisms: SearchMechanism[], onMechanismsSelected: (mechanisms:SearchMechanism[])=>void,}) {
    let [filterBy, setFilterBy] = useState(null);
    let filteredMechanisms:SearchMechanism[] = mechanisms;
    if (filterBy && filterBy!=='') filteredMechanisms = filterMechanisms(filterBy, mechanisms);
    const [sortModel, setSortModel] = React.useState<GridSortModel>([{
        field: 'name',
        sort: 'asc',
    }]);
    return <>
        <ResultsHeader filterBy={filterBy} setFilterBy={setFilterBy} mechanismCount={filteredMechanisms.length}/>
        <DataGrid
            rows={filteredMechanisms}
            columns={columns}
            pageSize={20}
            autoHeight={true}
            rowsPerPageOptions={[20,50,100]}
            checkboxSelection
            disableSelectionOnClick
            sx={style}
            rowHeight={59}
            disableColumnMenu={true}
            onSelectionModelChange={updateSelection(mechanisms,onMechanismsSelected)}
            sortingOrder={['asc', 'desc']}
            columnBuffer={20}
            sortModel={sortModel}
            onSortModelChange={setSortModel}
    /></>
}