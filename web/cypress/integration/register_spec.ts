/// <reference types="cypress" />

describe('register page', () => {
  const random = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  beforeEach(() => {
    cy.intercept({ method: 'POST', url: `${Cypress.env('API_URL')}/auth/register` }).as('register');
    cy.visit('/register');
  });

  it('should have login link', () => {
    cy.get('[role=login]').should('exist');
    cy.get('[role=login]').should('have.text', 'Login');
    cy.get('[role=login]').click();
    cy.url().should('include', '/login');
  });

  it('should have forgot password link', () => {
    cy.get('[role=forgot-password]').should('exist');
    cy.get('[role=forgot-password]').should('have.text', 'Reset password');
    cy.get('[role=forgot-password]').should('have.text', 'Reset password');
    cy.get('[role=forgot-password]').click();
    cy.url().should('include', '/forgot-password');
  });

  // SUCCEEDS: skipping for now
  it.skip('should register a new user', () => {
    cy.get('[role=first-name]').type('test');
    cy.get('[role=last-name]').type('test');
    cy.get('[role=email]').type(`${random}@gmail.com`);
    cy.get('[role=username]').type(random);
    cy.get('[role=password]').type('password');
    cy.get('[role=confirm-password]').type('password');
    cy.get('[role=submit]').click();
    cy.wait('@register').then((xhr) => {
      expect(xhr.response?.statusCode).to.equal(201);
      expect(xhr.response?.body).to.equal(true);
    });
    cy.url().should('include', '/login');
  });

  it('should get username taken error', () => {
    cy.get('[role=first-name]').type('test');
    cy.get('[role=last-name]').type('test');
    cy.get('[role=email]').type(`${random}@gmail.com`);
    cy.get('[role=username]').type('test');
    cy.get('[role=password]').type('password');
    cy.get('[role=confirm-password]').type('password');
    cy.get('[role=submit]').click();
    cy.wait('@register').then((xhr) => {
      expect(xhr.response?.statusCode).to.equal(400);
      expect(xhr.response?.body).to.have.property('field');
      expect(xhr.response?.body).to.have.property('message');
    });
    cy.contains('Username is already taken.');
  });

  it('should get username contains "@" error', () => {
    cy.get('[role=first-name]').type('test');
    cy.get('[role=last-name]').type('test');
    cy.get('[role=email]').type(`${random}@gmail.com`);
    cy.get('[role=username]').type('test@');
    cy.get('[role=password]').type('password');
    cy.get('[role=confirm-password]').type('password');
    cy.get('[role=submit]').click();
    cy.wait('@register').then((xhr) => {
      expect(xhr.response?.statusCode).to.equal(400);
      expect(xhr.response?.body).to.have.property('field');
      expect(xhr.response?.body).to.have.property('message');
    });
    cy.contains('Username cannot include @');
  });

  it('should get username is not long enough error', () => {
    cy.get('[role=first-name]').type('test');
    cy.get('[role=last-name]').type('test');
    cy.get('[role=email]').type(`123@gmail.com`);
    cy.get('[role=username]').type('123');
    cy.get('[role=password]').type('password');
    cy.get('[role=confirm-password]').type('password');
    cy.get('[role=submit]').click();
    cy.wait('@register').then((xhr) => {
      expect(xhr.response?.statusCode).to.equal(400);
      expect(xhr.response?.body).to.have.property('field');
      expect(xhr.response?.body).to.have.property('message');
    });
    cy.contains('Username must be more than 3 characters');
  });

  it('should get email in use error', () => {
    cy.get('[role=first-name]').type('test');
    cy.get('[role=last-name]').type('test');
    cy.get('[role=email]').type(`test@gmail.com`);
    cy.get('[role=username]').type(`${random}211`);
    cy.get('[role=password]').type('password');
    cy.get('[role=confirm-password]').type('password');
    cy.get('[role=submit]').click();
    cy.wait('@register').then((xhr) => {
      expect(xhr.response?.statusCode).to.equal(400);
      expect(xhr.response?.body).to.have.property('field');
      expect(xhr.response?.body).to.have.property('message');
    });
    cy.contains('Email is already in use.');
  });

  it('should get email does not contain "@" error', () => {
    cy.get('[role=first-name]').type('test');
    cy.get('[role=last-name]').type('test');
    cy.get('[role=email]').type(`${random}gmail.com`);
    cy.get('[role=username]').type(`${random}211`);
    cy.get('[role=password]').type('password');
    cy.get('[role=confirm-password]').type('password');
    cy.get('[role=submit]').click();
    cy.wait('@register').then((xhr) => {
      expect(xhr.response?.statusCode).to.equal(400);
      expect(xhr.response?.body).to.have.property('field');
      expect(xhr.response?.body).to.have.property('message');
    });
    cy.contains('Invalid email');
  });

  it('should get password is not long enough error', () => {
    cy.get('[role=first-name]').type('test');
    cy.get('[role=last-name]').type('test');
    cy.get('[role=email]').type(`${random}2123@gmail.com`);
    cy.get('[role=username]').type(`${random}211`);
    cy.get('[role=password]').type('p');
    cy.get('[role=confirm-password]').type('p');
    cy.get('[role=submit]').click();
    cy.wait('@register').then((xhr) => {
      expect(xhr.response?.statusCode).to.equal(400);
      expect(xhr.response?.body).to.have.property('field');
      expect(xhr.response?.body).to.have.property('message');
    });
    cy.contains('Password must be more than 3 characters');
  });

  it('should get password does not match error', () => {
    cy.get('[role=first-name]').type('test');
    cy.get('[role=last-name]').type('test');
    cy.get('[role=email]').type(`${random}2123@gmail.com`);
    cy.get('[role=username]').type(`${random}211`);
    cy.get('[role=password]').type('password');
    cy.get('[role=confirm-password]').type('password1');
    cy.get('[role=submit]').click();
    cy.contains('Passwords do not match');
  });
});

export {};
