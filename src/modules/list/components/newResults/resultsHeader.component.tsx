import React, {CSSProperties} from "react";
import {TextField, Typography} from "@material-ui/core";

const styles = {
    root: {
        // float: 'right'
        display: 'flex',
        height: 48,
        justifyContent: 'space-between'
    } as CSSProperties,
    mechanismCount: {
        // lineHeight: '48px'
        paddingTop:19
    },
    input: {
        // margin: 'auto 0px auto auto'
    }
};

export function ResultsHeader({filterBy, setFilterBy, mechanismCount}:{filterBy:string, setFilterBy: (string)=>void, mechanismCount: number}) {
    return <div style={styles.root}>
        <Typography style={styles.mechanismCount}>{mechanismCount} mechanisms</Typography>
        <TextField label="Search" variant="standard" style={styles.input} value={filterBy||''} onChange={(v)=>setFilterBy(v.target.value)}/>
    </div>
}
