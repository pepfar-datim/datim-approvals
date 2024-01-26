import React from 'react';
import {getHumanReadableStatus, MechanismState, WorkflowType} from '@approvals/service'
import {Step, StepLabel, Stepper} from "@mui/material";

const merSteps = [
	'pending at partner',
	'submitted by partner',
	'accepted by agency',
	'submitted by agency',
	'accepted by inter-agency',
	'submitted by inter-agency',
	'accepted by global'
];

const erSteps = [
	'pending at partner',
	'submitted by partner',
	'accepted by agency',
	'submitted by agency',
	'accepted by global agency',
	'submitted by global agency',
	'accepted by global'
];

export function ApprovalSteps({state:{workflowType, approvalStatus}}:{state:MechanismState}){
	let steps:string[];
	switch (workflowType){
		case WorkflowType.mer: steps = merSteps; break;
		case WorkflowType.er: steps = erSteps; break;
	}
	const currentStep:number = steps.indexOf(getHumanReadableStatus(approvalStatus));
	return <>
		<Stepper activeStep={currentStep} alternativeLabel>
			{steps.map((label) => (
				<Step key={label}>
					<StepLabel>{label}</StepLabel>
				</Step>
			))}
		</Stepper>
	</>
}