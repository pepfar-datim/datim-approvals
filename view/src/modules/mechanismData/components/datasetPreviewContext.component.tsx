import React, {useEffect, useState} from 'react';
import {Webpage} from "../types/mechanismData.types.ts";
import {CircularProgress} from "@mui/material";
import {getDatasetWebpage} from "../services/getDatasetWebpage.service.ts";
import {Mechanism} from '@approvals/service'
import {DatasetPreview} from "./datasetPreview.component.tsx";

export function DatasetPreviewContext({selectedDataset, selectedMechanism, allMechanisms}:{
	selectedDataset: string,
	selectedMechanism: Mechanism,
	allMechanisms: Mechanism[]
}){
	const [datasetWebpage, setDatasetWebpage] = useState<Webpage>(null)
	const [loading, setLoading] = useState<boolean>(true)
	useEffect(()=>{
		getDatasetWebpage(selectedMechanism, allMechanisms, selectedDataset).then(setDatasetWebpage).finally(()=>setLoading(false))
	},[selectedDataset])
	if (loading) return <CircularProgress/>
	return <>
        <DatasetPreview webpage={datasetWebpage}/>
	</>
}