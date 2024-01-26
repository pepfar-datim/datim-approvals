import React from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {IdName, SetFunction} from '@approvals/service'

export function SelectDataset({selectedDataset, datasetList, onDatasetSelect}:{
    selectedDataset: string,
    datasetList: IdName[],
    onDatasetSelect: SetFunction<string>
}){
	return <FormControl size={'small'} variant={'standard'}>
        <InputLabel>Dataset</InputLabel>
        <Select
            value={selectedDataset}
            label="Dataset"
            onChange={(e)=>onDatasetSelect(e.target.value as string)}
        >
            {datasetList.map(({id, name})=><MenuItem value={id} key={id}>{name}</MenuItem>)}
        </Select>
    </FormControl>
}