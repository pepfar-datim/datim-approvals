import {Webpage} from "../types/mechanismData.types.ts";
import {Mechanism} from '@approvals/service'

function parsePage(code:string):Webpage{
    const scriptRe = /<script[^>]*>([\s\S]*?)<\/script>/g
    const scripts = code.match(scriptRe)?.map(script=>script.replace(/<\/?script[^>]*>/g,''))
    return {
        html: code.replace(scriptRe,''),
        scripts,
    }
}

export async function getDatasetWebpage(selectedMechanism:Mechanism, allMechanisms:Mechanism[], selectedDataset: string):Promise<Webpage> {
    const categoryOptionId:string = selectedMechanism?selectedMechanism.identifiers.categoryOptionId:allMechanisms.map(m=>m.identifiers.categoryOptionId).join(';')
    const ouId:string = allMechanisms[0].selectedFilters.ouId
    const period:string = allMechanisms[0].selectedFilters.period
    const url = `/api/dataSetReport/custom?ds=${selectedDataset}&filter=SH885jaRe0o:${categoryOptionId}&ou=${ouId}&pe=${period}&selectedUnitOnly=false&cachebuster=${Math.random()*1e10}`
    const pageCode:string = await fetch(url,{headers: {Accept: 'text/html'}}).then(res=>res.text())
    return parsePage(pageCode)
}