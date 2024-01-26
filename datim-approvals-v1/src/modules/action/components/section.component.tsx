import React from 'react';
import {Chip, Divider, Paper} from "@material-ui/core";

export default function Section({title, id, children}:{title:string, id?:string, children:any}) {
    return <Paper id={id}>
        <Chip label={title} color={'primary'}/>
        <Divider/>
        {children}
    </Paper>;
}