import React from "react";
import api from "../../../../shared/services/api.service";
import FormRender from "./formRender.component";
import {getCoidByCocids} from "../../../services/mechanism.service";

function generateFormUrl(period: string, dataSet: string, userOu: string, mechanism: string){
    return `../../../dhis-web-reporting/generateDataSetReport.action` +
        `?ds=${dataSet}&pe=${period}&ou=${userOu}&dimension=SH885jaRe0o:${mechanism}`;
}

export default class FormContent extends React.Component<
    {workflow: string, period: string, userOu: string, dataSet: string, mechanismCocIds: string[]},
    {formHtml: string, mechanismCoIds:string}>{
    constructor(props){
        super(props);
        this.state = {formHtml: null, mechanismCoIds: null};
    }


    init(){
        getCoidByCocids(this.props.mechanismCocIds).then(catOpIds=>{
            this.fetchForm(this.props.period, this.props.dataSet, this.props.userOu, catOpIds);
            this.setState({mechanismCoIds: catOpIds});
        });
    }

    componentDidMount():void {
        this.init();
    }

    componentDidUpdate(prevProps) {
        if (this.props.dataSet !== prevProps.dataSet || this.props.mechanismCocIds !== prevProps.mechanismCocIds) this.init();
    }


    fetchForm(period: string, dataSet: string, userOu: string, mechanism: string){
        this.setState({formHtml: null});
        api.getHtml(generateFormUrl(period, dataSet, userOu, mechanism)).then(html=>{
            this.setState({formHtml: html});
        });
    }
    render() {
        if (!this.state.formHtml) return null;
        return <FormRender formHtml={this.state.formHtml}/>;
    }
}