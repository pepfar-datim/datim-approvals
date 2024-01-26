import React from 'react';
import {Table, TableBody, TableCell, TableRow} from "@mui/material";
import {Period} from "../../viewPage/type/viewPage.types.ts";

export function GroupMetadata({workflowName, period}:{workflowName:string, period:Period}){
	return <Table size="small">
            <TableBody>
                <TableRow>
                    <TableCell>Workflow</TableCell>
                    <TableCell>{workflowName}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Period</TableCell>
                    <TableCell>{period.name} {period.expired&&'(closed)'}</TableCell>
                </TableRow>
            </TableBody>
        </Table>

}