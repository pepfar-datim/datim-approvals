import React from "react";
import Router from "./router.component";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import {IconButton} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

export default class Message extends React.Component<{}, {message: {open?: boolean, text?: string}}>{
    constructor(props){
        super(props);
        this.state = {message: {}};
    }
    postMessage(message){
        this.setState({message: {open: true, text: message}});
        setTimeout(()=>{this.hideMessage()}, 3500);
    }
    hideMessage(){
        this.setState({message: {open: false, text: null}});
    }
    render(){
        return <React.Fragment>
            <Router postMessage={(message)=>this.postMessage(message)}/>
            <Snackbar
                open={this.state.message.open}
                message={this.state.message.text}
                action={<IconButton
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