describe('tickets page', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('API_URL')}/auth/login`, {
      usernameOrEmail: 'test',
      password: 'test',
    });
    cy.visit('/tickets');
  });

  it('should have more than 1 ticket', () => {
    cy.get('[data-testid=ticket-table-row]').should('have.length.above', 1);
  });

  it('should filter project table', () => {
    cy.get('[role=ticket-filter]').type('26');
    cy.get('[data-testid=ticket-table-row]').should('have.length', 1);
  });

  it('should redirect to create ticket page', () => {
    cy.get('[role=create-ticket]').click();
    cy.url().should('contain', '/ticket/create');
  });
});

export {};
