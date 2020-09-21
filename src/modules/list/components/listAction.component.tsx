import React from 'react';
import {Button, Divider, Paper, Typography, withTheme} from "@material-ui/core";
import {Link} from "react-router-dom";
import MechanismModel from "../../shared/models/mechanism.model";
import {FloatProperty, PositionProperty} from 'csstype';


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

function checkMechanismStates(mechanisms: MechanismModel[]):boolean {
    let firstStatus = mechanisms[0].state.status;
    return mechanisms.every(m=>m.state.status===firstStatus);
}

function getMajorStatus(mechanisms: MechanismModel[]):string{
    let statuses = mechanisms.map(mech=>mech.state.status);
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

function filterStatuses(onMechanismsSelected: (mechanisms:MechanismModel[])=>any, mechanisms:MechanismModel[], majorStatus:string):void{
    return onMechanismsSelected(mechanisms.filter(m=>m.state.status===majorStatus))
}

function sameStatusError({mechanisms, theme, onMechanismsSelected}:{mechanisms: MechanismModel[], theme: any, onMechanismsSelected: (mechanisms:MechanismModel[])=>any}){
    if (checkMechanismStates(mechanisms)) return null;
    let majorStatus:string = getMajorStatus(mechanisms);
    return <Paper style={styles.error(theme)}>
        <Button style={styles.selectOnly} id='cy_selectSingleStatus' onClick={()=>filterStatuses(onMechanismsSelected, mechanisms, majorStatus)}>Select {majorStatus} only</Button>
        <Typography>All selected mechanisms must have the same status to proceed.</Typography>
    </Paper>
}

let SameStatusError = withTheme(sameStatusError);

export default function ListAction({selectedAction, selectedMechanisms, actionUrl, onMechanismsSelected}:{selectedAction: string, selectedMechanisms: MechanismModel[], actionUrl: string, onMechanismsSelected: (mechanisms:MechanismModel[])=>void}){
    if (!selectedAction || !selectedMechanisms || selectedMechanisms.length===0) return null;
    return <React.Fragment>
        <Link to={actionUrl}>
            <Button disabled={!checkMechanismStates(selectedMechanisms)} id='cy_list_mechanismAction' variant="contained" color="secondary">
                {selectedAction}
            </Button>
        </Link>
        <Typography style={styles.infoText}>{selectedMechanisms.length} selected mechanism(s)</Typography>
        <SameStatusError mechanisms={selectedMechanisms} onMechanismsSelected={onMechanismsSelected}/>
        <br/>
        <Divider/>
    </React.Fragment>;
}