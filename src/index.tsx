import React from "react";
import {render} from 'react-dom';
import {baseUrl} from "./modules/shared/services/apiUrl.service";
import {Provider} from "@dhis2/app-runtime";
import {HeaderBar} from '@dhis2/ui'
import ThemeWrapper from "./modules/main/components/themeWrapper.component";
import "./index.css";

function Index(){
    return (
        <Provider config={{baseUrl: baseUrl, apiVersion: 33}}>
            <span id='dhis2HeaderBar'>
                <HeaderBar/>
            </span>
            <br/>
            <ThemeWrapper/>
        </Provider>
    );
}
render(<Index/>, document.getElementById('root'));