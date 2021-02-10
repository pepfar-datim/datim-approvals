import React from "react";
import {MechanismInfo as MechanismInfoModel, MechanismState} from "../../../shared/models/mechanism.model";
import {Table, TableBody, TableCell, TableRow} from "@material-ui/core";
import ShowMore from "./showMore.component";

export default function MechanismInfo({mechanismState, mechanismInfo}:{mechanismState: MechanismState, mechanismInfo: MechanismInfoModel}){
    if (!mechanismInfo || !mechanismState) return null;
    return(
            <Table size="small" className='cy_mechanismInfo'>
                <TableBody>
                    <TableRow>
                        <TableCell>Mech</TableCell>
                        <TableCell><ShowMore text={mechanismInfo.name}/></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>OU</TableCell>
                        <TableCell>{mechanismInfo.ou}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Agency</TableCell>
                        <TableCell>{mechanismInfo.agency}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Partner</TableCell>
                        <TableCell><ShowMore text={mechanismInfo.partner}/></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Status</TableCell>
                        <TableCell>{mechanismState.status}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
    );
}