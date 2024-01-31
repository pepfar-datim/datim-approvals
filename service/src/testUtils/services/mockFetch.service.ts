import {MapOf} from "../../misc/types/misc.types.ts";

function clean(url:string):string{
    return url.replace(/&cache.+$/g, '')
}

export function mockFetch(urlList:MapOf<object>):void{
    //@ts-expect-error global is not defined
    global.fetch = vitest.fn().mockImplementation((url:string)=>{
        url = clean(url)
        if (!urlList[url]) throw new Error(`URL is not mocked ${url}`)
        return Promise.resolve({
            json:()=>urlList[url],
            text:()=>urlList[url]
        })
    })
}

