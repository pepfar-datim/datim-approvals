import React from 'react';
import {ApprovalStatus, fromCamelCase} from '@approvals/service'

export function Status({status}:{status:ApprovalStatus}){
	return <>
        {fromCamelCase(status)}
	</>
}