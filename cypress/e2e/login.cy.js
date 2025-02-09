describe('Login Feature', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should login successfully with valid credentials', () => {
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('Password123!');
    cy.get('button[type="submit"]').click();

    // Verify successful login
    cy.url().should('include', '/dashboard'); 
    cy.contains('Welcome, Test User').should('be.visible');
  });

  it('should show an error message for an invalid password', () => {
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid email or password').should('be.visible');
  });
});