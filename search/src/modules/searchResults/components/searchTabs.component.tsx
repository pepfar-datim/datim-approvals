import React, {useState} from 'react';
import {SearchResultsComponent} from "./searchResults.compoment.tsx";
import {Badge, Box, Tab, Tabs, Typography} from "@mui/material";
import {Actions} from "../../actions/components/actions.component.tsx";
import {getActionIndex, getActionName} from "../../search/types/search.types.ts";
import {compare, Mechanism, MechanismActions, SearchResults, SelectedFilters} from '@approvals/service'

const styles = {
	tabs:{
		p: '8px 0px 12px',
	},
	tab:{
		borderBottom: '3px solid lightgray',
	},
	tabCount:{
		verticalAlign: 'super',
		fontSize: '12px',
		backgroundColor: '#2c6693',
		color: 'white',
		borderRadius: '10px',
		padding: '4px'
	},
	badge: {
		// paddingRight: 2,
	}
}

type Operation = {
	name:string;
	count:number;
}

function getOperations(mechanisms:Mechanism[]):Operation[]{
	return ['view', 'accept', 'submit', 'recall', 'return'].map(action=>{
		return {name:action, count:mechanisms.filter(({state})=>state.possibleActions[action]||action==='view').length}
	})
}

function getTabOffset(count:number):number{
	switch(count.toString().length){
		case 1:
			return -12
		case 2:
			return -16
		case 3:
			return -20
		case 4:
			return -22
	}
}

function getTabStyle(count:number){
	return {...styles.tab, borderColor: count>0?'lightgray':'rgb(235,235,235)'}
}

export function SearchTabs({selectedFilters, searchResults}:{
	selectedFilters: SelectedFilters,
	searchResults:SearchResults
}){
	const [selectedAction, setSelectedAction] = useState<MechanismActions>(MechanismActions.view)
	const [selectedMechanismIds, setSelectedMechanismIds] = useState<string[]>([])
	const operations:Operation[] = getOperations(searchResults.mechanisms)
	const filteredMechanisms = searchResults.mechanisms.filter(({state})=>state.possibleActions[selectedAction]||selectedAction===MechanismActions.view)

	function switchTab(e:React.SyntheticEvent, newValue: number){
		setSelectedAction(getActionName(newValue))
	}
	return <>
		<Actions
			filteredMechanisms={filteredMechanisms}
			selectedMechanismIds={selectedMechanismIds}
			setSelectedMechanismIds={setSelectedMechanismIds}
			selectedAction={selectedAction}
			selectedFilters={selectedFilters}
			disabled={!compare(selectedFilters, searchResults.selectedFilters)}
		/>
		<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
			<Tabs value={getActionIndex(selectedAction)} onChange={switchTab} sx={styles.tabs} variant={'fullWidth'}>
				{operations.map(({name, count})=><Tab label={<div>
					{name} {count>0&&<span style={styles.tabCount}>{count}</span>}
				</div>} key={name} sx={getTabStyle(count)} disabled={count===0}/>)}
			</Tabs>
		</Box>
		<SearchResultsComponent
			mechanisms={filteredMechanisms}
			selectedMechanismIds={selectedMechanismIds}
			setSelectedMechanisms={setSelectedMechanismIds}
		/>
	</>
}