import {Mechanism} from '@approvals/service'

export function getSelectedMechanisms(allMechanisms: Mechanism[], selectedMechanismIds: string[]):Mechanism[] {
    return allMechanisms.filter(({identifiers:{applicationId}})=>selectedMechanismIds.includes(applicationId))
}