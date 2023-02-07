import React from "react";
import {FormControl, InputLabel, MenuItem, Select, Typography} from "@material-ui/core";
import {idNameList} from "../../shared/models/idNameList.model";
import {SearchFilters} from "../models/filters.model";

const styles = {
    formControl: {
        marginRight: 20,
        minWidth: 160,
    },
    info: {
        marginTop: 10
    }
};

function renderInfo(selected: SearchFilters){
    if (!selected.ou) return <Typography color='secondary' style={styles.info}>Please specify Operating Unit</Typography>;
}

export default function FilterSelect({organisationUnits, workflows, periods, selected, select, disabled}:{
    organisationUnits:idNameList,
    workflows:idNameList,
    periods:idNameList,
    selected:SearchFilters,
    select:(property: string, value:string)=>void,
    disabled: boolean
}){
    if(!organisationUnits) return null;
    if (!selected.workflow) return null;
    return(
        <React.Fragment>
            <FormControl style={styles.formControl}>
                <InputLabel htmlFor="workflow">Workflow</InputLabel>
                <Select
                    inputProps={{
                        name: 'workflow',
                        id: 'workflow',
                    }}
                    data-testid={`filter_workflow`}
                    onChange={event=>select('workflow', event.target.value as string)}
                    value={selected.workflow || ''}
                    disabled={disabled}
                >
                    {workflows.map(wf=>
                        <MenuItem value={wf.id} key={wf.id}>{wf.name}</MenuItem>
                    )}
                </Select>
            </FormControl>
            <FormControl style={styles.formControl}>
                <InputLabel htmlFor="period">Period</InputLabel>
                <Select
                    inputProps={{
                        name: 'period',
                        id: 'period',
                        className: 'cy_list_periodSelect',
                    }}
                    data-testid={`filter_period`}
                    onChange={event=>select('period', event.target.value as string)}
                    value={selected.period || ''}
                    disabled={disabled}
                >
                    {periods.map(p=>
                        <MenuItem value={p.id} key={p.id}> { p.name.endsWith('(closed)')? <i>{p.name}</i>: p.name}</MenuItem>
                    )}
                </Select>
            </FormControl>
            <FormControl style={styles.formControl}>
                <InputLabel htmlFor="ou">Operating Unit</InputLabel>
                <Select
                    inputProps={{
                        name: 'ou',
                        id: 'ou',
                    }}
                    data-testid={`filter_ou`}
                    onChange={event=>select('ou', event.target.value as string)}
                    value={selected.ou || ''}
                    disabled={disabled}
                >
                    {organisationUnits.map(ou=>
                        <MenuItem value={ou.id} key={ou.id}>{ou.name}</MenuItem>
                    )}
                </Select>
            </FormControl>
            {renderInfo(selected)}
        </React.Fragment>
    );
}