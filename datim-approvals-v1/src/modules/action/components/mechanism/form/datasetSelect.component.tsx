import {FormControl} from "@material-ui/core";
import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export default function DatasetSelect({selectedDataset, onDsChange, datasets}){
    if (!datasets) return null;
    return <FormControl>
        <InputLabel htmlFor="dataset">Dataset</InputLabel>
        <Select
            value={selectedDataset.id}
            onChange={(event)=>onDsChange({id: event.target.value, name: event.target.name})}
            inputProps={{
                name: 'dataset',
                id: 'dataset',
            }}
        >
            {datasets.map(ds=><MenuItem value={ds.id} key={ds.id}>{ds.name}</MenuItem>)}
        </Select>
    </FormControl>
}
