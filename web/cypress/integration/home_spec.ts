describe('home page', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('API_URL')}/auth/login`, {
      usernameOrEmail: 'test',
      password: 'test',
    });
    cy.visit('/home');
  });

  it('should have 3 graphs', () => {
    cy.get('[id$="-graph"]').should('have.length', 3);
  });
});

export {};
