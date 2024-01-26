import React, {useState} from 'react';
import {SelectDataset} from "./selectDataset.component.tsx";
import {ViewPageModel} from "../../viewPage/type/viewPage.types.ts";
import {IdName, Mechanism} from '@approvals/service'
import {DatasetPreviewContext} from "./datasetPreviewContext.component.tsx";
import {Divider} from "@mui/material";

export function MechanismData({selectedMechanism, viewPageModel:{mechanisms}, datasetList}:{
    selectedMechanism: Mechanism|null
    viewPageModel: ViewPageModel,
    datasetList: IdName[]
}){
    const [selectedDataset, setSelectedDataset] = useState<string>(datasetList[0].id)
	return <>
        <SelectDataset
            datasetList={datasetList}
            selectedDataset={selectedDataset}
            onDatasetSelect={setSelectedDataset}
        />
        <Divider/>
        <DatasetPreviewContext
            selectedDataset={selectedDataset}
            selectedMechanism={selectedMechanism}
            allMechanisms={mechanisms}
        />
	</>
}