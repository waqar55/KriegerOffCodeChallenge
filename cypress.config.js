const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'j2trju',
  env :
  {
    url : "https://www.deinbett.de/",
    "MAILOSAUR_API_KEY": "IKMwmWEw2a6QZJEb"
  },
  defaultCommandTimeout: 4000,
  pageLoadTimeout: 60000,
  chromeWebSecurity: false,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'mochawesome',
    mochawesomeReporterOptions: {
      reportDir: 'cypress/reports/mocha',
      quite: true,
      overwrite: false,
      html: false,
      json: true,
    },
  },
  
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    // specPattern: 'cypress/Integration/**/*.{feature,features}',
    specPattern : "**/*.{feature,features}"
  },
  
})
