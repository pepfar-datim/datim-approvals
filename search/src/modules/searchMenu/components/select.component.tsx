import React from 'react';
import {FormControl, InputLabel, MenuItem, Select as MuiSelect} from '@mui/material'
import {IdName, SetFunction} from "@approvals/service";
import {Period as PeriodType} from "../../search/types/search.types.ts";

const styles = {
    closedPeriod: {
        fontStyle: 'italic'
    },
    select: {
        minWidth:{
            md: '200px'
        }
    }
}
export function Select({name, selectedValue, values, onChange}:{
    name: string,
    selectedValue: string,
    values: IdName[],
    onChange:SetFunction<string>
}){
    if (!values.map(({id})=>id).includes(selectedValue)) return null;
	return <FormControl variant={'standard'} size="small">
        <InputLabel>{name}</InputLabel>
        <MuiSelect
            value={selectedValue}
            label={name}
            data-testid={`select ${name}`}
            inputProps={{'data-testid':`input ${name}`}}
            onChange={event=>onChange(event.target.value)}
            sx={styles.select}
            // className={'select'}
        >
            {values.map((item)=><MenuItem value={item.id} key={item.id}>
                {name==='Period'?<Period periodInfo={item as PeriodType}/>:item.name}
            </MenuItem>)}
        </MuiSelect>
    </FormControl>
}

function Period({periodInfo}:{periodInfo:PeriodType}){
    const {name, expired} = periodInfo
    if (!expired) return <>{name}</>
    return <span style={styles.closedPeriod}>
        {name}
        {expired&&<> (closed)</>}
    </span>
}