import React from 'react';
import {Provider} from '@dhis2/app-runtime'
import {HeaderBar} from '@dhis2/ui'
export function Dhis2Header({}:{}){
	return <Provider config={{baseUrl: '/', apiVersion: 40}}>
		<HeaderBar/>
	</Provider>
}