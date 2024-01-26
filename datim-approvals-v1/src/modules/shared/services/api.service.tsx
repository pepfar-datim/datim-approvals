import {getData} from "@pepfar-react-lib/http-tools";

export function getFormHtml(url){
    // return fetch(makeUrl(url), {credentials: 'include', headers: {Accept: 'text/html'}}).then(resp=>resp.text());
    return getData(url, {credentials: 'include', headers: {Accept: 'text/html'}})
}