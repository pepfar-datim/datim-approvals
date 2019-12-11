import React from "react";
import Router from "./router.component";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import {IconButton} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

export default class Message extends React.Component<{}, {text:string, open:boolean}>{
    constructor(props){
        super(props);
        this.state = {text:null, open: false};
    }
    postMessage(message:string){
        this.setState({text: message, open: true});
        setTimeout(()=>{this.hideMessage()}, 3500);
    }
    hideMessage(){
        this.setState({text:null, open:false});
    }
    render(){
        return <React.Fragment>
            <Router postMessage={(message)=>this.postMessage(message)}/>
            <Snackbar
                open={this.state.open}
                message={this.state.text}
                action={<IconButton
                    color="inherit"
                    key="close"
                    aria-label="Close"
                    onClick={()=>this.hideMessage()}
                >
                    <CloseIcon />
                </IconButton>}
            />
        </React.Fragment>
    }
}