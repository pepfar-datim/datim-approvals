import React from 'react';
import {Link, Typography} from "@mui/material";

export function AllExpired({}:{}){
	return <Typography color={'secondary'}>
        There are no workflows active currently. <br/>
        The quarter is currently closed for data entry and will reopen at a later date, per the <Link href={'https://datim.zendesk.com/hc/en-us/articles/115001940503-PEPFAR-Data-Calendar'} target={'_blank'} color={'inherit'}>PEPFAR Data Calendar</Link>.<br/>
        If you receive this during an active data entry period, please contact <Link href={'https://datim.zendesk.com/'} target={'_blank'} color={'inherit'}>DATIM Support</Link>.
	</Typography>
}