import {screen} from '@testing-library/react'

export function pause():Promise<void>{
    return new Promise((resolve)=>{
        setTimeout(resolve, 1)
    })
}

export function debugAll(){
    screen.debug(null,1e5)
}

export function debugText(){
    console.log(document.querySelector('body').textContent)
}
export async function waitAndDebugText(){
    await pause();
    debugText()
}

