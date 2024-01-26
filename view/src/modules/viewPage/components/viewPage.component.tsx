import React from 'react';
import {ViewPageModel} from "../type/viewPage.types.ts";
import {MechanismActions as MechanismActionsComponent} from "../../actions/components/mechanismActions.component.tsx";
import {MechanismsPreview} from "../../preview/components/mechanismsPreview.component.tsx";
import {MechanismActions, SetFunction} from '@approvals/service'

export function ViewPage({viewPageModel, performAction}:{
	viewPageModel: ViewPageModel,
	performAction: SetFunction<MechanismActions>
}){
	return <>
		<MechanismActionsComponent viewPageModel={viewPageModel} performAction={performAction}/>
		<MechanismsPreview viewPageModel={viewPageModel}/>
	</>
}