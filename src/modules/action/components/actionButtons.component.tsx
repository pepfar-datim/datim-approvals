import React from "react";
import Button from "@material-ui/core/Button/Button";
import {withRouter} from "react-router-dom";
import {MechanismState} from "../../shared/models/mechanism.model";
import {Typography} from "@material-ui/core";

const styles = {
    back: {
        float: 'right',
        textDecoration: 'none'
    },
    infoText: {
        display: 'inline-block',
    },
    actionButton: {
        marginRight: 10
    }
};

function renderButtons(actions:string[], mechanismsNr:number, performAction: (action: string)=>void){
    if (actions.length===0) return <Typography>No actions available with selected mechanisms</Typography>;
    else return actions.map(action=><Button variant="contained" color="secondary" onClick={()=>performAction(action)} id={`cy_mechanismAction_${action}`} key={action} style={styles.actionButton}>
        {action} {mechanismsNr>1?mechanismsNr:null} mechanism{mechanismsNr>1?'s':null}
    </Button>);
}

function ActionButtons({mechanismState, mechanismsNr, performAction, history}:{mechanismState: MechanismState, mechanismsNr: number, performAction: (action: string)=>void, history: any}){
    if (!mechanismState) return null;
    let actions = Object.keys(mechanismState.actions).filter(a=>mechanismState.actions[a]);
    return(
        <div id='cy_mechanismActions'>
            <Button style={styles.back as any} onClick={history.goBack} id="cy_actionPage_back">Back</Button>
            {renderButtons(actions, mechanismsNr, performAction)}
        </div>
    );
}

export default withRouter(ActionButtons);