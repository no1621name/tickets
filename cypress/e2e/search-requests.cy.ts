import { cy, expect, before } from 'local-cypress';
import { CyHttpMessages } from 'cypress/types/net-stubbing';

describe('Test search request', () => {
  //при помощи жизненных циклов можно обеспечить независимость тетсов друг от друга
  //и сделть их чище
  before(() => {
    //пример использования команды
    cy.reachThePage();
  })

  beforeEach(() => {
    cy.initElements();

    cy.fillTheForm();
  })

  it('Form submit with correct request params', () => {
    cy.intercept('GET', 'https://aviasales-api.herokuapp.com/prices/cheap*', (req: CyHttpMessages.IncomingHttpRequest) => {
      expect(req.query.currency).to.equal('USD');
      expect(req.query.depart_date).to.match(/^\d{4}-\d{2}$/);
      expect(req.query.origin).to.equal('HRK');
      expect(req.query.destination).to.equal('PAR');
    });

    cy.get('@submitButton').click();
  })
  it('Tickets display correctly', () => {
    cy.intercept('GET', 'https://aviasales-api.herokuapp.com/prices/cheap*', { fixture:'tickets.json' })

    cy.get('@submitButton').click();

    cy.get('[data-test=ticketsContainer]').as('ticketsContainer');
    cy.get('@ticketsContainer').find('.ticket-card').should('have.length', 2)
  })
  it('API request contains changed currency', () => {
    cy.intercept('GET', 'https://aviasales-api.herokuapp.com/prices/cheap*', (req: CyHttpMessages.IncomingHttpRequest) => {
      expect(req.query.currency).to.equal('EUR');
    });

    cy.get('[data-test=currencySelect] .dropdown-trigger').as('currencyTrigger');
    cy.get('[data-test=currencySelect] .dropdown-content li').as('currencyItem');

    cy.get('@currencyTrigger').click();
    cy.get('@currencyItem').contains('€ Euro').click();

    cy.get('@submitButton').click();
  })
  it('UI contains changed currency', () => {
    cy.intercept('GET', 'https://aviasales-api.herokuapp.com/prices/cheap*', { fixture:'tickets.json' })

    cy.get('[data-test=currencySelect] .dropdown-trigger').as('currencyTrigger');
    cy.get('[data-test=currencySelect] .dropdown-content li').as('currencyItem');

    cy.get('@currencyTrigger').click();
    cy.get('@currencyItem').contains('€ Euro').click();

    cy.get('@submitButton').click();

    cy.get('[data-test=ticketsContainer] .ticket-card .ticket-price').then(($span) => {
      expect($span.text()).contains('€')
    });
  })
});