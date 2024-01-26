import React from 'react';
import {Button} from "@mui/material";
import {getSearchPageUrlService} from "../services/getSearchPageUrl.service.ts";

function getQueryParams():string{
    const [period, workflow, ouId] = new URLSearchParams(window.location.hash.replace('#','')).get('selectedFilters').split('.')
    return `workflow=${workflow}&period=${period}&ouId=${ouId}`
}
export function Back({}:{}){
    const url = `${getSearchPageUrlService()}?${getQueryParams()}`
	return <Button color={'inherit'} href={url}>Back</Button>
}