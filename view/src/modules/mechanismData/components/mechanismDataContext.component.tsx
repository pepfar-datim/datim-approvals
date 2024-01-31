import React, {useEffect, useState} from 'react';
import {IdName, Mechanism} from '@approvals/service'
import {getDatasetList} from "../services/getDatasetList.service.ts";
import {ViewPageModel} from "../../viewPage/type/viewPage.types.ts";
import {MechanismData} from "./mechanismData.component.tsx";
import {LoadingData} from "./loadingData.component.tsx";
import {CannotShowData} from "../../preview/components/cannotShowData.component.tsx";
import {Config} from "../../../config/config.const.ts";

export function MechanismDataContext({selectedMechanism, viewPageModel}:{
    selectedMechanism: Mechanism|null
    viewPageModel: ViewPageModel,
}){
    const [datasetList, setDatasetList] = useState<IdName[]>(null)
    useEffect(()=>{
        const {workflow, period} = viewPageModel
        getDatasetList(workflow, period).then(setDatasetList)
    },[viewPageModel])
    if (!selectedMechanism&&viewPageModel.mechanisms.length>Config.maxMechanismCountForPreview) return <CannotShowData/>
    if (!datasetList) return <LoadingData/>
	return <MechanismData
        selectedMechanism={selectedMechanism}
        viewPageModel={viewPageModel}
        datasetList={datasetList}
    />
}