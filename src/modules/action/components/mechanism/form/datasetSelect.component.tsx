import {FormControl} from "@material-ui/core";
import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import makeId from "../../../../shared/services/makeId.service";

export default function DatasetSelect({selectedDataset, onDsChange, datasets}){
    if (!datasets) return null;
    return <FormControl>
        <InputLabel htmlFor="dataset">Dataset</InputLabel>
        <Select
            id='cy_formSelect_input'
            value={selectedDataset.id}
            onChange={(event)=>onDsChange({id: event.target.value, name: event.target.name})}
            inputProps={{
                name: 'dataset',
                id: 'dataset',
            }}
        >
            {datasets.map(ds=><MenuItem value={ds.id} key={ds.id} id={`cy_formSelect_dataset_${makeId(ds.name)}`}>{ds.name}</MenuItem>)}
        </Select>
    </FormControl>
}
