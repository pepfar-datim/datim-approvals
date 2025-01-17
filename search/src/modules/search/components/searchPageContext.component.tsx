import {useEffect, useState} from 'react';
import {MenuOptions} from "../types/search.types.ts";
import {SearchPage} from "./searchPage.component.tsx";
import {getMenuOptions} from "../services/getMenuOptions.service.ts";
import {MenuLoading} from "../../searchMenu/components/menuLoading.component.tsx";
import {SelectedFilters} from '@approvals/service'
import {AllExpired} from "./allExpired.component.tsx";
import {UserType} from "@pepfar-react-lib/datimuser";
import {getUserType} from "../services/getUserType.service.ts";

export function SearchPageContext(){
    const [menuOptions,setMenuOptions] = useState<MenuOptions>()
    const [defaultFilters, setDefaultFilters] = useState<SelectedFilters>()
    const [userType, setUserType] = useState<UserType>()
    useEffect(()=>{
        getMenuOptions().then(setMenuOptions)
    },[])
    useEffect(()=>{
        /* Select default filters
        * Either from URL or first choice for each dropdown */
        if (!menuOptions||menuOptions.workflows.length===0) return;
        const queryParams = new URLSearchParams(window.location.search)
        setDefaultFilters({
            workflow: queryParams.get('workflow')||menuOptions.workflows[0]?.id,
            period: queryParams.get('period')||menuOptions.workflows[0].periods[0].id,
            ouId: queryParams.get('ouId')||menuOptions.ouList[0].id
        })
        getUserType().then(setUserType)
    },[menuOptions])
    if (menuOptions?.workflows.length===0) return <AllExpired/>
    if (!defaultFilters||!userType) return <MenuLoading/>
	return <>
        <SearchPage
            menuOptions={menuOptions}
            defaultFilters={defaultFilters}
            userType={userType}
        />
	</>
}