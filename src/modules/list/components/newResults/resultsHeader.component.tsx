import React, {CSSProperties} from "react";
import {IconButton, TextField, Typography} from "@material-ui/core";
import {Close, Search} from "@material-ui/icons";

const styles = {
    root: {
        display: 'flex',
        height: 48,
        justifyContent: 'space-between'
    } as CSSProperties,
    mechanismCount: {
        paddingTop:19
    },
    input: {
    },
    clear: {
        marginTop:11
    }
};

export function ResultsHeader({filterBy, setFilterBy, mechanismCount}:{filterBy:string, setFilterBy: (string)=>void, mechanismCount: number}) {
    return <div style={styles.root}>
        <Typography style={styles.mechanismCount}>{mechanismCount} mechanisms</Typography>
        <div>
            <TextField label={'Search'} variant="standard" style={styles.input} value={filterBy||''} onChange={(v)=>setFilterBy(v.target.value)} inputProps={{'data-testid':'listFilter'}}/>
            <IconButton style={styles.clear} onClick={(v)=>setFilterBy('')}>
                <Close/>
            </IconButton>
        </div>
    </div>
}
