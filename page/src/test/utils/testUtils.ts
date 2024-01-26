export function pause():Promise<void>{
    return new Promise((resolve)=>{
        setTimeout(resolve, 1)
    })
}

export function debugText(){
    console.log(document.querySelector('body').textContent)
}
export async function waitAndDebugText(){
    await pause();
    debugText()
}