import React from 'react';
import {Skeleton} from "@mui/material";

export function LoadingData(){
	return <>
        <Skeleton variant="rounded" width={360} height={36} />
	</>
}