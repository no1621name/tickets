import { cy, expect, before } from 'local-cypress';

describe('Form', () => {
  it('When visiting the home page,, the form should be visible', () => {
    cy.visit('/');
    //проверка видимости
    cy.get('[data-test=mainForm]').should('be.visible');
  })
  it('When typing a value into origin city autocomplete, this autocomplete is visible and has typed value', () => {
    //создание алиаса
    cy.get('[data-test=autocompleteOrigin]').as('autocompleteOrigin')

    cy.get('@autocompleteOrigin').should('be.visible');
    cy.get('@autocompleteOrigin').type('Москва');
    //проверка точного значения
    cy.get('@autocompleteOrigin').should('have.value', 'Москва');
  })
  it('When typing a value into destination city autocomplete, this autocomplete is visible and has typed value', () => {
    cy.get('[data-test=autocompleteDestination]').as('autocompleteDestination')

    cy.get('@autocompleteDestination').should('be.visible');
    cy.get('@autocompleteDestination').type('Архангельск');
    cy.get('@autocompleteDestination').should('have.value', 'Архангельск');
  })
  it('When clicking on the depart datepicker the datepicker modal should opens', () => {
    cy.get('[data-test=datepickerDepartInput]').as('datepickerDepartInput');
    cy.get('[data-test=datepickerDepartWrap] .datepicker-container').as('departModalWindow');

    cy.get('@datepickerDepartInput').click();
    cy.get('@departModalWindow').should('be.visible');
  })
  it('After selecting departing date, it should be displayed in the input field in the right format', () => {
    cy.get('[data-test=datepickerDepartWrap] .datepicker-container .is-today').as('today');
    cy.get('[data-test=datepickerDepartWrap] .datepicker-container .btn-flat').as('modalButtons');
    cy.get('[data-test=datepickerDepartInput]').as('datepickerDepartInput');

    cy.get('@today').click();
    cy.get('@today').should('have.class', 'is-selected');
    //нахождение элемента по его содержанию
    cy.get('@modalButtons').contains('Ok').click();
    //тут случай, когда мы не знаем точное значение
    cy.get('@datepickerDepartInput').then(($input: any) => {
      const val = $input.val();
      expect(val).to.match(/^\d{4}-\d{2}$/);
    });
  })
  it('When clicking on the return datepicker the datepicker modal should opens', () => {
    cy.get('[data-test=datepickerReturnInput]').as('datepickerReturnInput');
    cy.get('[data-test=datepickerReturnWrap] .datepicker-container').as('returnModalWindow');

    cy.get('@datepickerReturnInput').click();
    cy.get('@returnModalWindow').should('be.visible');
  })
  it('After selecting returning date, it should be displayed in the input field in the right format', () => {
    cy.get('[data-test=datepickerReturnWrap] .datepicker-container .is-today').as('today');
    cy.get('[data-test=datepickerReturnWrap] .datepicker-container .btn-flat').as('modalButtons');
    cy.get('[data-test=datepickerReturnInput]').as('datepickerReturnInput');

    cy.get('@today').click();
    cy.get('@today').should('have.class', 'is-selected');
    cy.get('@modalButtons').contains('Ok').click();
    cy.get('@datepickerReturnInput').then(($input: any) => {
      const val = $input.val();
      expect(val).to.match(/^\d{4}-\d{2}$/);
    });
  })
  it('When selecting currency from the header dropdown it should be changed in the header', () => {
    cy.get('[data-test=currencySelect] .dropdown-trigger').as('currencyTrigger');
    cy.get('[data-test=currencySelect] .dropdown-content li').as('currencyItem');

    cy.get('@currencyTrigger').click();
    cy.get('@currencyItem').contains('€ Euro').click();
    cy.get('@currencyTrigger').should('have.value', '€ Euro');
  })
})