import React from "react";
import MechanismModel, {MechanismMeta, MechanismState} from "../../shared/models/mechanism.model";
import {Divider, Paper, Typography} from "@material-ui/core";
import ActionButtons from "./actionButtons.component";
import {getMechanismsInfo, getMechanismStates, performAction} from "../services/mechanism.service";
import Step from "./step/step.component";
import MechanismTabs from "./mechanism/mechanismTabs.component";
import {fetchUserOu, fetchUserType} from "../services/user.service";
import {getLevel3OUs} from "../services/ou.service";
import WorkflowOverview from "./workflowOverview.component";
import {idName} from "../models/idName";
import WorkflowPeriodService from "../../shared/services/workflowsPeriods.service";
import {getWorkflowNameById} from "../../shared/services/workflowService";
import Loading from "../../shared/components/loading.component";
import "../css/action.component.css";
import {getActionUrlData} from "../services/getActionUrlData.service";
import Message from "../../main/components/message.component";

export default class Action extends React.Component<{
        // postMessage: (message:string, type?:string)=>void,
        // approvalCombos: ApprovalsCombo[],
        // workflow: string,
        // period: string
    }, {
        workflow: idName,
        period: idName,
        userOu: string,
        userType: string,
        mechanisms: MechanismModel[],
        mechanismState: MechanismState,
        processing: boolean,
        networkError: boolean,
        ous: [],
        message: {
            success?: string,
            error?: string,
        }
    }> {
    constructor(props){
        super(props);
        let {workflow, period,approvalCombos} = getActionUrlData();
        let mechanismsMeta:MechanismMeta[] = approvalCombos.map(ac=>{return {
            ou: ac.ou,
            cocId: ac.cocId,
            coId: ac.coId,
            workflow: workflow,
            period: period
        }});
        let mechanisms:MechanismModel[] = mechanismsMeta.map(meta=>{return {meta: meta}});
        this.state = {
            workflow: {id: workflow, name: getWorkflowNameById(workflow)},
            period: {id: period, name: null},
            userType: null,
            userOu: null,
            mechanismState: null,
            mechanisms: mechanisms,
            processing: false,
            networkError: false,
            ous: [],
            message: {}
        };
        this.getMechanismStatuses(this.state.workflow.id, this.state.period.id, this.state.mechanisms);

        let wfService = new WorkflowPeriodService();
        wfService.init().then(()=>{
            this.setState({period: {id: period, name: wfService.getPeriodNameById(workflow, period)}});
        });
    }

    async componentDidMount() {
        await this.getL3Ous();
        this.getMechanismsInfo(this.state.mechanisms, this.state.ous);
        this.getUserType();
        this.getUserOu();
    }

    getMechanismStatuses(workflow: string, period: string, mechanisms: MechanismModel[]){
        return getMechanismStates(workflow, period, mechanisms).then(state=>{
            this.setState({mechanismState: state});
        })
        .catch(e => this.setState({
            networkError: true,
            processing: false
        }));
    }

    getMechanismsInfo(mechanisms: MechanismModel[], ous: []){
        getMechanismsInfo(mechanisms.map(m=>m.meta.cocId)).then(mechanismsInfo=>{
            mechanismsInfo.forEach((info,i)=>{
                //assign is necessary because of dedupe sharing mechanismInfo
                mechanisms[i].info = Object.assign({},mechanismsInfo[i]);
                // Dedupe fix to get the correct OU displayed
                if (!mechanisms[i].info['ou'] && mechanisms[i].meta['ou']) {
                    let lookup = ous.filter(f=>f['id']===mechanisms[i].meta['ou']);
                    if (lookup[0] && lookup[0]['displayName']) {
                        mechanisms[i].info['ou'] = lookup[0]['displayName'];
                    }
                }
            });
            mechanisms = mechanisms.sort((a,b)=>a.info.name>b.info.name?1:a.info.ou>b.info.ou?1:-1)
            this.setState({mechanisms});
        })
        .catch(e => this.setState({
            networkError: true,
            processing: false
        }));

    };

    getUserType(){
        fetchUserType().then(userType=>{
            this.setState({userType: userType})
        })
        .catch(e => this.setState({
            networkError: true,
            processing: false
        }));
    }

    getUserOu(){
        fetchUserOu().then(ou=>this.setState({userOu: ou}))
        .catch(e => this.setState({
            networkError: true,
            processing: false
        }));
    }

    async getL3Ous(){
        try {
            let ous = await getLevel3OUs();
            this.setState({ous: ous});
        } catch (e) {
            this.setState({
                ous: [],
                networkError: true,
                processing: false,
            });
        }
    }

    performAction = (action:string)=>{
        this.setState({processing: true});
        performAction(action, this.state.workflow.id, this.state.period.id, this.state.mechanisms.map(m=>m.meta), this.state.mechanismState.status).then((response)=>{
            if (!response.ok || response.redirected) {
                this.setState({processing: false});
                return this.errorMessage(action);
            }
            this.getMechanismStatuses(this.state.workflow.id, this.state.period.id, this.state.mechanisms).then(()=>{
                this.successMessage(action);
                this.setState({processing: false});
            });
        });
    };



    renderAction(){
        if (this.state.processing) return <Loading message='Loading...'/>;
        return <ActionButtons mechanismState={this.state.mechanismState} performAction={this.performAction} mechanismsNr={this.state.mechanisms.length}/>;
    }

    successMessage(action:string){
        let plural = this.state.mechanisms.length>1?'s':'';
        let message = `Mechanism${plural} successfully `;
        switch(action){
            case 'submit': message += 'submitted'; break;
            case 'recall': message += 'recalled'; break;
            case 'accept': message += 'accepted'; break;
            case 'return': message += 'returned'; break;
        }
        // this.props.postMessage(message);
        this.setState({message: {success: message}})
    }

    errorMessage(action:string){
        let plural = this.state.mechanisms.length>1?'s':'';
        // this.props.postMessage(`Server error: Failed to ${action} mechanism${plural}`, 'error');
        this.setState({message: {error: `Server error: Failed to ${action} mechanism${plural}`}})
    }

    render() {
        return (
            <React.Fragment>
                <Paper>
                    {this.state.networkError?<Typography color="secondary" align="center" style={{margin: 10, fontWeight: 500}}>
                        Network Error. You may be able to continue.
                    </Typography>:null}
                    {this.renderAction()}
                    <Divider/>
                    <Step workflow={this.state.workflow.id} mechanismState={this.state.mechanismState} userType={this.state.userType}/>
                    <Divider/>
                    <WorkflowOverview workflow={this.state.workflow.name} period={this.state.period.name}/>
                </Paper>
                <MechanismTabs workflow={this.state.workflow.id} period={this.state.period.id} userOu={this.state.userOu} mechanisms={this.state.mechanisms} mechanismState={this.state.mechanismState}/>
                <Message success={this.state.message.success} error={this.state.message.error}/>
            </React.Fragment>
        );
    }
}