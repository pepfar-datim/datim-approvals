import React from 'react';
import {Typography} from "@mui/material";

const styles = {
	root: {
		paddingTop: 1,
	}
}
export function PleaseStart(){
	return <Typography color={'secondary'} sx={styles.root}>
        Please click Go to search.
	</Typography>
}