import * as React from 'react';
import {useState} from 'react';
import {DataGrid, GridInitialState} from '@mui/x-data-grid';
import {SearchMechanism} from "../../models/searchMechanism.model";
import {ResultsHeader} from "./resultsHeader.component";
import { useTheme } from "@mui/material/styles";
// import MaterialTable, {MTableBodyRow,showFirstButton,showLastButton } from "material-table";
// import { TablePagination } from '@mui/material';

import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

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
        let totalHeight = 30;
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

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
      event: React.MouseEvent<HTMLButtonElement>,
      newPage: number
    ) => void;
  }

function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
          <IconButton
            onClick={handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="first page"
          >
            {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
          </IconButton>
          <IconButton
            onClick={handleBackButtonClick}
            disabled={page === 0}
            aria-label="previous page"
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </IconButton>
          <IconButton
            onClick={handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="next page"
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </IconButton>
          <IconButton
            onClick={handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="last page"
          >
            {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
          </IconButton>
        </Box>
      );
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
            componentsProps={{
                pagination: {
                  ActionsComponent: TablePaginationActions
                }
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