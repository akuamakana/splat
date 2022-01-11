import random from '@mocks/random';
import testUser from '@mocks/test-user';

describe('ticket view page', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('API_URL')}/auth/login`, testUser);
    cy.visit('/ticket/26');
  });

  it('should have 3 cards', () => {
    cy.get('[id=ticket-detail]').should('exist');
    cy.get('[id=comments]').should('exist');
    cy.get('[id=history]').should('exist');
  });

  it('should add a new comment', () => {
    cy.get('[role=input-comment]').type(random);
    cy.get('[role=add-comment]').click();
    cy.get('[data-testid="comment-table-row"]').should('have.length.above', 1);
  });

  it('should filter comments', () => {
    cy.get('[role=comment-filter]').type('hello');
    cy.get('[data-testid="comment-table-row"]').should('have.length', 1);
  });

  it('should filter history', () => {
    cy.get('[data-testid=history-table-row]').should('have.length.above', 1);
    cy.get('[role=history-filter]').type('priority');
    cy.get('[data-testid=history-table-row]').should('have.length', 1);
  });

  it('should redirect to edit ticket', () => {
    cy.get('[role=edit-ticket-button]').click();
    cy.url().should('include', '/ticket/edit/26');
  });
});

export {};
