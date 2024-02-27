import React from 'react';
import {ApprovalStatus, getHumanReadableStatus, MechanismInfo} from '@approvals/service'
import {Table, TableBody, TableCell, TableRow} from "@mui/material";
import {ShowMore} from "./showMore.component.tsx";

function Row({label, value}:{label: string, value: string}){
    return <TableRow>
        <TableCell>{label}</TableCell>
        <TableCell><ShowMore text={value}/></TableCell>
    </TableRow>
}

export function MechanismInfo({info:{mechanismName, ouName, agency, partnerName}}:{info: MechanismInfo}){
    const data = {
        Mech: mechanismName,
        OU: ouName,
        Agency: agency,
        Partner: partnerName,
    }
	return <Table size={'small'}>
        <TableBody>
            {Object.entries(data).map(([label, value])=><Row label={label} value={value} key={label}/>)}
        </TableBody>
	</Table>
}