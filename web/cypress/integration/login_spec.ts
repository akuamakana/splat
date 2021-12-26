
describe('login page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('logs in successfully', () => {
    cy.get('[role=usernameOrEmail]').type('test');
    cy.get('[role=password]').type('test');
    cy.get('[role=submit]').click();
    // TODO: should redirect to home page
  });

  it('has a register link and redirects properly', () => {
    cy.get('[role=register]').should('contain', 'Register');
    cy.get('[role=register]').click();
    cy.url().should('include', '/register');
  });

  it('fails to login with wrong username and displays error message', () => {
    cy.get('input[name="usernameOrEmail"]').type('asdfasfsda');
    cy.get('input[name="usernameOrEmail"]').should('have.value', 'asdfasfsda');
    cy.get('input[name="password"]').type('asdfasfsda');
    cy.get('input[name="password"]').should('have.value', 'asdfasfsda');
    cy.get('button[type="submit"]').click();
    cy.get('#field-2-feedback').should('contain', 'User not found');
  });

  it('fails to login with wrong password and displays error message', () => {
    cy.get('input[name="usernameOrEmail"]').type('test');
    cy.get('input[name="password"]').type('asdfasfsda');
    cy.get('button[type="submit"]').click();
    cy.get('#field-4-feedback').should('contain', 'Invalid password');
  });

  // TODO: test forgot password link
});

export {};
