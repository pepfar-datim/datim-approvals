# Datim Approvals v2

[![Dependencies](https://david-dm.org/pepfar-datim/datim-approvals.svg)](https://david-dm.org/pepfar-datim/datim-approvals)

**Repo Owner:** Ben Guaraldi [@benguaraldi](https://github.com/benguaraldi)  
**Developer:** Jakub Flaska [@jakub-bao](https://github.com/jakub-bao)

This project is a DHIS2 custom app dedicated to mechanism approval process.

![Datim Approvals](https://github.com/pepfar-datim/datim-approvals/raw/master/help/approvals.png)


## Technology Stack
1. REACT - all front-end rendering
2. Cypress - testing
3. TypeScript - instead of JSX we're using TSX to make the app more organized. TSX is a TypeScript implementation of REACT

## Installation for Development

1. `git clone`
2. `npm install`
3. Check `src/config/serverCondig.dev.js` and make sure you have access to the server listed.
4. Login to the server and go to System Configuration > Access and whitelist `localhost:3003`
5. Make sure you stayed logged in to the server in another browser tab.
6. `npm start`

## Description of directories

1. `src` REACT source code
2. `public` static files which will be part of `*.zip` build artifact
3. `cypress` JavaScript test specs. Testing is done using `Cypress`
4. `external` JS files used for rendering forms (datasets). These files are kept for reference only. They've been merged into two large files residing in `public/formJs`
