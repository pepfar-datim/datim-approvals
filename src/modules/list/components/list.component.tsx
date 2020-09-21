import React, {CSSProperties} from "react";
import {withRouter} from "react-router-dom";
import queryString from "query-string";
import {Divider, Typography} from "@material-ui/core";

import orgUnits from "../services/orgUnits.service"
import FilterSelect from "./filterSelect.component";
import MechanismModel from "../../shared/models/mechanism.model";
import ResultsTabs from "./results/resultsTabs.component";
import Filters from "../models/filters.model";
import ListAction from "./listAction.component";
import WorkflowPeriodService from "../../shared/services/workflowsPeriods.service";
import {idNameList} from "../../shared/models/idNameList.model";
import {fetchMechanisms} from "../services/mechanisms.service";
import Loading from "../../shared/components/loading.component";

const styles = {
    link: {
        color: 'inherit',
        textDecoration: 'underline'
    } as CSSProperties
};

class List extends React.Component<
    {history: any, urlSearchOptions: Filters},
    {
        filters: Filters,
        mechanisms: MechanismModel[],
        selectedMechanisms: MechanismModel[],
        selectedAction: string,
        workflows: idNameList,
        periods: idNameList,
        loading: {filters?: boolean, mechanisms?: boolean},
        ous: idNameList
    }
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
            selectedAction: null,
            ous: null
        };
        let ouPromise = orgUnits.init().then((ous)=>{
            this.setState({ous: ous});
            this.preselectOu(ous);
        });

        this.workflowPeriodService = new WorkflowPeriodService();
        let workflowsPromise = this.workflowPeriodService.init().then((workflows)=>{
            let selectedWorkflow = workflows.length>0 && workflows[0].id;
            let periods = this.workflowPeriodService.getPeriods(selectedWorkflow);
            this.setState({loading: {filters: false, mechanisms: false}, workflows: workflows, periods: periods, filters:{workflow: selectedWorkflow, period: periods.length>0&&periods[0].id, ou: this.state.filters.ou}});
            this.setFilterFromUrl('workflow');
            this.setFilterFromUrl('period');
        });

        Promise.all([ouPromise,workflowsPromise]).then(()=>this.fetchMechanisms());
    }

    setFilterFromUrl(property:string){
        if (!this.props.urlSearchOptions) return;
        let value = this.props.urlSearchOptions[property];
        if (value) this.setFilter(property, value);
    }

    preselectOu(ous){
        this.setFilterFromUrl('ou');
        this.setFilter('ou', ous[0].id);
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
        if (key==='workflow') {
            let periods = this.workflowPeriodService.getPeriods(val);
            this.setState({periods: periods});
            this.setFilter('period', periods[0].id);
        }
    }
    onUserSelect = (property:string, value:string)=>{
        this.setFilter(property, value);
        this.fetchMechanisms();
        this.updateUrl();
    };

    updateUrl(){
        setTimeout(()=>{
            let url = queryString.stringify(this.state.filters);
            this.props.history.push('/search?'+url);
        },0);
    }

    renderFilters(){
        if (this.state.loading.filters) return <Loading message='Loading workflow information...'/>;
        return <FilterSelect
            organisationUnits={this.state.ous}
            periods={this.state.periods}
            workflows={this.state.workflows}
            selected={this.state.filters}
            select={this.onUserSelect}
        />
    }

    getActionUrl():string{
        if (!this.state.selectedMechanisms) return null;
        let params = {
            period: this.state.filters.period,
            workflow: this.state.filters.workflow,
            approvalCombos: this.state.selectedMechanisms.map(m=>`${m.meta.ou}:${m.meta.cocId}:${m.meta.coId}:`)
        };
        return '/action?' + queryString.stringify(params);
    }

    onMechanismsSelected = (mechanisms:MechanismModel[]):void=>{
        this.setState({selectedMechanisms: mechanisms});
    };

    onSwitchTab = (action)=>{
        this.setState({selectedAction: action, selectedMechanisms: null});
    };

    renderResults(){
        if (this.state.loading.mechanisms || this.state.loading.filters) return <Loading message='Loading mechanisms...'/>;
        if (!this.state.mechanisms) return <Typography color="secondary">There are no workflows active currently. If you feel this is an error, please contact <a target='_blank' href='https://datim.zendesk.com/' style={styles.link}>DATIM Support</a>.</Typography>;
        if (this.state.mechanisms.length===0) return <Typography color="secondary">No mechanisms found</Typography>
        return <ResultsTabs mechanisms={this.state.mechanisms} onMechanismsSelected={this.onMechanismsSelected} onSwitchTab={this.onSwitchTab}/>;
    }

    render() {
        return (
            <React.Fragment>
                {this.renderFilters()}
                {this.state.filters.workflow && <Divider/>}
                <ListAction selectedAction={this.state.selectedAction} selectedMechanisms={this.state.selectedMechanisms} actionUrl={this.getActionUrl()} onMechanismsSelected={this.onMechanismsSelected}/>
                {this.renderResults()}
            </React.Fragment>
        );
    }
}

export default withRouter(List);