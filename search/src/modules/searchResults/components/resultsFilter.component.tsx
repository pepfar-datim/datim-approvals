import React from 'react';
import {SetFunction} from "@approvals/service";
import {Box, IconButton, TextField, Typography} from "@mui/material";
import {Close} from "@mui/icons-material";

const styles = {
    searchBar: {
        position: 'relative',
        top: -10,
        '& [data-shrink="true"].MuiFormLabel-root':{
            top: '10px',
        }
    },
}


export function ResultsFilter({filter, setFilter, total}:{
    filter:string,
    setFilter: SetFunction<string>,
    total: number
}){
	return <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography>{total} mechanisms</Typography>
        <Box display={'flex'} alignItems={'center'}>
            <TextField label="Search" variant="standard" value={filter} onChange={(event)=>setFilter(event.target.value)} sx={styles.searchBar}/>
            <IconButton onClick={()=>setFilter('')}>
                <Close/>
            </IconButton>
        </Box>
	</Box>
}