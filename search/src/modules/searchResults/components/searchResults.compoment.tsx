import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Box, Divider} from '@mui/material';
import {useState} from "react";
import {ResultsFilter} from "./resultsFilter.component.tsx";
import {Status} from "./status.component.tsx";
import {ResultsPagination} from "./resultsPagination.component.tsx";
import {GridRowSelectionModel} from "@mui/x-data-grid/models/gridRowSelectionModel";
import {Mechanism, SetFunction} from "@approvals/service";
import {GridValueGetterParams} from "@mui/x-data-grid/models/params/gridCellParams";
import './searchResults.css'
import {PartnerField} from "./partnerField.component.tsx";

function compareMechanismNames(mechName1:string, mechName2:string):1|-1{
    return parseInt(mechName2)<parseInt(mechName1)?1:-1;
}

const getProperty = (property:string)=>(record: GridValueGetterParams<Mechanism, string>) => record.row.info[property]

const columns: GridColDef[] = [
    {
        field: 'info.mechanismName',
        headerName: 'Mechanism',
        valueGetter: getProperty('mechanismName'),
        sortComparator: compareMechanismNames,
        width: 310,
    },
    {
        field: 'info.ouName',
        headerName: 'OU',
        valueGetter: getProperty('ouName'),
        width: 100,
    },
    {
        field: 'agency',
        headerName: 'Agency',
        valueGetter: getProperty('agency'),
        width: 100,
    },
    {
        field: 'partner',
        headerName: 'Partner',
        valueGetter: getProperty('partnerName'),
        width: 170,
        renderCell:({value})=><PartnerField partnerName={value}/>
    },
    {
        field: 'state.approvalStatus',
        headerName: 'Status',
        width: 120,
        valueGetter: (record: GridValueGetterParams<Mechanism, string>) =>record.row.state.approvalStatus,
        renderCell: ({value}) => {
            return <Status status={value}/>
        }
    },
];

const styles = {
    box: { width: '100%' }
}

const tableStyle={
    '& .MuiDataGrid-cell': {
        whiteSpace: 'normal!important',
        lineHeight: '1.2!important',
    },
    '& .MuiDataGrid-row':{
    },
    '& .MuiDataGrid-virtualScrollerContent':{
        overflow: 'hidden'
    },
    '& .MuiDataGrid-columnHeaderTitleContainer':{
        padding: 0
    },
    '& .MuiDataGrid-columnSeparator':{
        visibility: 'visible!important'
    },
    border: 'none',
};

export function SearchResultsComponent({mechanisms, selectedMechanismIds, setSelectedMechanisms}:{
    mechanisms:Mechanism[],
    selectedMechanismIds: string[],
    setSelectedMechanisms: SetFunction<string[]>
}){
    const [filter, setFilter] = useState('')
    const filteredMechanisms:Mechanism[] = mechanisms.filter(({info, state:{approvalStatus}})=>{
        return Object.values({...info, approvalStatus}).some((value)=>{
            return value?.toLowerCase().includes(filter?.toLowerCase())
        })
    })
    return <>
        <ResultsFilter filter={filter} setFilter={setFilter} total={mechanisms.length}/>
        <Divider sx={{mt:0}}/>
        <Box sx={styles.box}>
            <DataGrid
                // Data
                rows={filteredMechanisms}
                columns={columns}
                getRowId={(row:Mechanism)=>row.identifiers.applicationId}


                // Style
                rowHeight={75}
                sx={tableStyle}

                // Sorting, Pagination
                sortingOrder={['asc', 'desc']}
                pageSizeOptions={[20,50, 100]}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 20,
                        },
                    },
                    sorting: {
                        sortModel: [
                            {field: 'info.mechanismName', sort: 'asc'},
                            {field: 'info.ouName', sort: 'asc'}
                        ]
                    }
                }}
                onPaginationModelChange={() => {
                    setTimeout(()=>window.scrollTo(0, 1e6),0)
                }}

                // Behavior
                checkboxSelection
                disableRowSelectionOnClick
                disableColumnMenu={true}
                slots={{
                    pagination: ResultsPagination
                }}


                // Height
                disableVirtualization={true}
                autoHeight={true}

                // Select
                rowSelectionModel={selectedMechanismIds}
                onRowSelectionModelChange={(rowSelectionModel: GridRowSelectionModel) => {
                    setSelectedMechanisms(rowSelectionModel as string[])
                }}
            />
        </Box>
    </>
}


