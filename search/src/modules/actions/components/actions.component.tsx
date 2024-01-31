import React from 'react';
import {Box, Button, Divider, Typography} from "@mui/material";
import {UnselectDedupe} from "./unselectDedupe.component.tsx";
import {Mechanism, MechanismActions, SelectedFilters, SetFunction} from "@approvals/service";
import {getSelectedMechanisms} from "../services/getSelectedMechanisms.service.ts";
import {SameStatus} from "./sameStatus.components.tsx";
import {areSameStatus} from "../services/areSameStatus.service.ts";
import {getActionPageUrlService} from "../services/getActionPageUrl.service.ts";

function getActionUrl({ouId, workflow, period}: SelectedFilters, allMechanisms:Mechanism[], selectedMechanismIds: string[]):string{
    const selectedMechanisms:Mechanism[] = getSelectedMechanisms(allMechanisms, selectedMechanismIds)
    const mechanisms:string = selectedMechanisms.map(({identifiers:{approvalsId, categoryOptionCombinationId}, selectedFilters:{ouId}})=>`${ouId}.${approvalsId}.${categoryOptionCombinationId}`).join('_')
    return `${getActionPageUrlService()}#selectedFilters=${period}.${workflow}.${ouId}&mechanisms=${mechanisms}`
}

export function Actions({filteredMechanisms, selectedMechanismIds, setSelectedMechanismIds, selectedAction, selectedFilters, disabled}:{
    filteredMechanisms: Mechanism[],
    selectedMechanismIds: string[],
    setSelectedMechanismIds: SetFunction<string[]>,
    selectedAction: MechanismActions,
    selectedFilters: SelectedFilters,
    disabled: boolean
}){
    if (selectedMechanismIds.length===0) return null;
    const sameStatus = areSameStatus(getSelectedMechanisms(filteredMechanisms, selectedMechanismIds))
	return <>
        <Box display={'flex'} alignItems={'center'} gap={2}>
            <Button variant={'contained'} color={'secondary'} href={getActionUrl(selectedFilters, filteredMechanisms, selectedMechanismIds)} disabled={!sameStatus || disabled} data-testid={`action`}> {selectedAction}</Button>
            <Typography>{selectedMechanismIds.length} selected mechanism{selectedMechanismIds.length>1&&'s'}</Typography>
        </Box>
        <SameStatus filteredMechanisms={filteredMechanisms} selectedMechanismIds={selectedMechanismIds} setSelectedMechanismIds={setSelectedMechanismIds}/>
        <UnselectDedupe filteredMechanisms={filteredMechanisms} selectedMechanismIds={selectedMechanismIds} setSelectedMechanismIds={setSelectedMechanismIds}/>
        <Divider/>
    </>
}