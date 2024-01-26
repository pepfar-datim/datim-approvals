import React from 'react';
import {Typography} from "@mui/material";

export function LimitedWarning(){
	return <Typography color={'secondary'} textAlign={'center'}>
        Note: Mechanism preview is limited to 30 mechanisms only
	</Typography>
}