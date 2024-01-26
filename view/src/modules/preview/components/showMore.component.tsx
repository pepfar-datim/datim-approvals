// import React from 'react';
// import {Button} from "@mui/material";
//
// const steps = [
//     5*1e2,
//     1e3,
//     5*1e3,
//     1e4,
//     5*1e4,
// ]
//
// export function ShowMore({text}:{text:string}){
//     const [step, setStep] = React.useState(1)
//     const add = () => setStep(step+1)
//     const remove = () => setStep(step-1)
//     const textLength = steps.slice(0, step).reduce((a,b)=>a+b, 0)
//     const hasMore = text.length>textLength
//     const visibleText = `${text.substring(0, textLength)}${hasMore?'...':''}`
//     return <>
//         {visibleText}<br/>
//         {step>1&&<Button onClick={remove} size={'small'} color={'inherit'}>
//             Show less
//         </Button>}
//         {hasMore&&<Button onClick={add} size={'small'}>
//             Show more
//         </Button>}
//     </>
// }

// import React from 'react';
// import {Button} from "@mui/material";
//
// const wordCounts = [
//     50,
//     100,
//     500,
//     2500
// ]
//
// export function ShowMore({text}:{text:string}){
//     const [step, setStep] = React.useState(0)
//     const add = () => setStep(step+1)
//     const remove = () => setStep(step-1)
//     const visibleText = text.split(', ').slice(0, wordCounts[step]).join(', ')
//
//
//     // const textLength = steps.slice(0, step).reduce((a,b)=>a+b, 0)
//     const hasMore = text.length>visibleText.length
//     // const visibleText = `${text.substring(0, textLength)}${hasMore?'...':''}`
//     return <>
//         {`${visibleText}${hasMore&&', ...'}`}<br/>
//         {step>0&&<Button onClick={remove} size={'small'} color={'inherit'}>
//             Show less
//         </Button>}
//         {hasMore&&<Button onClick={add} size={'small'}>
//             Show more
//         </Button>}
//     </>
// }

import React from 'react';
import {Button} from "@mui/material";

const steps = [
    5*1e2,
    1e3,
    5*1e3,
    1e4,
    5*1e4,
]

export function ShowMore({text}:{text:string}){
    const [step, setStep] = React.useState(1)
    const add = () => setStep(step+1)
    const remove = () => setStep(step-1)
    const textLength = steps.slice(0, step).reduce((a,b)=>a+b, 0)
    const hasMore = text.length>textLength
    let visibleText = text
    if (hasMore) visibleText = `${text.substring(0, textLength).replace(/[^,]+$/,'')} …`
    return <>
        {visibleText}<br/>
        {step>1&&<Button onClick={remove} size={'small'} color={'inherit'}>
            Show less
        </Button>}
        {hasMore&&<Button onClick={add} size={'small'}>
            Show more
        </Button>}
    </>
}