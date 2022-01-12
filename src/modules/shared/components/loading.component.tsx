import React from 'react';
import {LinearProgress, Typography} from "@material-ui/core";
import {TextAlignProperty} from 'csstype';

const styles = {
    message: {
        textAlign: 'center' as TextAlignProperty
    }
};

export default function Loading({message}:{message?:string}) {
    return <React.Fragment>
        <LinearProgress/>
        <br/>
        <Typography className='cy_loading' color="primary" style={styles.message} data-testid='loading'>{message}</Typography>
    </React.Fragment>;
}