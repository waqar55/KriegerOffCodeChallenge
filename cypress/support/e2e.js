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
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')


require('cypress-xpath')

const addContext = require('mochawesome/addContext')

Cypress.on('test:after:run', (test, runnable) => {
    // cy.writeFile('E:/sample.txt',test.state + " Passed");
    if (test.state === 'failed') {
        var txt = `${runnable.parent.title} -- ${test.title} ${Cypress.spec.name}`;
        // cy.writeFile('E:/sample.txt',txt + " Failed");
        const screenshotFileName = `${runnable.parent.title} -- ${test.title} (failed).png`
        addContext({ test }, `assets/${Cypress.spec.name}/${screenshotFileName}`)
    }
    else{
        var txt = `${runnable.parent.title} -- ${test.title} ${Cypress.spec.name}`;
        // cy.writeFile('E:/sample.txt',txt + " Passed");
    }
})


