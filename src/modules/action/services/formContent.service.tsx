import {MechanismMeta} from "../../shared/models/mechanism.model";
import api from "../../shared/services/api.service";

export default function getFormContent(dataSet:string, period:string, userOu:string, mechanismMetas:MechanismMeta[]):Promise<string>{
    let request = {
        ds: dataSet,
        pe: period,
        ou: userOu,
        dimension: 'SH885jaRe0o:'+mechanismMetas.map(mm=>mm.coId).join(';')
    };
    return api.getFormHtml('../../../dhis-web-reporting/generateDataSetReport.action', request);
}