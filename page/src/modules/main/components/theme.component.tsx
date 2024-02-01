
import {ReactElement} from "react";
import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme(  {
    spacing: 8,
    palette: {
        mode: 'light',
            primary: {
            main: '#2c6693',
        },
        secondary: {
            main: '#f50057',
        },
    },
    components:{
        MuiDivider: {
            defaultProps:{
                sx: {mt:1, mb: 1}
            }
        },
        MuiPaper: {
            defaultProps:{
                sx: {mt:1, p:1}
            },
        }
    }
});
export function Theme({children}:{children:ReactElement}){
	return <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
}