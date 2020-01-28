import React from "react";
import {render} from 'react-dom';
import {baseUrl} from "./modules/shared/services/apiUrl.service";
import {init, config} from 'd2';
import {HeaderBar} from '@dhis2/ui-widgets'
import {Provider} from '@dhis2/app-runtime'

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


init().then(d2 => {
    render(<Dhis2/>, document.getElementById('root'));
}).catch(e=>{
    render(<NetworkError/>, document.getElementById('root'));
});