// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:

import "./utils/contains"
import "./utils/visit"
import "./login/login"
import "./pages/list"
import "./pages/action"
import "./api/mechanism"
import "./api/reset"

// enable stubbing
Cypress.on('window:before:load', (win) => { win.fetch = null; });

