import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {SearchMechanism} from "../../models/searchMechanism.model";

const tableColumns = [
    // {title: "Mechanism", field: "name", cellStyle: cellStyle, defaultSort: "asc" as ('asc' | 'desc'), customSort: sortFactory('name','ou')},
    // {title: "OU", field: "ou", cellStyle: cellStyle, defaultSort: "asc" as ('asc' | 'desc'), customSort: sortFactory('ou','name')},
    // {title: "Agency", field: "agency", cellStyle: cellStyle, defaultSort: "asc" as ('asc' | 'desc'), customSort: sortFactory('agency','name')},
    // {title: "Partner", field: "partner", cellStyle: cellStyle, customSort: sortFactory('partner','name')},
    // {title: "Status", field: "status", cellStyle: cellStyle, customSort: sortFactory('status','name')},
];

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
        sortComparator: compareMechNames
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
        // type: 'number',
        width: 180,
    },
    {
        field: 'status',
        headerName: 'Status',
        // sortable: false,
        width: 170,
        // valueGetter: (params) =>
        //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

export default function NewResultsTable({mechanisms}:{mechanisms: SearchMechanism[]}) {
    return <DataGrid
        rows={mechanisms}
        columns={columns}
        pageSize={20}
        autoHeight={true}
        rowsPerPageOptions={[20,50,100]}
        checkboxSelection
        disableSelectionOnClick
        sx={style}
        rowHeight={59}
        disableColumnMenu={true}
        // density={'compact'}
    />
}