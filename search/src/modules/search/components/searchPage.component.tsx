import {useEffect, useState} from "react";
import {Menu} from "../../searchMenu/components/menu.component.tsx";
import {MenuOptions} from "../types/search.types.ts";
import {Loading} from "./loading.component.tsx";
import {Divider} from "@mui/material";
import {PleaseStart} from "./pleaseStart.conponent.tsx";
import {SearchTabs} from "../../searchResults/components/searchTabs.component.tsx";
import {searchMechanisms, SearchResults, SelectedFilters} from '@approvals/service'

const canceledSearch = []
export function SearchPage({defaultFilters, menuOptions}:{
	defaultFilters: SelectedFilters,
	menuOptions:MenuOptions
}){
	const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>(defaultFilters)
	const [searchResults, setSearchResults] = useState<SearchResults>(null)
	const [loading, setLoading] = useState<boolean>(false)
	useEffect(()=>{
		if (window.location.search) triggerSearch()
		// else if (menuOptions.ouList.length===1) triggerSearch()

	},[])
	function cancelSearch() {
		canceledSearch.push(JSON.stringify(selectedFilters))
		setLoading(false)
		setSearchResults(undefined)
	}
	async function triggerSearch():Promise<void> {
		setLoading(true)
		const searchResults = await searchMechanisms(selectedFilters)
		if (canceledSearch.includes(JSON.stringify(searchResults.selectedFilters))) return
		setSearchResults(searchResults)
		setLoading(false)
		window.history.pushState(null, null, '?'+new URLSearchParams(selectedFilters))
	}
	function updateFilters(newFilters:SelectedFilters):void {
		if (newFilters.workflow!==selectedFilters.workflow) newFilters.period = menuOptions.workflows.find(w=>w.id===newFilters.workflow).periods[0].id;
		setSelectedFilters(newFilters)
	}
	function renderContent() {
		if (!loading&&!searchResults) return <PleaseStart/>
		if (loading) return <Loading/>
		if (searchResults) return <>
			<SearchTabs
				searchResults={searchResults}
				selectedFilters={selectedFilters}
			/>
		</>
	}
	return <>
		<Menu
			selectedFilters={selectedFilters}
			updateFilters={updateFilters}
			menuOptions={menuOptions}
			triggerSearch={triggerSearch}
			cancelSearch={cancelSearch}
			loading={loading}
		/>
		<Divider/>
		{renderContent()}
	</>
}