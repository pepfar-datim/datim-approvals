import {MechanismMeta} from "../../shared/models/mechanism.model";
import queryString from "query-string";
import {getFormHtml} from "../../shared/services/api.service";

export default function getFormContent(dataSet:string, period:string, userOu:string, mechanismMetas:MechanismMeta[]):Promise<string>{
    let request = {
        ds: dataSet,
        pe: period,
        ou: userOu,
        filter: 'queryFilter',
        selectedUnitOnly: false
    };
    const d = new Date();
    let time = d.getTime();
    let requestUrl = queryString.stringify(request).replace('queryFilter','SH885jaRe0o:'+mechanismMetas.map(mm=>mm.coId).join(';'));
    return getFormHtml('/dataSetReport/custom?'+requestUrl+'&cachebuster='+time);
}