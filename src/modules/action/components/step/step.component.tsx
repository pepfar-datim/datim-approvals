import React from "react";
import {Stepper, StepLabel, makeStyles, Theme, createStyles, LinearProgress} from "@material-ui/core";
import MuiStep from "@material-ui/core/Step";
import {getWorkflowTypeById} from "../../../shared/services/workflowService";
import {MechanismState} from "../../../shared/models/mechanism.model";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '20px 0px 10px 0px',
        },
    }),
);

const merSteps = [
    'pending at partner',
    'submitted by partner',
    'accepted by agency',
    'submitted by agency',
    'accepted by inter-agency',
    'submitted by inter-agency',
    'accepted by global'
];

const erSteps = [
    'pending at partner',
    'submitted by partner',
    'accepted by agency',
    'submitted by agency',
    'accepted by agency hq',
    'submitted by agency hq',
    'accepted by global'
];

function getStepsByWorkflowType(workflowType: string){
    switch (workflowType){
        case 'MER': return merSteps;
        case 'ER': return erSteps;
        default: throw new Error('invalid user type');
    }
}

function getSteps(userType: string, workflowType: string):string[]{
    let lastStep;
    if (userType==='partner') lastStep = 'accepted by agency';
    if (userType==='agency' && workflowType==='MER') lastStep = 'accepted by inter-agency';
    if (userType==='agency' && workflowType==='ER') lastStep = 'accepted by agency hq';
    if (userType==='inter-agency' || userType==='agency hq') lastStep = 'accepted by global';
    if (userType==='global') lastStep = 'accepted by global';
    const steps = getStepsByWorkflowType(workflowType);
    return steps.slice(0,steps.indexOf(lastStep)+1);
}

function renderSteps(userType: string, workflowType: string){
    return getSteps(userType, workflowType).map(step=><MuiStep key={step}>
        <StepLabel>{step}</StepLabel>
    </MuiStep>)
}

function getStepNr(status: string, workflowType: string){
    return getStepsByWorkflowType(workflowType).indexOf(status);
}

export default function Step({workflow, mechanismState, userType}:{workflow: string, mechanismState: MechanismState, userType: string}){
    const classes = useStyles();
    if (!mechanismState) return <LinearProgress/>;
    if (!userType) return null;
    const workflowType = getWorkflowTypeById(workflow);
    return(
        <Stepper id='cy_actionPage_stepper' activeStep={getStepNr(mechanismState.status, workflowType)} alternativeLabel classes={{root:classes.root}}>
            {renderSteps(userType, workflowType)}
        </Stepper>
    );
}