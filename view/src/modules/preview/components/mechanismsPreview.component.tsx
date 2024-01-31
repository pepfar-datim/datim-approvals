import React from 'react';
import {Mechanism} from '@approvals/service'
import {MechanismTabs} from "./mechanismTabs.component.tsx";
import {MechanismInfo} from "./mechanismInfo.component.tsx";
import {getAggregateInfo} from "../services/getAggregateInfo.service.ts";
import {Divider, Paper} from "@mui/material";
import {MechanismDataContext} from "../../mechanismData/components/mechanismDataContext.component.tsx";
import {ViewPageModel} from "../../viewPage/type/viewPage.types.ts";

const styles = {
    root: {
        mt:1,
        p:1
    }
}
export function MechanismsPreview({viewPageModel}:{viewPageModel: ViewPageModel}){
    const [selectedMechanism, setSelectedMechanism] = React.useState<Mechanism|null>(viewPageModel.mechanisms.length===1?viewPageModel.mechanisms[0]:null)
    const {mechanisms, state} = viewPageModel
    const info = selectedMechanism ? selectedMechanism?.info : getAggregateInfo(mechanisms.map(({info})=>info))
    return<>
        <Paper>
            <MechanismTabs
                selectedMechanism={selectedMechanism}
                mechanisms={mechanisms}
                onMechanismSelect={setSelectedMechanism}
            />
            <Divider sx={{m:0}}/>
            <MechanismInfo info={info} status={state.approvalStatus}/>
        </Paper>
        <Paper>
            <MechanismDataContext viewPageModel={viewPageModel} selectedMechanism={selectedMechanism}/>
        </Paper>
    </>
}