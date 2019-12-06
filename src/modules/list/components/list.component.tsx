import React from "react";
import {withRouter} from "react-router-dom";
import queryString from "query-string";
import {Divider, LinearProgress} from "@material-ui/core";

import orgUnits from "../services/orgUnits.service"
import FilterSelect from "./filterSelect.component";
import MechanismModel from "../../shared/models/mechanism.model";
import ResultsTabs from "./results/resultsTabs.component";
import Filters from "../models/filters.model";
import ListAction from "./listAction.component";
import WorkflowPeriodService from "../../shared/services/workflowsPeriods.service";
import {idNameList} from "../../shared/models/idNameList.model";
import {fetchMechanisms} from "../services/mechanisms.service";

class List extends React.Component<
    {history: any, searchOptions: any},
    {filters: Filters, mechanisms: MechanismModel[], selectedMechanisms: MechanismModel[], selectedAction: string, workflows: idNameList, periods: idNameList,loading: {filters?: boolean, mechanisms?: boolean}}
    > {
    workflowPeriodService;
    constructor(props){
        super(props);
        this.state = {
            loading: {filters: true, mechanisms: false},
            filters: new Filters(),
            mechanisms: null,
            workflows: null,
            periods: null,
            selectedMechanisms: null,
            selectedAction: null
        };
        let ouPromise = orgUnits.init().then((ous)=>{
            this.preselectOu(ous);
        });

        this.workflowPeriodService = new WorkflowPeriodService();
        let workflowsPromise = this.workflowPeriodService.init().then((workflows)=>{
            let selectedWorkflow = workflows[0].id;
            let periods = this.workflowPeriodService.getPeriods(selectedWorkflow);
            this.setState({loading: {filters: false, mechanisms: false}, workflows: workflows, periods: periods, filters:{workflow: selectedWorkflow, period: periods[0].id, ou: this.state.filters.ou}});
        });

        Promise.all([ouPromise,workflowsPromise]).then(()=>this.fetchMechanisms());
    }

    preselectOu(ous){
        if (!this.props.searchOptions || !this.props.searchOptions.ou) this.setFilter('ou', this.props.searchOptions.ou);
        if (ous.length===1) this.setFilter('ou', ous[0].id);
    }
    fetchMechanisms(){
        setTimeout(()=>{
            let f = this.state.filters;
            if (!f.ou || !f.period || !f.workflow) return;
            this.setState({mechanisms: null, loading: {mechanisms: true}});
            fetchMechanisms(this.state.filters).then(mechanisms=>{
                this.setState({mechanisms: mechanisms, loading:{mechanisms: false}});
            });
        },0);
    }
    setFilter(key:string, val:string){
        let filters = this.state.filters;
        filters[key] = val;
        this.setState({filters: filters});
    }
    onUserSelect = (property:string, value:string)=>{
        this.setFilter(property, value);
        if (property==='workflow') {
            let periods = this.workflowPeriodService.getPeriods(value);
            this.setState({periods: periods});
            this.setFilter('period', periods[0].id);
        }
        this.fetchMechanisms();
    };
    renderFilters(){
        if (this.state.loading.filters) return <LinearProgress className='cy_loading'/>;
        return <FilterSelect
            organisationUnits={orgUnits.getOus()}
            periods={this.state.periods}
            workflows={this.state.workflows}
            selected={this.state.filters}
            select={this.onUserSelect}
        />
    }
    performMechanismAction = (action:string, mechs:MechanismModel[])=>{
        let params = {
            action: action,
            period: this.state.filters.period,
            workflow: this.state.filters.workflow,
            approvalCombos: mechs.map(m=>`${m.meta.cocId}:${m.meta.ou}`)
        };
        this.props.history.push(`/action?` + queryString.stringify(params));
    };

    onMechanismsSelected = (mechanisms:MechanismModel[]):void=>{
        this.setState({selectedMechanisms: mechanisms});
    };

    onSwitchTab = (action)=>{
        this.setState({selectedAction: action, selectedMechanisms: null});
    };

    renderResults(){
        if (this.state.loading.mechanisms) return <LinearProgress className='cy_loading'/>;
        if (!this.state.mechanisms) return null;
        return <ResultsTabs mechanisms={this.state.mechanisms} onMechanismsSelected={this.onMechanismsSelected} onSwitchTab={this.onSwitchTab}/>;
    }

    render() {
        return (
            <React.Fragment>
                {this.renderFilters()}
                <Divider/>
                <ListAction selectedAction={this.state.selectedAction} selectedMechanisms={this.state.selectedMechanisms} performMechanismAction={this.performMechanismAction}/>
                {this.renderResults()}
            </React.Fragment>
        );
    }
}

export default withRouter(List);
