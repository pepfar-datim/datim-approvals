import React, {CSSProperties} from "react";
import {Button, Tooltip} from "@material-ui/core";
import {Done} from "@material-ui/icons";

const styles = {
    root: {marginTop: '15px', display: 'inline-block'} as any as CSSProperties
}

export default function GoButton({disabled, onClick}:{
    disabled,
    onClick: ()=>void
}) {
    return <div style={styles.root}>
        <Tooltip title={'Fetch mechanisms'} placement="top-end">
            <div id='button'>
                <Button size='small' variant="contained" color="primary" data-testid={`searchGo`} onClick={onClick} startIcon={<Done/>} disabled={disabled}>
                    Go
                </Button>
            </div>
        </Tooltip>
    </div>
}