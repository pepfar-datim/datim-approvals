# DATIM Approvals v2

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
3. Check `src/config/serverConfig.dev.js` and make sure you have access to the server listed.
4. Login to the server and go to System Configuration > Access and whitelist `localhost:3003`
5. Make sure you stayed logged in to the server in another browser tab.
6. `npm start`

## Description of directories

1. `src` REACT source code
2. `public` static files which will be part of `*.zip` build artifact
3. `cypress` JavaScript test specs. Testing is done using `Cypress`
4. `external` JS files used for rendering forms (datasets). These files are kept for reference only. They've been merged into two large files residing in `public/formJs`

## Setting up a testing suite
The Data Approvals app is covered by end-to-end tests implemented using `Cypress` test framework.
Before each deployment to production the developer should run these tests and make sure all of them are passing.

However, in order to make the tests pass. It might be necessary to set up the data in the server environment first.
The tests depend on the following.

1. Testing user accounts
2. Datastore settings
3. A few mechanisms
4. Collected data via data entry app

There are the following scripts inside `testData` directory which should set the target environment to a state where all tests will pass:

1. `users/persistUsers.py` 
2. `datastore/fixDataStore.py`
3. `mechanism/submitMechanisms.py`
4. `dataEntry/data.sql`

Surrounding files are there to get data into source files (such as users.json or getData.sql) and should be kept in this repository. Although not needed to setup the tests.

Make sure to define these variables: 

```sh
export DHIS_BASEURL=...
export DHIS_USERNAME=...
export DHIS_PASSWORD=...
export CYPRESS_TEST_PASSWORD=...
```

See `testData/api.py` for more details.

## Deploying
If you are deploying to your own server you can run `npm run-scripts build` and upload the resulting zip file to your DHIS2 instance.

For a production release there are a few more steps:

1. Make sure tests are passing
2. Update `packages.json` to increment version number
3. Create the zip file: `npm run-scripts build`
4. Tag the release in github and upload the zip file
5. Make deploy script utilizing `src/lib/libAppRepairs.sh`

```sh
#!/usr/bin/env bash
source ../../src/lib/libAppRepairs.sh
APPROVAL_APP_VERSION="x.y.z"
printInfo 'Deleting the old Approvals App'
deleteOldVersion "Data-Approval"
installApp "Data-Approval" $APPROVAL_APP_VERSION
exit 0
```
