export class MechanismInfo {
    ou: string;
    agency: string;
    partner: string;
    name: string;
}

export class MechanismActions {
    submit?: boolean;
    recall?: boolean;
    return?: boolean;
    accept?: boolean;
}

export class MechanismState {
    status: string;
    view: boolean;
    actions: MechanismActions;
}

export class MechanismMeta {
    cocId: string;
    workflow: string;
    period: string;
    ou: string;
}

export default class MechanismModel{
    info?: MechanismInfo;
    state?: MechanismState;
    meta?: MechanismMeta;
}

export class ApprovalsCombo{
    cocId: string;
    ou: string;
}