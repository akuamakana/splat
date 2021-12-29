describe('manage users page', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('API_URL')}/auth/login`, {
      usernameOrEmail: 'test',
      password: 'test',
    });
    cy.visit('/manage-users');
  });

  it('should change kion role', () => {
    cy.get('[id=select-user]').select('7');
    cy.get('[id=select-role]').select('MANAGER');
    cy.get('[role=submit]').click();
    cy.get('[id=select-role]').select('ADMIN');
    cy.get('[id=select-user]').select('7');
    cy.get('[role=submit]').click();
  });

  it('should render user not found', () => {
    cy.get('[id=select-role]').select('MANAGER');
    cy.get('[role=submit]').click();
    cy.contains('User not found');
  });

  it('should render user not found', () => {
    cy.get('[id=select-user]').select('7');
    cy.get('[role=submit]').click();
    cy.contains('Invalid role value');
  });

  it('should filter table', () => {
    cy.get('[data-testid=user-table-row]').should('have.length.above', 1);
    cy.get('[role=user-filter]').type('kion');
    cy.get('[data-testid=user-table-row]').should('have.length', 1);
  });
});

export {};
