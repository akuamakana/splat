describe('login page', () => {
  beforeEach(() => {
    cy.intercept({ method: 'POST', url: `${Cypress.env('API_URL')}/auth/login` }).as('login');
    cy.visit('/login');
  });

  it('has a register link and redirects properly', () => {
    cy.get('[role=register]').should('have.text', 'Create an account');
    cy.get('[role=register]').click();
    cy.url().should('contain', '/register');
  });

  it('should have forgot password link', () => {
    cy.get('[role=forgot-password]').should('exist');
    cy.get('[role=forgot-password]').should('have.text', 'Reset password');
    cy.get('[role=forgot-password]').should('have.text', 'Reset password');
    cy.get('[role=forgot-password]').click();
    cy.url().should('contain', '/forgot-password');
  });

  it('logs in successfully with username', () => {
    cy.get('[role=usernameOrEmail]').type('test');
    cy.get('[role=password]').type('test');
    cy.get('[role=submit]').click();
    cy.wait('@login').then((xhr) => {
      expect(xhr.response?.statusCode).to.equal(200);
      expect(xhr.response?.body).to.equal(true);
    });
    cy.url().should('contain', '/home');
  });

  it('logs in successfully with email', () => {
    cy.get('[role=usernameOrEmail]').type('test@gmail.com');
    cy.get('[role=password]').type('test');
    cy.get('[role=submit]').click();
    cy.wait('@login').then((xhr) => {
      expect(xhr.response?.statusCode).to.equal(200);
      expect(xhr.response?.body).to.equal(true);
    });
    cy.url().should('contain', '/home');
  });

  it('fails to login with wrong username and displays error message', () => {
    cy.get('input[name="usernameOrEmail"]').type('asdfasfsda');
    cy.get('input[name="usernameOrEmail"]').should('have.value', 'asdfasfsda');
    cy.get('input[name="password"]').type('asdfasfsda');
    cy.get('input[name="password"]').should('have.value', 'asdfasfsda');
    cy.get('button[type="submit"]').click();
    cy.wait('@login').then((xhr) => {
      expect(xhr.response?.statusCode).to.equal(404);
      expect(xhr.response?.body).to.have.property('field');
      expect(xhr.response?.body).to.have.property('message');
    });
    cy.contains('User not found');
  });

  it('fails to login with wrong password and displays error message', () => {
    cy.get('input[name="usernameOrEmail"]').type('test');
    cy.get('input[name="password"]').type('asdfasfsda');
    cy.get('button[type="submit"]').click();
    cy.wait('@login').then((xhr) => {
      expect(xhr.response?.statusCode).to.equal(401);
      expect(xhr.response?.body).to.have.property('field');
      expect(xhr.response?.body).to.have.property('message');
    });
    cy.contains('Invalid password');
  });
});

export {};
