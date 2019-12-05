import React from "react";
import {Paper, Tab, Tabs, Typography} from "@material-ui/core";
import MechanismInfo from "./mechanismInfo.component";
import MechanismModel, {MechanismState} from "../../../shared/models/mechanism.model";
import FormSelect from "./form/formSelect.component";


function lengthWarning(mechanismsLength: number, clicks: number){
    if (mechanismsLength<=30) return null;
    if (clicks<8) return null;
    return <Typography color="secondary" align="center" style={{margin: 10, fontWeight: 500}}>
        Note: Mechanism preview is limited to 30 mechanisms only
    </Typography>;
}

export default function MechanismTabs({workflow, period, userOu, mechanisms, mechanismState}:{workflow: string, period: string, userOu: string, mechanisms: MechanismModel[], mechanismState: MechanismState}){
    const [openTab, setOpenTab] = React.useState(0);
    const [clicks, userClicked] = React.useState(0);
    if (!mechanisms[0].info) return null;
    return <Paper>
        <Tabs value={openTab} onChange={(event,tabIndex)=>setOpenTab(tabIndex)} variant="scrollable" onClick={()=>userClicked(clicks+1)}>
            {mechanisms.slice(0, 29).map(mechanism=><Tab label={mechanism.info.name} key={mechanism.meta.id}/>)}
        </Tabs>
        {lengthWarning(mechanisms.length, clicks)}
        <MechanismInfo mechanismState={mechanismState} mechanismInfo={mechanisms[openTab].info}/>
        <br/>
        <FormSelect workflow={workflow} period={period} userOu={userOu} mechanism={mechanisms[openTab].meta.id}/>
    </Paper>;
}