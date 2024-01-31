import React from 'react';
import {MapOf} from "../types/misc.types.ts";
export const fromCamelCase = (str:string) => str
        .replace(/([a-z\d])([A-Z])/g, '$1' + ' ' + '$2')
        .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + ' ' + '$2')
        .toLowerCase();

export function clone<T>(obj:T):MapOf<T>{
    return JSON.parse(JSON.stringify(obj))
}

export function compare(object1:MapOf<string>, object2:MapOf<string>):boolean{
    return JSON.stringify(object1) === JSON.stringify(object2)
}

export function repeat(n: number, component: React.ReactNode){
    return [...Array(n).keys()].map(key=>React.cloneElement(component as React.ReactElement, {key}))
}
