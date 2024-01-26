import {hrhDatasetListData} from "./data/viewAngolaHrh/hrhDatasetList.response.ts";

const hrhDatasetListUrl = `/api/dataApprovalWorkflows.json?fields=id,name,dataSets[id,name]&paging=false&filter=id:eq:TsowbK0Ql3T`
const hrhDatasetUrlOne = `/api/dataSetReport/custom?ds=f3dDT0tqqWx&filter=SH885jaRe0o:eiLqJfVuWE9&ou=XOivy2uDpMF&pe=2022Oct&selectedUnitOnly=false`
const hrhDatasetUrlAll = `/api/dataSetReport/custom?ds=f3dDT0tqqWx&filter=SH885jaRe0o:eiLqJfVuWE9;W1G4wE8ykTx;kBOGStNzmpp;WCHGpM6T7Va;mGCsZNCZUDB&ou=XOivy2uDpMF&pe=2022Oct&selectedUnitOnly=false`

const hrhForm = `<h3>Please use the HRH Processor App for uploading or reviewing HRH templates.</h3>`
export const hrhDatasetListUrls = {
    [hrhDatasetListUrl]: hrhDatasetListData,
    [hrhDatasetUrlOne]: hrhForm,
    [hrhDatasetUrlAll]: hrhForm
}