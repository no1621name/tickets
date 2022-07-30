import { cy, before, expect, afterEach } from 'local-cypress';

describe('Favourites', () => {
  before(() => {
    cy.reachThePage();
  })
  afterEach(() => {
    cy.get('body').click();
  })
  it('When tikets did not add to favourites, favourites list display empty message', () => {
    cy.get('[data-test=favouritesTrigger]').as('favouritesButton');
    cy.get('@favouritesButton').click();

    cy.get('#dropdown1 .favourite-item:first').then(($div) => {
      expect($div.text()).to.contains('Вы не добавили еще ни одного билета в избранное')
    })
  })
  it('Correct add ticket to favourite list', () => {
    cy.intercept('GET', 'https://aviasales-api.herokuapp.com/prices/cheap*', { fixture:'tickets.json' })

    cy.initElements();
    cy.fillTheForm();

    cy.get('@submitButton').click();

    cy.get('[data-ticketind=0]').click();
    cy.get('[data-ticketind=1]').click();

    cy.get('[data-test=favouritesTrigger]').click();

    cy.get('#dropdown1 .favourite-item').should('have.length', 2);
  })
  it('Correct delete ticket from favourites list', () => {
    cy.get('[data-test=favouritesTrigger]').as('favouritesTrigger');

    cy.get('@favouritesTrigger').click();
    cy.get('#dropdown1 .favourite-item:first .delete-favourite').click();

    cy.get('@favouritesTrigger').click();
    cy.get('#dropdown1 .favourite-item').should('have.length', 1);
  })
})