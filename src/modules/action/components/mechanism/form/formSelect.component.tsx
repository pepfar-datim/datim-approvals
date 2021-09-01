import React from "react";
import FormContent from "./formContent.component";
import {getData} from "@pepfar-react-lib/http-tools";
import DatasetSelect from "./datasetSelect.component";
import {CircularProgress, Divider} from "@material-ui/core";
import {getWorkflowNameById} from "../../../../shared/services/workflowService";
import {MechanismMeta} from "../../../../shared/models/mechanism.model";


function getDatasetUrl(workflow: string){
    return `/dataApprovalWorkflows.json?fields=id,name,dataSets[id,name]&paging=false&filter=id:eq:${workflow}`
}

export default class FormSelect extends React.Component<
    {workflow: string, period: string, userOu: string, mechanismMetas: MechanismMeta[]},
    {selectedDataset: {name?: string, id?: string}, datasets: {name: string, id: string}[]}
    > {
    constructor(props){
        super(props);
        this.state = {selectedDataset: {}, datasets: null};
        getData('/dataStore/approvals/periodSettings').then(res=>{
            let recommendedDatasets = res[getWorkflowNameById(props.workflow)][props.period].datasets;
            getData(getDatasetUrl(props.workflow)).then(res=>{
                let allDatasets = res.dataApprovalWorkflows[0].dataSets;
                let actualDatasets;
                if (!recommendedDatasets || recommendedDatasets.length ===0) actualDatasets = allDatasets;
                else {
                    actualDatasets = allDatasets.filter(did=>recommendedDatasets.indexOf(did.id)>-1)
                }
                this.setState({
                    datasets: actualDatasets,
                    selectedDataset: actualDatasets[0]
                });
            });
        });
    }

    onDsChange = (dataset)=>{
        this.setState({selectedDataset: dataset});
    };

    render(){
        if (!this.state.selectedDataset.id) return <CircularProgress/>;
        return <div id='cy_actionPage_form'>
            <DatasetSelect selectedDataset={this.state.selectedDataset} datasets={this.state.datasets} onDsChange={this.onDsChange}/>
            <br/>
            <Divider/>
            <FormContent workflow={this.props.workflow} period={this.props.period} userOu={this.props.userOu} dataSet={this.state.selectedDataset.id} mechanismMetas={this.props.mechanismMetas}/>
        </div>
    }
}