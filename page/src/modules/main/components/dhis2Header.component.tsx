import React from 'react';
import {Provider} from '@dhis2/app-runtime'
import {HeaderBar} from '@dhis2/ui'
import {dhis2ProviderConfig} from "../config/config.ts";

export function Dhis2Header({}:{}){
	return <Provider config={dhis2ProviderConfig}>
		<HeaderBar/>
	</Provider>
}