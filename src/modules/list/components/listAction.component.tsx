import React from 'react';
import {Button, Divider, Paper, Typography, withTheme} from "@material-ui/core";
import {Link} from "react-router-dom";
import MechanismModel from "../../shared/models/mechanism.model";
import {FloatProperty, PositionProperty} from 'csstype';
import {SearchRow} from "./results/resultsTable.component";


const styles = {
    infoText: {
        display: 'inline-block',
        marginLeft: 15
    },
    error: (theme)=>{return {
        backgroundColor: theme.palette.secondary.main,
        marginTop: 10,
        color: 'white',
        position: 'relative' as PositionProperty
    }},
    selectOnly: {
        float: 'right' as FloatProperty,
        color: 'white',
        position: 'absolute' as PositionProperty,
        right: 10,
        top: 4
    }
};

function checkMechanismStates(mechanisms: SearchRow[]):boolean {
    let firstStatus = mechanisms[0]._originalMechanism.state.status;
    return mechanisms.every(m=>m._originalMechanism.state.status===firstStatus);
}

function getMajorStatus(mechanisms: SearchRow[]):string{
    let statuses = mechanisms.map(mech=>mech._originalMechanism.state.status);
    let statusCounts = {};
    statuses.forEach(s=>{
        if (!statusCounts[s]) statusCounts[s] = 0;
        statusCounts[s]++;
    });
    let countedStatuses = Object.keys(statusCounts).map(status=>{return{status: status, count: statusCounts[status]}});
    function sortStatuses(s1, s2){
        return s2.count-s1.count;
    }
    return countedStatuses.sort(sortStatuses)[0].status;
}

function filterStatuses(onMechanismsSelected: (mechanisms:SearchRow[])=>any, mechanisms:SearchRow[], majorStatus:string):void{
    mechanisms.forEach(m=>{
        if (m._originalMechanism.state.status!==majorStatus) m.tableData.checked = false;
    })
    return onMechanismsSelected(mechanisms)
}

function sameStatusError({mechanisms, theme, onMechanismsSelected}:{mechanisms: SearchRow[], theme: any, onMechanismsSelected: (mechanisms:SearchRow[])=>any}){
    if (checkMechanismStates(mechanisms)) return null;
    let majorStatus:string = getMajorStatus(mechanisms);
    return <Paper style={styles.error(theme)}>
        <Button style={styles.selectOnly} id='cy_selectSingleStatus' onClick={()=>filterStatuses(onMechanismsSelected, mechanisms, majorStatus)}>Select {majorStatus} only</Button>
        <Typography>All selected mechanisms must have the same status to proceed.</Typography>
    </Paper>
}


function checkDedupMechanism(mechanisms: SearchRow[]):boolean {
    return mechanisms.some(m=>m._originalMechanism.info.name.startsWith('00000') || m._originalMechanism.info.name.startsWith('00001'));
}

function filterDedup(onMechanismsSelected: (mechanisms:SearchRow[])=>any, mechanisms:SearchRow[]):void{
    mechanisms.forEach(r=>{
        let m = r._originalMechanism;
        if(m.info.name.startsWith('00000') || m.info.name.startsWith('00001')) r.tableData.checked=false;
    })
    return onMechanismsSelected(mechanisms)
}

let SameStatusError = withTheme(sameStatusError);

function dedupSelected({mechanisms, theme, onMechanismsSelected}:{mechanisms: SearchRow[], theme: any, onMechanismsSelected: (mechanisms:SearchRow[])=>any}){
    if (!checkDedupMechanism(mechanisms)) return null;
    return <Paper style={styles.error(theme)}>
        <Button style={styles.selectOnly} id='cy_selectSingleStatus' onClick={()=>filterDedup(onMechanismsSelected, mechanisms)}>Unselect Dedupe mechanisms</Button>
        <Typography>Dedupe mechanisms are selected.</Typography>
    </Paper>
}

let DedupSelected = withTheme(dedupSelected);

export default function ListAction({selectedAction, selectedMechanisms, actionUrl, onMechanismsSelected}:{selectedAction: string, selectedMechanisms: SearchRow[], actionUrl: string, onMechanismsSelected: (mechanisms:SearchRow[])=>void}){
    if (!selectedAction || !selectedMechanisms || selectedMechanisms.length===0) return null;
    return <React.Fragment>
        <Link to={actionUrl}>
            <Button disabled={!checkMechanismStates(selectedMechanisms)} id='cy_list_mechanismAction' variant="contained" color="secondary">
                {selectedAction}
            </Button>
        </Link>
        <Typography style={styles.infoText}>{selectedMechanisms.length} selected mechanism(s)</Typography>
        <SameStatusError mechanisms={selectedMechanisms} onMechanismsSelected={onMechanismsSelected}/>
        <DedupSelected mechanisms={selectedMechanisms} onMechanismsSelected={onMechanismsSelected}/>
        <br/>
        <Divider/>
    </React.Fragment>;
}