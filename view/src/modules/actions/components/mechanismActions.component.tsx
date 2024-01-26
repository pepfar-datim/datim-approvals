import React from 'react';
import {ViewPageModel} from "../../viewPage/type/viewPage.types.ts";
import {Box, Button, Divider, Paper, Stack} from "@mui/material";
import {Check, NorthEast, SouthWest} from "@mui/icons-material";
import {MechanismActions as Actions, PossibleActions, SetFunction, Trigger} from '@approvals/service'
import {ApprovalSteps} from "./approvalSteps.component.tsx";
import {GroupMetadata} from "./groupMetadata.component.tsx";
import {Back} from "./back.component.tsx";

function ActionButton({action, count, onClick}:{action: string, count: number, onClick: Trigger}){
    let icon = null
    switch(action){
        case 'accept':
            icon = <Check/>
            break;
        case 'submit':
            icon = <NorthEast/>
            break;
        case 'return':
        case 'recall':
            icon = <SouthWest/>
            break;
    }
    return <Button
        startIcon={icon}
        variant={'contained'}
        color={'secondary'}
        onClick={onClick}
    >
        {action} {count>1?count:''} mechanism{count>1?'s':''}
    </Button>
}

function ActionButtons({possibleActions, count, performAction}:{
    possibleActions: PossibleActions,
    count: number,
    performAction: SetFunction<Actions>
}) {
    return <Stack direction={'row'} gap={1} role={'toolbar'}>
        {Object.entries(possibleActions).filter(([action, allowed]) => allowed).map(([action]) => <ActionButton
            action={action}
            count={count}
            onClick={() => performAction(action as Actions)}
            key={action}/>
        )}
    </Stack>
}
export function MechanismActions({viewPageModel:{state, mechanisms, workflow, period}, performAction}:{
    viewPageModel: ViewPageModel,
    performAction: SetFunction<Actions>
}){
	return <Paper>
        <Box flexDirection={'row'} display={'flex'} justifyContent={'space-between'}>
            <ActionButtons
                possibleActions={state.possibleActions}
                count={mechanisms.length}
                performAction={performAction}
            />
            <Back/>
        </Box>
        <Divider />
        <br/>
        <ApprovalSteps state={state}/>
        <Divider/>
        <GroupMetadata workflowName={workflow.name} period={period}/>
	</Paper>
}