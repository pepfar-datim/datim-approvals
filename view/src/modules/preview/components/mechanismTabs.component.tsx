import React from 'react';
import {styled, Tab as MuiTab, Tabs, Typography} from "@mui/material";
import {Mechanism, SetFunction} from '@approvals/service'
import {TabProps} from "@mui/material/Tab/Tab";

function getTabIndex(selectedMechanism: Mechanism|null, mechanisms: Mechanism[]):number{
    if (mechanisms.length===1) return 0
    if(!selectedMechanism) return 0
    return mechanisms.indexOf(selectedMechanism)+1
}

function selectMechanism(mechanisms: Mechanism[], onMechanismSelect: SetFunction<Mechanism|null>){
    return (event: React.SyntheticEvent, newValue: number)=>{
        if(newValue===0) return onMechanismSelect(null)
        onMechanismSelect(mechanisms[newValue-1])
    }
}


const styles = {
    warning: {
        fontSize: '14px'
    }
}
const wrap = (text:string)=>text.length>80?text.slice(0,80)+'...':text

const Tab = styled(MuiTab)<TabProps>(()=>({
    fontSize: '0.85rem',
    textTransform: 'none'
}))
export function MechanismTabs({selectedMechanism, mechanisms, onMechanismSelect}:{
    selectedMechanism: Mechanism|null,
    mechanisms: Mechanism[],
    onMechanismSelect: SetFunction<Mechanism|null>,
}){
    const mechanismSubset = mechanisms.slice(0,30)
	return <Tabs
        value={getTabIndex(selectedMechanism, mechanisms)}
        onChange={selectMechanism(mechanisms,onMechanismSelect)} aria-label="basic tabs example"
        variant="scrollable"
    >
        {mechanisms.length>1&&<Tab label={'All mechanisms overview'} key={'all'} wrapped/>}
        {mechanismSubset.map(({info:{mechanismName}, identifiers:{applicationId}})=><Tab label={wrap(mechanismName)} key={applicationId} wrapped/>)}
        {mechanismSubset.length>30&&<Tab disabled wrapped label={<Typography color={'secondary'} sx={styles.warning}>Mechanism preview is limited to 30 mechanisms only</Typography>}/>}
    </Tabs>
}