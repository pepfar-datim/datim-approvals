import React from 'react'
import ReactDOM from 'react-dom/client'
import {Page} from "@approvals/page"
import {SearchPageContext} from "./modules/search/components/searchPageContext.component.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode>
    <Page>
        <SearchPageContext/>
    </Page>
</React.StrictMode>)
