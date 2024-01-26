import React from 'react';
import {Box, Button, Paper, styled, Typography} from "@mui/material";
import {Trigger} from "@approvals/service";

const Root = styled(Paper)(({ theme }) => ({
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary.main,
    marginTop: 16,
    padding: `6px 12px`
}));
export function Warning({message, buttonText, onClick}:{
    message: string,
    buttonText: string,
    onClick: Trigger
}){
	return <Root>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Typography>{message}</Typography>
            <Button onClick={onClick} variant={'contained'} color={'secondary'}>{buttonText}</Button>
        </Box>
    </Root>
}