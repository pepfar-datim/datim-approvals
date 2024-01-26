import React from 'react';
import {Warning} from "./warning.component.tsx";
import {ApprovalStatus, fromCamelCase, Mechanism, SetFunction} from "@approvals/service";
import {areSameStatus} from "../services/areSameStatus.service.ts";
import {getSelectedMechanisms} from "../services/getSelectedMechanisms.service.ts";
import {getMainStatus} from "../services/getMainStatus.service.ts";

export function SameStatus({filteredMechanisms, selectedMechanismIds, setSelectedMechanismIds}:{
    filteredMechanisms: Mechanism[],
    selectedMechanismIds: string[],
    setSelectedMechanismIds: SetFunction<string[]>
}){
    const selectedMechanisms = getSelectedMechanisms(filteredMechanisms, selectedMechanismIds)
    const sameStatus = areSameStatus(selectedMechanisms)
    if (sameStatus) return null
    const mainStatus: ApprovalStatus = getMainStatus(selectedMechanisms)
    function selectMainStatus():void {
        const correctStatusMechanisms = selectedMechanisms.filter(({state:{approvalStatus}})=>approvalStatus===mainStatus)
        setSelectedMechanismIds(correctStatusMechanisms.map(({identifiers:{applicationId}})=>applicationId))
    }
	return <Warning
        message={'All selected mechanisms must have the same status to proceed.'}
        buttonText={`Select ${fromCamelCase(mainStatus)} only`}
        onClick={selectMainStatus}
    />
}