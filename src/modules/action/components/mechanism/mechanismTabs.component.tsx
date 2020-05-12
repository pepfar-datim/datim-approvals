import React from "react";
import {Paper, Tab, Tabs, Typography} from "@material-ui/core";
import MechanismInfo from "./mechanismInfo.component";
import MechanismModel, {MechanismState} from "../../../shared/models/mechanism.model";
import FormSelect from "./form/formSelect.component";
import Loading from "../../../shared/components/loading.component";
import { TextAlignProperty } from "csstype";

const styles = {
    datasetWarning: {
        textAlign: 'center' as TextAlignProperty,
        margin: '20px 0px',
        fontWeight: 500
    }
}

function lengthWarning(mechanismsLength: number, clicks: number){
    if (mechanismsLength<=30) return null;
    if (clicks<8) return null;
    return <Typography color="secondary" align="center" style={{margin: 10, fontWeight: 500}}>
        Note: Mechanism preview is limited to 30 mechanisms only
    </Typography>;
}

function renderOverviewTab(mechanismNr){
    if (mechanismNr>1) return <Tab label="All Mechanisms Overview" key={0}/>;
}

function renderMechanismInfo(openTab:number, workflow:string, period:string, userOu:string, mechanismState:MechanismState, mechanisms:MechanismModel[]){
    if (mechanisms.length>1 && openTab===0) return;
    if (mechanisms.length>1) openTab = openTab - 1;
    return <React.Fragment>
        <MechanismInfo mechanismState={mechanismState} mechanismInfo={mechanisms[openTab].info}/>
        <br/>
        <FormSelect workflow={workflow} period={period} userOu={userOu} mechanismMetas={[mechanisms[openTab].meta]}/>
    </React.Fragment>
}

function extractData(mechanisms: MechanismModel[], property: string){
    let [p1,p2] = property.split('.');
    let values = mechanisms.map(m=>m[p1][p2]).filter(s=>s);
    if (property==='info.name') values = values.map(v=>v.replace(/ - .+$/,'')).map(v=>parseInt(v))
    let uniqueValues = [...new Set(values)];
    return uniqueValues.sort().join(', ');
}

function renderMechanismOverview(openTab:number, workflow:string, period:string, userOu:string, mechanismState:MechanismState, mechanisms:MechanismModel[]) {
    if (mechanisms.length<=1 || openTab!==0) return;
    let aggregatedInfo = {
        name: extractData(mechanisms, 'info.name'),
        ou: extractData(mechanisms, 'info.ou'),
        agency: extractData(mechanisms, 'info.agency'),
        partner: extractData(mechanisms, 'info.partner'),
    };
    return <React.Fragment>
        <MechanismInfo mechanismState={mechanismState} mechanismInfo={aggregatedInfo}/>
        <br/>
        {mechanisms.length<=30
            ?<FormSelect workflow={workflow} period={period} userOu={userOu} mechanismMetas={mechanisms.map(m=>m.meta)}/>
            :<Typography color='secondary' style={styles.datasetWarning}>Data cannot be shown when more than 30 mechanisms are selected</Typography>}
    </React.Fragment>
}

export default function MechanismTabs({workflow, period, userOu, mechanisms, mechanismState}:{workflow: string, period: string, userOu: string, mechanisms: MechanismModel[], mechanismState: MechanismState}){
    const [openTab, setOpenTab] = React.useState(0);
    const [clicks, userClicked] = React.useState(0);
    if (!mechanisms[0].info) return <Loading message='Loading mechanism details...'/>;
    return <Paper>
        <Tabs value={openTab} onChange={(event,tabIndex)=>setOpenTab(tabIndex)} variant="scrollable" onClick={()=>userClicked(clicks+1)}>
            {renderOverviewTab(mechanisms.length)}
            {mechanisms.slice(0, 29).map(mechanism=><Tab label={mechanism.info.name} key={mechanism.meta.cocId}/>)}
        </Tabs>
        {lengthWarning(mechanisms.length, clicks)}
        {renderMechanismInfo(openTab, workflow, period, userOu, mechanismState, mechanisms)}
        {renderMechanismOverview(openTab, workflow, period, userOu, mechanismState, mechanisms)}
    </Paper>;
}