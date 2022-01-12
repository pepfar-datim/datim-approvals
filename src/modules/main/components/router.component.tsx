import React from "react";
import {HashRouter, Route, Routes} from "react-router-dom";
import {Divider, Paper, Typography} from "@material-ui/core";

import List from "../../list/components/list.component";
import Action from "../../action/components/action.component";
import Loading from "../../shared/components/loading.component";

const styles = {
    root: {
        padding: 20,
        margin: 10
    }
};

const Redirect = ()=>{
    window.location.href = window.location.href+"#/search"
    return <Loading/>
}


export default function Router({postMessage}:{postMessage:(message:string, type?:string)=>void}){
    return(
        <Paper style={styles.root}>
            <Typography variant="h4" component="h2">
                DATIM Approvals
            </Typography>
            <HashRouter>
                <Divider/>
                <Routes>
                    <Route path="/" element={<Redirect/>}/>
                    <Route path="/search" element={<List/>} />
                    <Route path="/action" element={<Action postMessage={postMessage}/>} />
                </Routes>
            </HashRouter>
        </Paper>
    );
}
