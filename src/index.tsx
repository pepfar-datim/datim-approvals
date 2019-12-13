import React from "react";
import {render} from 'react-dom';
import {baseUrl} from "./modules/shared/services/apiUrl.service";
import {init, config} from 'd2';
import {HeaderBar} from '@dhis2/ui-widgets'
import {Provider} from '@dhis2/app-runtime'

import OldHeaderBar from '@dhis2/d2-ui-header-bar';

import ThemeWrapper from "./modules/main/components/themeWrapper.component";
import NetworkError from "./modules/main/components/networkError.component";
import "./index.css";

config.baseUrl = baseUrl + 'api';
config.i18n.sources.add('i18n.txt');

function Dhis2(){
    return (
        <Provider config={{baseUrl: baseUrl, apiVersion: '30'}}>
            <span id='dhis2HeaderBar'>
                <HeaderBar/>
            </span>
            <br/><br/><br/>
            <ThemeWrapper/>
        </Provider>
    );
}

function OldDhis2(props:any){
    if (!props.d2) return null;
    return (
        <React.Fragment>
            <span id='dhis2HeaderBar'>
            <OldHeaderBar d2={props.d2}/>
            </span>
            <br/><br/><br/>
            <ThemeWrapper/>
        </React.Fragment>
    );
}

init().then(d2 => {
    render(<OldDhis2 d2={d2}/>, document.getElementById('root'));
}).catch(e=>{
    render(<NetworkError/>, document.getElementById('root'));
});