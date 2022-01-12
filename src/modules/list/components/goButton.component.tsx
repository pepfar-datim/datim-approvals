import React, {CSSProperties, useState} from "react";
import {Button, CircularProgress, Tooltip} from "@material-ui/core";
import {Done} from "@material-ui/icons";
import {createTheme} from "@material-ui/core/styles";

const styles = {
    root: {marginTop: '15px', display: 'inline-block'} as any as CSSProperties
}

export default function GoButton({select}:{
    select: ()=>void
}) {
    return <div style={styles.root}>
        <Tooltip title={'Search'} placement="top-end">
            <div id='button'>
                <Button size='small' variant="contained" color="secondary" onClick={event=>select()} data-testid={'saveUser'} startIcon={<Done/>}>
                    Go
                </Button>
            </div>
        </Tooltip>
    </div>
}