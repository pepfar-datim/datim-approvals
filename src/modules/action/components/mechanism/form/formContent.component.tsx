import React from "react";
import FormRender from "./formRender.component";
import {MechanismMeta} from "../../../../shared/models/mechanism.model";
import getFormContent from "../../../services/formContent.service";
import {LinearProgress} from "@material-ui/core";

export default class FormContent extends React.Component<
    {workflow: string, period: string, userOu: string, dataSet: string, mechanismMetas: MechanismMeta[]},
    {formHtml: string}>{
    constructor(props){
        super(props);
        this.state = {formHtml: null};
    }

    componentDidMount():void {
        this.fetchForm(this.props.dataSet, this.props.period, this.props.userOu, this.props.mechanismMetas);
    }

    componentDidUpdate(prevProps) {
        if (this.props.dataSet !== prevProps.dataSet || this.props.mechanismMetas !== prevProps.mechanismMetas)
            this.fetchForm(this.props.dataSet, this.props.period, this.props.userOu, this.props.mechanismMetas);
    }


    fetchForm(dataSet: string, period: string, userOu: string, mechanismMetas: MechanismMeta[]){
        this.setState({formHtml: null});
        getFormContent(dataSet, period, userOu, mechanismMetas).then(html=>{
            this.setState({formHtml: html});
        });

    }
    render() {
        if (!this.state.formHtml) return <LinearProgress/>;
        return <FormRender formHtml={this.state.formHtml}/>;
    }
}