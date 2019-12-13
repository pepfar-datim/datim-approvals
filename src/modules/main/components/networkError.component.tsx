import React from "react";
import {Divider, Paper, Typography} from "@material-ui/core";

const styles = {
    root: {
        maxWidth: 600,
        margin: `100px auto`
    }
};

export default function NetworkError(){
    return(
        <Paper style={styles.root}>
            <Typography variant="h5">Connection Error</Typography>
            <Divider/>
            <Typography>Cannot connect to DATIM</Typography>
            <br/>
            <Typography>Please check the following:</Typography>
            <ul>
                <li><Typography>You are still connected to the Internet</Typography></li>
                <li><Typography>You are still logged in into DATIM</Typography></li>
                <li><Typography>You have the rights to use Datim Approvals app</Typography></li>
            </ul>
            <Typography>If this problem persists, please contact DATIM support</Typography>
        </Paper>
    );
}