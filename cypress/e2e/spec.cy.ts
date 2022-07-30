import {cy, expect, before} from 'local-cypress';

describe('empty spec', () => {
  before(() => {
    //команды консоли можео запускать прямо отсюда
    // cy.exec('npm run serve', {failOnNonZeroExit: false});
  })
  it('passes', () => {
    cy.log('test log')
    cy.log('**test log2**')
    cy.log('***test log3***')
    cy.visit('/');
    //запрос на реальный сервер
    // cy.request('https://aviasales-api.herokuapp.com/countries');
    //.warp - оболочка для объектов и промисов
    //.its - возвращает значение по переданому ключу
    cy.wrap({ name: 'Geo' }).its('name');

    const obj = {
      func: () => console.log('some')
    };
    obj.func();
    cy.stub(obj, 'func', () => console.log('stubbed'))
    obj.func();
    const spy = cy.stub();
    //можно будет увидеть переданные аргументы
    spy(123);
    expect(spy).to.be.called;
    expect(1).to.eq(1);
    //.and - допбавляет условия
    cy.get('[data-test=submitButton]').should('be.visible').and(($btn) => expect($btn.text()).contains('Sea'))
    cy.get('[data-test=submitButton]').should('be.visible').and('not.be.disabled');
  })
  it.skip('skipped test 1')
  it('skipped test 2')
  xit('skipped test 3')
})





