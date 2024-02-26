import {MechanismInfo} from '@approvals/service'

function sortByCode(code1:string, code2:string):number{
    return parseInt(code1) - parseInt(code2)
}

function aggregateValue(mechanisms: MechanismInfo[], key: keyof MechanismInfo): string {
    const values = mechanisms.map(m=>m[key])
    const uniqueValues = [...new Set(values)]
    let sortedValues:string[] = null
    if (key==='code') sortedValues = uniqueValues.sort(sortByCode)
    else sortedValues = uniqueValues.sort(function(value1, value2){
        return value1.toLocaleLowerCase()<value2.toLocaleLowerCase()?-1:1
    })
    return sortedValues.join(', ')
}
export function getAggregateInfo(mechanisms: MechanismInfo[]):MechanismInfo{
    return {
        code: null,
        mechanismName: aggregateValue(mechanisms, 'code'),
        ouName: aggregateValue(mechanisms, 'ouName'),
        agency: aggregateValue(mechanisms, 'agency'),
        partnerName: aggregateValue(mechanisms, 'partnerName')
    }
}