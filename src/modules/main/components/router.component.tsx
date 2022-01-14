import React from "react";
import {HashRouter, Route, Routes} from "react-router-dom";
import {Divider, Paper, Typography} from "@material-ui/core";

import List from "../../list/components/list.component";
import Action from "../../action/components/action.component";

const styles = {
    root: {
        padding: 20,
        margin: 10
    }
};

export default function Router(){
    return <Paper style={styles.root}>
        <Typography variant="h4" component="h2">
            DATIM Approvals
        </Typography>
        <HashRouter>
            <Divider/>
            <Routes>
                <Route path="/" element={<List/>} />
                <Route path="/search" element={<List/>} />
                <Route path="/action" element={<Action/>}/>
            </Routes>
        </HashRouter>
    </Paper>
}
