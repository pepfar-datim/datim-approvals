import {baseUrl} from "./apiUrl.service";

function makeUrl(url:string){
    return baseUrl+'api'+url;
}

export function getData(url:string):Promise<any>{
    return fetch(makeUrl(url), {credentials: 'include'}).then(resp => resp.json());
}

export function postData(url:string, data:any):Promise<any>{
    return fetch(makeUrl(url), {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
}