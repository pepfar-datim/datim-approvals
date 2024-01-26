import React from 'react';
import {Divider, LinearProgress, Paper, Skeleton, Stack} from "@mui/material";
import {repeat} from '@approvals/service'

function MetaRow(){
    return <Stack direction={'row'} gap={20}>
        <Skeleton height={24} width={80} variant={'rounded'}/>
        <Skeleton height={24} width={200} variant={'rounded'}/>
    </Stack>
}

function ActionsPreview(){
    return <Paper>
        <Skeleton height={36} width={222} variant={'rounded'}/>
        <Divider/>
        <Stack direction={'row'} display={'flex'} justifyContent={'space-evenly'}>
            {repeat(7, <Skeleton height={90} width={90} variant={'rounded'}/>)}
        </Stack>
        <Divider/>
        <MetaRow/>
        <Divider/>
        <MetaRow/>
    </Paper>
}

function InfoRow(){
    return <>
        <Stack direction={'row'} gap={20}>
            <Skeleton height={24} width={80} variant={'rounded'}/>
            <Skeleton height={24} width={200} variant={'rounded'}/>
        </Stack>
        <Divider/>
    </>
}

function MechanismDataPreview(){
    return <Paper sx={{mt:1, p:1}}>
        <Stack direction={'row'} display={'flex'} justifyContent={'space-evenly'}>
            {repeat(3, <Skeleton height={32} width={200} variant={'rounded'} sx={{m:2}}/>)}
        </Stack>
        {repeat(5, <InfoRow/>)}
    </Paper>
}
export function Loading(){
	return <>
        <LinearProgress/>
        <ActionsPreview/>
        <MechanismDataPreview/>
    </>
}