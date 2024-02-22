import {Container, Divider, Paper, Typography} from "@mui/material"
import {Theme} from "./theme.component.tsx";
import React, {ReactElement, useEffect, useState} from "react"
import './page.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const styles = {
    root:{
        maxWidth: '940px!important',
        mt: 2,
    },
    paper:{
        p: 1.5
    }
}

const devMode = window.location.host.includes('localhost')&&!window.location.host.includes('4173');
export function Page({children}:{children: ReactElement}){
    const [header, setHeader] = useState(null)
    useEffect(()=>{
        // if (devMode) return;
        import("./dhis2Header.component.tsx").then(({Dhis2Header}) =>setHeader(<Dhis2Header/>))
    },[])
    return <>
        {header}
        <Theme>
            <Container sx={styles.root}>
                <Paper sx={styles.paper}>
                    <Typography variant={'h4'}>Approvals</Typography>
                    <Divider/>
                    {children}
                </Paper>
            </Container>
        </Theme>
    </>
}