import React from 'react';
import {ThemeProvider} from '@material-ui/styles';
import {createMuiTheme} from '@material-ui/core/styles';
import Message from "./message.component";

import "../css/themeWrapper.component.css";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: 'rgb(39, 102, 150)'
        },
        secondary: {
            main: '#f50057'
        },
        error:{
            main: '#D72638'
        }
    },
});

const styles = {
    wrapper: {
        maxWidth: 960,
        margin: 'auto'
    }
};

export default function ThemeWrapper() {
    return (
        <ThemeProvider theme={theme}>
            <div style={styles.wrapper}>
                <Message/>
            </div>
        </ThemeProvider>
    );
}