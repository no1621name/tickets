/// <reference types="cypress" />

import {cy, Cypress} from 'local-cypress';
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
declare global{
  namespace Cypress {
    interface Chainable {
      reachThePage(): void,
      initElements(): void,
      fillTheForm(): void
    }
  }
}
//при помощи команд в cypress можно объявлять переиспользюмые методы, которые будут доступны через cy.
Cypress.Commands.addAll({
  reachThePage() {
    //подмена данных с серврера
    cy.intercept('GET', 'https://aviasales-api.herokuapp.com/countries', { fixture: 'countries.json' }).as('getCountires');
    cy.intercept('GET', 'https://aviasales-api.herokuapp.com/cities', { fixture: 'cities.json' }).as('getCities');
    cy.intercept('GET', 'https://aviasales-api.herokuapp.com/airlines', { fixture: 'airlines.json' }).as('getAirlines');

    cy.visit('/');
    //позволяет делать задержки/ожидать чего-то
    cy.wait('@getCountires');
    cy.wait('@getCities');
    cy.wait('@getAirlines');
  },
  initElements() {
    cy.get('[data-test=autocompleteOrigin]').as('autocompleteOrigin');
    cy.get('[data-test=autocompleteDestination]').as('autocompleteDestination');
    cy.get('[data-test=datepickerDepartInput]').as('datepickerDepartInput');
    cy.get('[data-test=datepickerDepartWrap] .datepicker-container').as('departModalWindow');
    cy.get('[data-test=datepickerReturnInput]').as('datepickerReturnInput');
    cy.get('[data-test=datepickerReturnWrap] .datepicker-container').as('returnModalWindow');

    cy.get('[data-test=submitButton]').as('submitButton');
    cy.get('[data-test=resetButton]').as('resetButton');
  },
  fillTheForm() {
    cy.get('@resetButton').click();

    cy.get('@autocompleteOrigin').type('Харьков');
    cy.get('.field-origin .autocomplete-content li:first').contains('Харьков, Украина').click();

    cy.get('@autocompleteDestination').type('Париж');
    cy.get('.field-destination .autocomplete-content li:first').contains('Париж, Франция').click();

    cy.get('@datepickerDepartInput').click();
    cy.get('@departModalWindow').should('be.visible');

    cy.get('[data-test=datepickerDepartWrap] .datepicker-container .is-today').as('today');
    cy.get('[data-test=datepickerDepartWrap] .datepicker-container .btn-flat').as('modalButtons');

    cy.get('@today').click();
    cy.get('@today').should('have.class', 'is-selected');
    cy.get('@modalButtons').contains('Ok').click();
  }
});