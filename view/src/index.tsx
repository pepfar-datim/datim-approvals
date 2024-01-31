import React from 'react'
import ReactDOM from 'react-dom/client'
import {Page} from "@approvals/page"
import {ViewPageContext} from "./modules/viewPage/components/viewPageContext.component.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(<>
    {/*<React.StrictMode>*/}
        <Page>
            <ViewPageContext/>
        </Page>
    {/*</React.StrictMode>*/}
</>)
