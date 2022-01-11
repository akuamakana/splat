import testUser from '@mocks/test-user';

describe('projects page', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('API_URL')}/auth/login`, testUser);
    cy.visit('/projects');
  });

  it('should have more than 1 project', () => {
    cy.get('[data-testid=project-table-row]').should('have.length.above', 1);
  });

  it('should filter project table', () => {
    cy.get('[role=project-filter]').type('splat');
    cy.get('[data-testid=project-table-row]').should('have.length', 1);
  });
});

export {};
