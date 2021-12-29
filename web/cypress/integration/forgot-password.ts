describe('forgot password page', () => {
  beforeEach(() => {
    cy.visit('/forgot-password');
    cy.intercept({ method: 'POST', url: `${Cypress.env('API_URL')}/auth/forgot-password` }).as('forgot-password');
  });

  it('should have email input', () => {
    cy.get('[role=email]').should('exist');
  });

  it('should have working login link', () => {
    cy.get('[role=login]').click();
    cy.url().should('contain', '/login');
  });

  it('should render toast', () => {
    cy.get('[role=email]').type('jest@gmail.com');
    cy.get('[role=submit]').click();
    cy.wait('@forgot-password').then((xhr) => {
      expect(xhr.response?.statusCode).to.equal(200);
      expect(xhr.response?.body).to.have.property('message');
      expect(xhr.response?.body.message).to.equal('Reset password link sent to email address. Link expires in 24 hours.');
      expect(cy.contains('Reset password link sent to email address. Link expires in 24 hours.'));
    });
  });
});

export {};
