import React, {CSSProperties} from "react";
import queryString from "query-string";
import {Divider, Typography} from "@material-ui/core";

import orgUnits from "../services/orgUnits.service"
import FilterSelect from "./filterSelect.component";
import ResultsTabs from "./results/resultsTabs.component";
import {SearchFilters} from "../models/filters.model";
import ListAction from "./listAction.component";
import WorkflowPeriodService from "../../shared/services/workflowsPeriods.service";
import {idNameList} from "../../shared/models/idNameList.model";
import {fetchMechanisms} from "../services/mechanisms.service";
import Loading from "../../shared/components/loading.component";
import {SearchMechanism} from "../models/searchMechanism.model";
import {getMyUserType, UserType} from "@pepfar-react-lib/datim-tools"
import GoButton from "./goButton.component";

const styles = {
    link: {
        color: 'inherit',
        textDecoration: 'underline'
    } as CSSProperties
};

function hasSelected(mechs:SearchMechanism[]):boolean{
    if (!mechs) return false;
    return mechs.some(m=>m.tableData.checked)
}

function getSelected(mechs:SearchMechanism[]):SearchMechanism[]{
    if (!mechs) return []
    return mechs.filter(r=>r.tableData.checked);
}

export default class List extends React.Component<{
    }, {
        filters: SearchFilters,
        mechanisms: SearchMechanism[],
        selectedAction: string,
        workflows: idNameList,
        periods: idNameList,
        loading: {filters?: boolean, mechanisms?: boolean},
        ous: idNameList,
        globalUser:boolean
    }> {
    workflowPeriodService;
    constructor(props){
        super(props);
        this.state = {
            loading: {filters: true, mechanisms: false},
            filters: {
                ou:null,
                workflow:null,
                period:null
            },
            mechanisms: null,
            workflows: null,
            periods: null,
            selectedAction: null,
            ous: null,
            globalUser:null
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
        let userTypePromise = getMyUserType().then((userType:UserType)=>{
            this.setState({globalUser: userType===UserType.Global});
        })

        Promise.all([ouPromise,workflowsPromise,userTypePromise]).then(()=>{
            if (!this.state.globalUser) this.fetchMechanisms()
        });
        getMyUserType();
    }


    setFilterFromUrl(property:string){
        // if (!this.props.urlSearchOptions) return;
        // let value = this.props.urlSearchOptions[property];
        // if (value) this.setFilter(property, value);
    }

    preselectOu(ous){
        this.setFilterFromUrl('ou');
        this.setFilter('ou', ous[0].id);
    }
    fetchMechanisms(){
        // setTimeout(()=>{
            let f = this.state.filters;
            if (!f.ou || !f.period || !f.workflow) return;
            this.setState({mechanisms: null, loading: {mechanisms: true}});
            fetchMechanisms(this.state.filters).then(mechanisms=>{
                this.setState({mechanisms, loading:{mechanisms: false}});
            });
        // },0);
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
        //     this.updateUrl();
    };

    updateUrl(){
        setTimeout(()=>{
            let url = queryString.stringify(this.state.filters);
            // window.history.pushState(null,null,'/search?'+url);
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
        if (!hasSelected(this.state.mechanisms)) return null;
        let params = {
            period: this.state.filters.period,
            workflow: this.state.filters.workflow,
            approvalCombos: getSelected(this.state.mechanisms).map(m=>`${m._originalMechanism.meta.ou}:${m._originalMechanism.meta.cocId}:${m._originalMechanism.meta.coId}:`)
        };
        return '/action?' + queryString.stringify(params);
    }

    onMechanismsSelected = (mechanisms:SearchMechanism[]):void=>{
        if (mechanisms.length===0){
            this.state.mechanisms.forEach(m=>{
                m.tableData.checked = false;
            })
            mechanisms = this.state.mechanisms;
        }
        this.setState({mechanisms});
    };

    onSwitchTab = (action)=>{
        this.setState({selectedAction: action});
    };

    renderResults(){
        
        if (this.state.loading.mechanisms || this.state.loading.filters) return <Loading message='Loading...'/>;
        if (this.state.globalUser&&!this.state.mechanisms) return <Typography color="secondary">Please click Go to search.</Typography>
        if (!this.state.loading.mechanisms && !this.state.mechanisms) return <Typography color="secondary">
            There are no workflows active currently. The quarter is currently closed for data entry and will reopen at a later date, per the <a target='_blank' href='https://datim.zendesk.com/hc/en-us/articles/115001940503-PEPFAR-Data-Calendar' style={styles.link} rel="noreferrer">PEPFAR Data Calendar</a>.  If you receive this during an active data entry period, please contact <a target='_blank' href='https://datim.zendesk.com/' style={styles.link} rel="noreferrer">DATIM Support</a>.
        </Typography>
        if (this.state.mechanisms.length===0) return <Typography color="secondary">No mechanisms found</Typography>
        return <ResultsTabs mechanisms={this.state.mechanisms} onMechanismsSelected={this.onMechanismsSelected} onSwitchTab={this.onSwitchTab}/>;
    }

    render() {
        return (
            <React.Fragment>
                {this.renderFilters()}
                {this.state.globalUser&&<GoButton onClick={()=>this.fetchMechanisms()}/>}
                {this.state.filters.workflow && <Divider/>}
                <ListAction selectedAction={this.state.selectedAction} selectedMechanisms={getSelected(this.state.mechanisms)} actionUrl={this.getActionUrl()} onMechanismsSelected={this.onMechanismsSelected}/>
                {this.renderResults()}
            </React.Fragment>
        );
    }
}
