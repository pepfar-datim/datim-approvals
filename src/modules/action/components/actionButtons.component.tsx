import React, {CSSProperties} from "react";
import Button from "@material-ui/core/Button/Button";
import {MechanismState} from "../../shared/models/mechanism.model";
import {Typography} from "@material-ui/core";

import {CallMade, CallReceived, Check} from '@material-ui/icons';

const styles = {
    back: {
        float: 'right',
        textDecoration: 'none'
    } as CSSProperties,
    infoText: {
        display: 'inline-block',
    },
    actionButton: {
        marginRight: 10
    },
    actionButtonIcon: {
        position: 'relative',
        left: -6
    } as CSSProperties
};

function ActionButtonIcon({action}:{action:string}){
    switch (action) {
        case 'submit': return <CallMade style={styles.actionButtonIcon}/>
        case 'return': return <CallReceived style={styles.actionButtonIcon}/>
        case 'recall': return <CallReceived style={styles.actionButtonIcon}/>
        case 'accept': return <Check style={styles.actionButtonIcon}/>
    }
    return null;
}

function renderButtons(actions:string[], mechanismsNr:number, performAction: (action: string)=>void){
    if (actions.length===0) return <Typography>No actions available with selected mechanisms</Typography>;
    else return actions.map(action=><Button variant="contained" color="secondary" onClick={()=>performAction(action)} key={action} style={styles.actionButton} data-testid={`actionButton_${action}`}>
        <ActionButtonIcon action={action}/>
        {action} {mechanismsNr>1?mechanismsNr:null} mechanism{mechanismsNr>1?'s':null}
    </Button>);
}

export default function ActionButtons({mechanismState, mechanismsNr, performAction}:{mechanismState: MechanismState, mechanismsNr: number, performAction: (action: string)=>void}){
    if (!mechanismState) return null;
    let actions = Object.keys(mechanismState.actions).filter(a=>mechanismState.actions[a]);
    return(
        <div>
            <Button style={styles.back} onClick={window.history.back} id="cy_actionPage_back">Back</Button>
            {renderButtons(actions, mechanismsNr, performAction)}
        </div>
    );
}
