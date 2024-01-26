import React from "react";
import {render} from 'react-dom';
import {apiVersion, baseUrl} from "./modules/shared/services/apiUrl.service";
import {Provider} from "@dhis2/app-runtime";
import {HeaderBar} from '@dhis2/ui'
import ThemeWrapper from "./modules/main/components/themeWrapper.component";
import "./index.css";
import {apiInit} from "@pepfar-react-lib/http-tools";
import Router from "./modules/main/components/router.component";

apiInit(baseUrl,process.env.NODE_ENV);

export function Index(){
    return (
        <Provider config={{baseUrl: baseUrl, apiVersion: apiVersion}}>
            <span id='dhis2HeaderBar'>
                <HeaderBar/>
            </span>
            <br/>
            <ThemeWrapper>
                <Router/>
            </ThemeWrapper>
        </Provider>
    );
}

render(<Index/>, document.getElementById('root'));