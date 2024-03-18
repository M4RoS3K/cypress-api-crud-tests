const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://calm-plum-jaguar-tutu.cyclic.app/todos",
    specPattern: "cypress/integration/*.cy.js"
  },
  
});