import React from "react";
import api from "../../../../shared/services/api.service";
import FormRender from "./formRender.component";
import {MechanismMeta} from "../../../../shared/models/mechanism.model";

function generateFormUrl(period: string, dataSet: string, userOu: string, mechanismMetas: MechanismMeta[]){
    let coIds = mechanismMetas.map(mm=>mm.coId).join(';')
    return `../../../dhis-web-reporting/generateDataSetReport.action` +
        `?ds=${dataSet}&pe=${period}&ou=${userOu}&dimension=SH885jaRe0o:${coIds}`;
}

export default class FormContent extends React.Component<
    {workflow: string, period: string, userOu: string, dataSet: string, mechanismMetas: MechanismMeta[]},
    {formHtml: string}>{
    constructor(props){
        super(props);
        this.state = {formHtml: null};
    }

    componentDidMount():void {
        this.fetchForm(this.props.period, this.props.dataSet, this.props.userOu, this.props.mechanismMetas);
    }

    componentDidUpdate(prevProps) {
        if (this.props.dataSet !== prevProps.dataSet || this.props.mechanismMetas !== prevProps.mechanismMetas)
            this.fetchForm(this.props.period, this.props.dataSet, this.props.userOu, this.props.mechanismMetas);
    }


    fetchForm(period: string, dataSet: string, userOu: string, mechanismMetas: MechanismMeta[]){
        this.setState({formHtml: null});
        api.getHtml(generateFormUrl(period, dataSet, userOu, mechanismMetas)).then(html=>{
            this.setState({formHtml: html});
        });
    }
    render() {
        if (!this.state.formHtml) return null;
        return <FormRender formHtml={this.state.formHtml}/>;
    }
}