import React from "react";
import Router from "./router.component";
import {IconButton, Snackbar, SnackbarContent, withTheme} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';


class Message extends React.Component<{theme:any}, {text:string, open:boolean, type:string}>{
    constructor(props){
        super(props);
        this.state = {text:null, open: false, type:null};
    }
    postMessage = (message:string, type?:string):void=>{
        this.setState({text: message, open: true, type: type});
        if (type!=="error") setTimeout(this.hideMessage, 5000);
    };
    hideMessage = ()=>{
        this.setState({text:null, open:false, type: null});
    };
    popupStyle = ()=>{
        if (this.state.type==="error") return {backgroundColor: this.props.theme.palette.secondary.main};
    };
    render(){

        return <React.Fragment>
            <Router postMessage={this.postMessage}/>
            <Snackbar
                open={this.state.open}
            >
                <SnackbarContent
                    message={this.state.text}
                    style={this.popupStyle()}
                    action={<IconButton
                        color="inherit"
                        key="close"
                        aria-label="Close"
                        onClick={()=>this.hideMessage()}>
                        <CloseIcon />
                    </IconButton>}
                />
            </Snackbar>
        </React.Fragment>
    }
}

export default withTheme(Message);