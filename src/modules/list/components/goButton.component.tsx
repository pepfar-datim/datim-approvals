import React, {CSSProperties} from "react";
import {Button, Tooltip} from "@material-ui/core";
import {Done} from "@material-ui/icons";

const styles = {
    root: {marginTop: '15px', display: 'inline-block'} as any as CSSProperties
}

export default function GoButton({onClick}:{
    onClick: ()=>void
}) {
    return <div style={styles.root}>
        <Tooltip title={'Fetch mechanisms'} placement="top-end">
            <div id='button'>
                <Button size='small' variant="contained" color="secondary" onClick={onClick} startIcon={<Done/>}>
                    Go
                </Button>
            </div>
        </Tooltip>
    </div>
}