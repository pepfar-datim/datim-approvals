import React, {CSSProperties} from "react";
import {Button, Tooltip} from "@material-ui/core";
import {HighlightOff} from "@material-ui/icons";

const styles = {
    root: {marginTop: '15px', display: 'inline-block'} as any as CSSProperties
}

export default function StopButton({disabled, onClick}:{
    disabled,
    onClick: ()=>void
}) {
    return <div style={styles.root}>
        <Tooltip title={'Stop'} placement="top-end">
            <div id='button'>
                <Button size='small' variant="contained" color="secondary" data-testid={`searchGo`} onClick={onClick} startIcon={<HighlightOff/>} disabled={disabled}>
                    Stop
                </Button>
            </div>
        </Tooltip>
    </div>
}