import {baseUrl} from "./apiUrl.service";

function makeUrl(url:string){
    return baseUrl+'api'+url;
}

export default class Api{
    static get(url){
        return fetch(makeUrl(url), {credentials: 'include'}).then(resp => resp.json());
    }
    static post(url, data){
        return fetch(makeUrl(url), {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
    }

    // static getFormHtml(url:string, request:any):Promise<any> {
    //     let settings: RequestInit = {
    //         credentials: 'include',
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    //         },
    //         body: queryString.stringify(request)
    //     };
    //     return fetch(baseUrl + url, settings).then(resp=>resp.text());
    // }

    static getFormHtml(url){
        return fetch(makeUrl(url), {credentials: 'include', headers: {Accept: 'text/html'}}).then(resp=>resp.text());
    }
}