import testUser from '@mocks/test-user';
describe('home page', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('API_URL')}/auth/login`, testUser);
    cy.visit('/home');
  });

  it('should have 3 graphs', () => {
    cy.get('[id$="-graph"]').should('have.length', 3);
  });
});

export {};
