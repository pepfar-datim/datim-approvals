import * as React from 'react';
import {useState} from 'react';
import {DataGrid, GridInitialState} from '@mui/x-data-grid';
import {SearchMechanism} from "../../models/searchMechanism.model";
import {ResultsHeader} from "./resultsHeader.component";

const style={
    '& .MuiDataGrid-cell': {
        whiteSpace: 'normal',
        maxHeight: 'none!important',
        height: 'auto!important',
    },
    '& .MuiDataGrid-row':{
        maxHeight: 'none!important'
    },
    '& .MuiDataGrid-virtualScrollerContent':{
        overflow: 'hidden'
    },
    '& .MuiDataGrid-columnHeaderTitleContainer':{
        padding: 0
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
        width: 310,
        sortComparator: compareMechNames,
    }, {
        field: 'ou',
        headerName: 'OU',
        width: 100,
    }, {
        field: 'agency',
        headerName: 'Agency',
        width: 100,
    }, {
        field: 'partner',
        headerName: 'Partner',
        width: 180,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 170,
    }
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

function fixHeight(){
    setTimeout(()=>{
        let totalHeight = 0;
        document.querySelectorAll('.MuiDataGrid-row').forEach((r:any)=>totalHeight+=r.offsetHeight)
        document.querySelector('.MuiDataGrid-virtualScroller > div').setAttribute('style',`height:${totalHeight}px`)
    },1);
}

function hideColumn(){
    let lastColumn = document.querySelectorAll('.MuiDataGrid-cell:nth-child(6)');
    lastColumn.forEach(c=>c.setAttribute('style','display:none'))
}

const initialState:GridInitialState = {
    pagination: {pageSize:20},
    sorting: {
        sortModel: [{field: 'name', sort: 'asc'}]
    }
};

function CustomPagination() {
    return <p>pager</p>
}

export default function ResultsTable({mechanisms, onMechanismsSelected}:{mechanisms: SearchMechanism[], onMechanismsSelected: (mechanisms:SearchMechanism[])=>void,}) {
    let [filterBy, setFilterBy] = useState(null);
    let filteredMechanisms:SearchMechanism[] = mechanisms;
    if (filterBy && filterBy!=='') filteredMechanisms = filterMechanisms(filterBy, mechanisms);
    fixHeight();
    return <>
        <ResultsHeader filterBy={filterBy} setFilterBy={setFilterBy} mechanismCount={filteredMechanisms.length}/>
        <DataGrid
            initialState={initialState}
            onPageChange={fixHeight}
            onPageSizeChange={(newPageSize) => {
                fixHeight();
            }}
            disableVirtualization={true}
            rows={filteredMechanisms}
            columns={columns}
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
    /></>
}