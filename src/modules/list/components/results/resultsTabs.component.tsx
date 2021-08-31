import React from "react";
import {Badge, Divider, Tab, Tabs} from "@material-ui/core";
import MechanismModel from "../../../shared/models/mechanism.model";
import ResultsTable from "./resultsTable.component";

const mechanismActions = ['view', 'accept', 'submit', 'recall', 'return'];

export default class ResultsTabs extends React.Component<
    {mechanisms: MechanismModel[], selectedMechanisms:MechanismModel[], onMechanismsSelected: (mechanisms:MechanismModel[])=>void, onSwitchTab: (string)=>void},
    {action: string, filteredMechanisms: MechanismModel[]}
    > {
    constructor(props){
        super(props);
        this.state = {action: 'view', filteredMechanisms: this.filterMechanisms(this.props.mechanisms, 'view')};
        this.props.onSwitchTab('view');
    }

    switchTab = (ev, tabNr) => {
        const action = mechanismActions[tabNr];
        if (this.state.action===action) return;
        let filteredMechanisms =  this.filterMechanisms(this.props.mechanisms, action);
        this.setState({action: action, filteredMechanisms: filteredMechanisms});
        this.props.onSwitchTab(action)
    };

    generateTabLabel(action: string) {
        let mechanismsNumber = this.filterMechanisms(this.props.mechanisms, action).length;
        return <Badge color="primary" badgeContent={mechanismsNumber} style={{paddingRight: 15}} max={9999}>
             {action}
        </Badge>;
    }

    renderTabs(){
        return mechanismActions.map((action, i)=><Tab label={this.generateTabLabel(action)} key={i} disabled={this.filterMechanisms(this.props.mechanisms, action).length===0} id={`cy_mechanismListTab_${action}`}/>)
    }

    filterMechanisms(allMechanisms: MechanismModel[], action:string){
        if (action==='view') return allMechanisms;
        else return allMechanisms.filter(m=>m.state.actions[action]);
    }

    getTabIndex(action:string){
        return mechanismActions.indexOf(action);
    }

    render() {
        return (
            <div className='cy_list_results'>
                <Tabs value={this.getTabIndex(this.state.action)} onChange={this.switchTab}>
                    {this.renderTabs()}
                </Tabs>
                <Divider/>
                <ResultsTable mechanisms={this.state.filteredMechanisms} selectedMechanisms={this.props.selectedMechanisms} onMechanismsSelected={this.props.onMechanismsSelected}/>
            </div>
        );
    }
}