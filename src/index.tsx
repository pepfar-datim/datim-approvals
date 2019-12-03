import React from "react";
import { render } from 'react-dom';
import ThemeWrapper from "./modules/main/components/themeWrapper.component";
import {baseUrl} from "./modules/shared/services/apiUrl.service";
import { init, config } from 'd2';
import HeaderBar from '@dhis2/d2-ui-header-bar';
import "./index.css";
import NetworkError from "./modules/main/components/networkError.component";

function Dhis2Wrapper(props:any){
    if (!props.d2) return null;
    return (
        <React.Fragment>
            <span id='dhis2HeaderBar'>
            <HeaderBar d2={props.d2}/>
            </span>
            <br/><br/><br/>
            <ThemeWrapper/>
        </React.Fragment>
    );
}

config.baseUrl = baseUrl;

config.i18n.sources.add('i18n.txt');

init().then(d2 => {
    render(<Dhis2Wrapper appName={'Dedupe Dashboard'} d2={d2}/>, document.getElementById('root'));
}).catch(e=>{
    render(<NetworkError/>, document.getElementById('root'));
});