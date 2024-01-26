import React from 'react';
import {Mechanism, SetFunction} from "@approvals/service";
import {getSelectedMechanisms} from "../services/getSelectedMechanisms.service.ts";
import {Warning} from "./warning.component.tsx";


const isDedupe = ({info:{mechanismName}})=>mechanismName.startsWith('00000')||mechanismName.startsWith('00001')

export function UnselectDedupe({filteredMechanisms, selectedMechanismIds, setSelectedMechanismIds}:{
    filteredMechanisms: Mechanism[],
    selectedMechanismIds: string[],
    setSelectedMechanismIds: SetFunction<string[]>
}){
    const dedupesSelected = getSelectedMechanisms(filteredMechanisms, selectedMechanismIds).some(isDedupe)
    function removeDedupes():void {
        setSelectedMechanismIds(selectedMechanismIds.filter((selectedMechId)=>!isDedupe(filteredMechanisms.find(({identifiers:{applicationId}})=>applicationId===selectedMechId))))
    }
    if (!dedupesSelected) return null;
    return <Warning message={'Dedupe mechanisms are selected.'} buttonText={'Unselect Dedupe mechanisms'} onClick={removeDedupes}/>
}