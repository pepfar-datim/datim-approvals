import {Box, Divider, Skeleton, Stack} from '@mui/material';
import React from 'react';
import {repeat} from '@approvals/service'


export function Loading(){
	return <>
		<Box height={48} gap={1} alignItems={'center'} display={'flex'} flexDirection={'row'}>
			{repeat(5,<Skeleton width={90} height={32} variant={'rounded'} animation="wave" />)}
		</Box>
		<Divider/>
		<Box height={48} justifyContent={'space-between'} alignItems={'center'} display={'flex'} flexDirection={'row'}>
			<Skeleton width={114} height={24} variant={'rounded'} animation="wave"/>
			<Skeleton width={246} height={24} variant={'rounded'} animation="wave"/>
		</Box>
		<Stack spacing={1}>
			{repeat(10,<Box gap={1} flexDirection={'row'} display={'flex'} justifyContent={'flex-start'}>
				<Skeleton width={50} height={54} variant={'rounded'} animation="wave"/>
				<Skeleton width={310} height={54} variant={'rounded'} animation="wave"/>
				<Skeleton width={90} height={54} variant={'rounded'} animation="wave"/>
				<Skeleton width={90} height={54} variant={'rounded'} animation="wave"/>
				<Skeleton width={160} height={54} variant={'rounded'} animation="wave"/>
				<Skeleton width={120} height={54} variant={'rounded'} animation="wave"/>
			</Box>)}
		</Stack>
	</>
}