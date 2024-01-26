import React from 'react';
import {Skeleton} from "@mui/material";
import {repeat} from '@approvals/service'

export function LoadingForm(){
	return <>
        {repeat(10,<Skeleton height={30}/>)}
    </>
}