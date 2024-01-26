import React, {useEffect, useState} from 'react';
import {Webpage} from "../types/mechanismData.types.ts";
import {LoadingForm} from "./loadingForm.component.tsx";

function pause(ms:number):Promise<void>{
	return new Promise(resolve=>setTimeout(resolve, ms))
}

async function waitFor(condition:()=>boolean):Promise<void>{
	await pause(100)
	if (condition()) return
	await waitFor(condition)
}

export function DatasetPreview({webpage:{html, scripts}}:{webpage:Webpage}){
	const [loading, setLoading] = useState<boolean>(true)
	useEffect(()=>{
		if (!scripts||scripts.length===0) return setLoading(false)
		import('../staticJs/1.css.js')
		import("../staticJs/1.jquery.js").then(async (factory) => {
			await import("../staticJs/2.jqueryUi.js")
			await import("../staticJs/3.dhis.js")
			console.log(`Importing jQuery & DHIS2 scripts.`, `DHIS2 Initialization started`)
			// @ts-ignore
			await waitFor(() => window.dhis2 && window.dhis2.de)
			console.log(`DHIS2 initialization finished`, 'Importing custom DataSet scripts')
			scripts.forEach(script => {
				window.eval(script)
			})
			console.log(`DataSet scripts imported`, 'Importing final script')
			import('../staticJs/4.final.js').then(({trigger})=>trigger())
			await waitFor(() => !!document.getElementById('PEPFAR_main'))
			await waitFor(() => !document.getElementById('PEPFAR_main')?.getAttribute('style').includes('display:none'))
			setLoading(false)
		});
	},[html])

	return <>
		{loading&&<LoadingForm/>}
		<div dangerouslySetInnerHTML={{__html: html}}/>
		<div style={{clear: 'both'}}/>
	</>
}