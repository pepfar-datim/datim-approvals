import {baseUrl} from "./apiUrl.service";

export default class Api{
    static get(url){
        return fetch(baseUrl + url, {credentials: 'include'}).then(resp => resp.json());
    }
    static post(url, data){
        return fetch(baseUrl+url, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
    }
    static transformCategoryOptions(){

    }
    static getHtml(url){
        return fetch(baseUrl + url, {credentials: 'include'}).then(resp=>resp.text());
    }
}