import React from "react";
import {HashRouter, Route, Redirect} from "react-router-dom";
import {Typography, Paper, Divider} from "@material-ui/core";
import queryString from "query-string";

import List from "../../list/components/list.component";
import Action from "../../action/components/action.component";
import {ApprovalsCombo} from "../../shared/models/mechanism.model";

const styles = {
    root: {
        padding: 20,
        margin: 10
    }
};

class urlParams {ou: string; workflow: string; period: string; approvalCombos: (string|string[])};


function getQueryParams(location):urlParams{
    return queryString.parse(location.search) as any;
}

function enforceArray(value:(string|string[])):string[]{
    if (typeof value === 'string') return [value];
    if (Array.isArray(value)) return value;
    throw Error("unknown type: expected string or array");
}

function assembleMechanismCombos(mechanisms: string[]):ApprovalsCombo[]{
    return mechanisms.map(mech=>{
        let [ou, cocId, coId] = mech.split(':');
        return {ou: ou, cocId: cocId, coId: coId};
    });
}

export default function Router({postMessage}:{postMessage:(message:string, type?:string)=>void}){
    return(
        <Paper style={styles.root}>
            <Typography variant="h4" component="h2">
                DATIM Approvals
            </Typography>
            <HashRouter>
                <Typography variant="h5" component="h2">
                    <Route path="/search" exact render={()=>'Mechanisms List'}/>
                </Typography>
                <Divider/>
                <Route path="/" exact render={({location})=><Redirect to={{
                    pathname: "/search",
                    search: location.search,
                }}/>}/>
                <Route path="/search" render={({location})=><List
                    urlSearchOptions={getQueryParams(location)}
                />} />
                <Route path="/action" render={({location})=><Action
                    approvalCombos={assembleMechanismCombos(enforceArray(getQueryParams(location).approvalCombos))}
                    workflow={getQueryParams(location).workflow}
                    period={getQueryParams(location).period}
                    postMessage={postMessage}
                />} />
            </HashRouter>
        </Paper>
    );
}
