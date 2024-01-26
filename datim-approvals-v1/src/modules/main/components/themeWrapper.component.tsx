import React from 'react';
import {ThemeProvider} from '@material-ui/styles';
import {createTheme} from '@material-ui/core/styles';

import "../css/themeWrapper.component.css";

const theme = createTheme({
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

export default function ThemeWrapper({children}) {
    return (
        <ThemeProvider theme={theme}>
            <div style={styles.wrapper}>
                {children}
            </div>
        </ThemeProvider>
    );
}