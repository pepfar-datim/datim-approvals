import React from "react";
import MechanismModel, {ApprovalsCombo,   MechanismMeta, MechanismState} from "../../shared/models/mechanism.model";
import {Divider, LinearProgress, Paper} from "@material-ui/core";
import ActionButtons from "./actionButtons.component";
import {getMechanismsInfo, performAction, getMechanismStates} from "../services/mechanism.service";
import Step from "./step/step.component";
import FormSelect from "./mechanism/form/formSelect.component";
import MechanismTabs from "./mechanism/mechanismTabs.component";
import {fetchUserOu, fetchUserType} from "../services/user.service";
import WorkflowOverview from "./workflowOverview.component";
import {idName} from "../models/idName";
import WorkflowPeriodService from "../../shared/services/workflowsPeriods.service";
import {getWorkflowNameById} from "../../shared/services/workflowService";

import "../css/action.component.css";

const styles = {
    progress: {
        marginBottom: 15
    }
};

export default class Action extends React.Component<
    {postMessage: (string)=>void, approvalCombos: ApprovalsCombo[], workflow: string, period: string},
    {
        workflow: idName,
        period: idName,
        userOu: string,
        userType: string,
        mechanisms: MechanismModel[],
        mechanismState: MechanismState,
        processing: boolean
    }
    > {
    constructor(props){
        super(props);
        let mechanismsMeta:MechanismMeta[] = props.approvalCombos.map(ac=>{return {
            cocId: ac.cocId,
            ou: ac.ou,
            workflow: props.workflow,
            period: props.period
        }});
        let mechanisms:MechanismModel[] = mechanismsMeta.map(meta=>{return {meta: meta}});
        this.state = {
            workflow: {id: props.workflow, name: getWorkflowNameById(props.workflow)},
            period: {id: props.period, name: null},
            userType: null,
            userOu: null,
            mechanismState: null,
            mechanisms: mechanisms,
            processing: false
        };
        this.getMechanismStatuses(this.state.workflow.id, this.state.period.id, this.state.mechanisms);
        this.getMechanismsInfo(this.state.mechanisms);
        this.getUserType();
        this.getUserOu();

        let wfService = new WorkflowPeriodService();
        wfService.init().then(()=>{
            this.setState({period: {id: props.period, name: wfService.getPeriodNameById(props.workflow, props.period)}});
        });
    }

    getMechanismStatuses(workflow: string, period: string, mechanisms: MechanismModel[]){
        return getMechanismStates(workflow, period, mechanisms).then(state=>{
            this.setState({mechanismState: state});
        });
    }

    getMechanismsInfo(mechanisms: MechanismModel[]){
        getMechanismsInfo(mechanisms.map(m=>m.meta.cocId)).then(mechanismsInfo=>{
            mechanismsInfo.forEach((info,i)=>{
                mechanisms[i].info = mechanismsInfo[i];
            });
            this.setState({mechanisms: mechanisms});
        });
    };

    getUserType(){
        fetchUserType().then(userType=>{
            this.setState({userType: userType})
        });
    }

    getUserOu(){
        fetchUserOu().then(ou=>this.setState({userOu: ou}));
    }

    performAction = (action:string)=>{
        this.setState({processing: true});
        performAction(action, this.state.workflow.id, this.state.period.id, this.state.mechanisms.map(m=>m.meta)).then(()=>{
            this.setState({processing: false});
            this.getMechanismStatuses(this.state.workflow.id, this.state.period.id, this.state.mechanisms).then(()=>{
                this.postMessage(action);
            });
        });
    };


    renderAction(){
        if (this.state.processing) return <LinearProgress style={styles.progress}/>;
        return <ActionButtons mechanismState={this.state.mechanismState} performAction={this.performAction} mechanismsNr={this.state.mechanisms.length}/>;
    }

    postMessage(action){
        let message = `Mechanism(s) successfully `;
        switch(action){
            case 'submit': message += 'submitted'; break;
            case 'recall': message += 'recalled'; break;
            case 'accept': message += 'accepted'; break;
        }
        this.props.postMessage(message);
    }

    render() {
        return (
            <React.Fragment>
                <Paper>
                    {this.renderAction()}
                    <Divider/>
                    <Step workflow={this.state.workflow.id} mechanismState={this.state.mechanismState} userType={this.state.userType}/>
                    <Divider/>
                    <WorkflowOverview workflow={this.state.workflow.name} period={this.state.period.name}/>
                </Paper>
                <MechanismTabs workflow={this.state.workflow.id} period={this.state.period.id} userOu={this.state.userOu} mechanisms={this.state.mechanisms} mechanismState={this.state.mechanismState}/>
            </React.Fragment>
        );
    }
}