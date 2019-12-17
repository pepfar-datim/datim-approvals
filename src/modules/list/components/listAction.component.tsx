import React from 'react';
import {Button, Divider, Typography, withTheme, Paper} from "@material-ui/core";
import {Link} from "react-router-dom";
import MechanismModel from "../../shared/models/mechanism.model";
import { FloatProperty, PositionProperty } from 'csstype';


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

function sameStatusError({mechanisms, theme}:{mechanisms: MechanismModel[], theme: any}){
    let majorStatus = '';
    if (checkMechanismStates(mechanisms)) return null;
    return <Paper style={styles.error(theme)}>
        <Button style={styles.selectOnly}>Select {majorStatus} only</Button>
        <Typography>All selected mechanisms must have the same status to proceed.</Typography>
    </Paper>
}

let SameStatusError = withTheme(sameStatusError);

export default function ListAction({selectedAction, selectedMechanisms, actionUrl}:{selectedAction: string, selectedMechanisms: MechanismModel[], actionUrl: string}){
    if (!selectedAction || !selectedMechanisms || selectedMechanisms.length===0) return null;
    return <React.Fragment>
        <Link to={actionUrl}>
            <Button disabled={!checkMechanismStates(selectedMechanisms)} id='cy_list_mechanismAction' variant="contained" color="secondary">
                {selectedAction}
            </Button>
        </Link>
        <Typography style={styles.infoText}>{selectedMechanisms.length} selected mechanism(s)</Typography>
        <SameStatusError mechanisms={selectedMechanisms}/>
        <br/>
        <Divider/>
    </React.Fragment>;
}