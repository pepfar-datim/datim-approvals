import React, {CSSProperties} from 'react';
import {LinearProgress, Typography} from "@material-ui/core";

const styles = {
    message: {
        textAlign: 'center'
    } as CSSProperties
};

export default function Loading({message}:{message?:string}) {
    return <React.Fragment>
        <LinearProgress/>
        <br/>
        <Typography className='cy_loading' color="primary" style={styles.message} data-testid='loading'>{message}</Typography>
    </React.Fragment>;
}