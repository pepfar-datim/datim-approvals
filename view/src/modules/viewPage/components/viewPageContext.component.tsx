import React, {useEffect} from 'react';
import {getViewPageData} from "../services/getViewPageData.service.ts";
import {ViewPage} from "./viewPage.component.tsx";
import {Loading} from "./loading.component.tsx";
import {ViewPageModel} from "../type/viewPage.types.ts";
import {MechanismActions} from '@approvals/service'
import {sendApprovalAction} from "../services/sendApprovalAction.service.ts";

export function ViewPageContext({}:{}) {
	const [loading, setLoading] = React.useState<boolean>(true)
	const [viewPageData, setViewPageData] = React.useState<ViewPageModel>(null)
	useEffect(() => {
		getViewPageData().then(setViewPageData).finally(() => setLoading(false))
	}, [])
	async function performAction(action: MechanismActions):Promise<void>{
		setLoading(true)
		await sendApprovalAction(action, viewPageData)
		await getViewPageData().then(setViewPageData)
		setLoading(false)
	}
	// const loadSwitch = <button style={{position: 'fixed', top: 10, left: 10, display: 'none'}} onClick={() => setLoading(!loading)}>loading</button>
	if (loading) return <><Loading/></>
	return <>
		<ViewPage viewPageModel={viewPageData} performAction={performAction}/>
	</>
}