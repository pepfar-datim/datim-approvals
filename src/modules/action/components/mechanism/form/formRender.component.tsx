/* global window */

import React, {useEffect} from "react";
var waitUntil = require('wait-until');

const scripts = [
    'formJs/jqueryAndDhis.js',
    'formJs/tabsCssRemoveTrigger.js'
];

const styles = {
    form: {
        overflow: 'hidden',
        fontFamily: 'Arial'
    },
    clear: {clear: 'both'}
};

function loadStaticScript(url){
    let el = document.createElement('script');
    el.src = url;
    el.className = 'runtimeLoadedFormJS';
    document.body.appendChild(el);
    console.log(`loaded script ${url}`);
}

function loadDynamicScripts(html){
    try {
        let script = /<script>(.|\n|\r)+?<\/script>/gi.exec(html)[0];
        script = script.replace('<script>', '').replace('</script>', '')
        console.log(`Evaluating external script ${script.substr(0, 100)}`);
        (window as any).eval(script);
    } catch (e){
        console.error('cannot load external javascripts');
        console.error(e);
    }
}

function cleanup(){
    let dynamicScripts = document.getElementsByClassName("runtimeLoadedFormJS");
    let scriptsCount = dynamicScripts.length;
    for (let i=0; i<scriptsCount; i++) {
        document.body.removeChild(dynamicScripts[0]);
    }
}

function FormRender({formHtml}:{formHtml: string}){
    useEffect(() => {
        return cleanup;
    });
    loadStaticScript(scripts[0]);
    waitUntil(200, 20, ()=>{
        return !!(window as any).dhis2 && !!(window as any).dhis2.de;
    }, (result)=>{
        loadDynamicScripts(formHtml);
        loadStaticScript(scripts[1]);
    });
    return <React.Fragment>
        <div dangerouslySetInnerHTML={{__html: formHtml}} style={styles.form}/>
        <div style={styles.clear as any}/>
    </React.Fragment>;
}

export default React.memo(FormRender);