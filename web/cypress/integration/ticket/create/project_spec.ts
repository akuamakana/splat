import random from '@mocks/random';
import testUser from '@mocks/test-user';

describe('create ticket page', () => {
  before(() => {
    cy.intercept({ method: 'POST', url: `${Cypress.env('API_URL')}/ticket` }).as('create-ticket');
    describe('from tickets page', () => {
      beforeEach(() => {
        cy.request('POST', `${Cypress.env('API_URL')}/auth/login`, testUser);
        cy.visit('/tickets');
      });

      it('should return with cancel button', () => {
        cy.get('[role=create-ticket]').click();
        cy.url().should('contain', '/ticket/create');
        cy.get('[role=cancel]').click();
        cy.url().should('contain', '/tickets');
      });

      it('should create ticket from tickets page', () => {
        cy.get('[role=create-ticket]').click();
        cy.url().should('contain', '/ticket/create');
        cy.get('[role=title]').type(random);
        cy.get('[role=description]').type(random);
        cy.get('#select-project').select('Splat');
        cy.get('[role=submit]').click();
      });
    });
    describe.only('from project page', () => {
      beforeEach(() => {
        cy.request('POST', `${Cypress.env('API_URL')}/auth/login`, testUser);
        cy.visit('/project/27');
      });

      it('should return with cancel button', () => {
        cy.get('[role=create-ticket-button]').click();
        cy.url().should('contain', '/ticket/create?id=27');
        cy.get('[role=cancel]').click();
        cy.url().should('contain', '/project/27');
      });

      it('should create ticket from project page', () => {
        cy.get('[role=create-ticket-button]').click();
        cy.url().should('contain', '/ticket/create?id=27');
        cy.get('[role=title]').type(random);
        cy.get('[role=description]').type(random);
        cy.get('[role=submit]').click();
      });
    });
  });
});

export {};
