import {Check, Close} from "@mui/icons-material";
import {Box, Button} from "@mui/material";
import {Select} from "./select.component.tsx";
import {MenuOptions} from "../../search/types/search.types.ts";
import "./menu.style.css"
import {SelectedFilters, SetFunction, Trigger} from "@approvals/service";

export function Menu({selectedFilters, updateFilters, menuOptions, triggerSearch, cancelSearch, loading}:{
	selectedFilters:SelectedFilters
	updateFilters: SetFunction<SelectedFilters>
	menuOptions: MenuOptions,
	triggerSearch: Trigger,
	cancelSearch: Trigger,
	loading: boolean
}){
	const {ouList, workflows} = menuOptions;
	return <Box display={'flex'} gap={1} alignItems={'center'} role={'menu'}>
		<Select
			name={'Workflow'}
			selectedValue={selectedFilters.workflow}
			values={workflows}
			onChange={workflow=>updateFilters({...selectedFilters, workflow})}
		/>
		<Select
			name={'Period'}
			selectedValue={selectedFilters.period}
			values={workflows.find(w=>w.id===selectedFilters.workflow).periods}
			onChange={period=>updateFilters({...selectedFilters, period})}
		/>
		<Select
			name={'Operating Unit'}
			selectedValue={selectedFilters.ouId}
			values={ouList}
			onChange={ouId=>updateFilters({...selectedFilters, ouId})}
		/>
		{!loading
			?<Button variant={'contained'} startIcon={<Check/>} onClick={triggerSearch}>Go</Button>
			:<Button variant={'contained'} startIcon={<Close/>} onClick={cancelSearch} color={'secondary'}>Stop</Button>
		}
	</Box>
}