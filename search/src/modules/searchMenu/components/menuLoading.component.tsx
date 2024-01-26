import React from 'react';
import {Box, Skeleton} from "@mui/material";

export function MenuLoading({}:{}){
    return <Box display={'flex'} flexDirection={'row'} gap={1}>
        <Skeleton width={200} height={45} variant={'rounded'} animation="wave"/>
        <Skeleton width={320} height={45} variant={'rounded'} animation="wave"/>
        <Skeleton width={200} height={45} variant={'rounded'} animation="wave"/>
        <Skeleton width={80} height={45} variant={'rounded'} animation="wave"/>
    </Box>
}