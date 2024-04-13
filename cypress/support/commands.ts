/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

Cypress.Commands.add("getByCy", (selector: string, ...args: any) => {
  return cy.get(`[data-cy=${selector}]`, ...args);
});

Cypress.Commands.add("login", (email: string, password: string) => {
  cy.session([email, password], () => {
    cy.request({
      url: `${Cypress.env("API_URL")}/auth/login`,
      method: "POST",
      body: { email, password },
    })
      .its("body")
      .then((body) => {
        window.localStorage.setItem("_paintrack_token", body.token);
      });
  });
});

Cypress.Commands.add("clearUserData", (email: string, password: string) => {
  cy.request({
    url: `${Cypress.env("API_URL")}/auth/login`,
    method: "POST",
    body: { email, password },
  })
    .its("body")
    .then((body) => {
      cy.request({
        url: `${Cypress.env("API_URL")}/tests/clear-user`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${body.token}`,
        },
      });
    });
});

Cypress.Commands.add("addSubjectTo", (email: string, password: string) => {
  cy.request({
    url: `${Cypress.env("API_URL")}/auth/login`,
    method: "POST",
    body: { email, password },
  })
    .its("body")
    .then((body) => {
      cy.request({
        url: `${Cypress.env("API_URL")}/patient`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${body.token}`,
        },
      })
        .its("body")
        .then((body) => {
          cy.wrap(body);
        });
    });
});

declare namespace Cypress {
  interface Chainable {
    login(email: string, password: string): Chainable<void>;
    clearUserData(email: string, password: string): Chainable<void>;
    addSubjectTo(email: string, password: string): Chainable<any>;
    getByCy(selector: string, ...args: any): Chainable<JQuery<HTMLElement>>;
  }
}
