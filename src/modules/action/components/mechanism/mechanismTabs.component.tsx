import React from "react";
import {Paper, Tab, Tabs} from "@material-ui/core";
import MechanismInfo from "./mechanismInfo.component";
import MechanismModel, {MechanismState} from "../../../shared/models/mechanism.model";
import FormSelect from "./form/formSelect.component";

export default function MechanismTabs({workflow, period, userOu, mechanisms, mechanismState}:{workflow: string, period: string, userOu: string, mechanisms: MechanismModel[], mechanismState: MechanismState}){
    const [openTab, setOpenTab] = React.useState(0);
    if (!mechanisms[0].info) return null;
    return <Paper>
        <Tabs value={openTab} onChange={(event,tabIndex)=>setOpenTab(tabIndex)}>
            {mechanisms.map(mechanism=><Tab label={mechanism.info.name} key={mechanism.meta.id}/>)}
        </Tabs>
        <MechanismInfo mechanismState={mechanismState} mechanismInfo={mechanisms[openTab].info}/>
        <br/>
        <FormSelect workflow={workflow} period={period} userOu={userOu} mechanism={mechanisms[openTab].meta.id}/>
    </Paper>;
}