describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
    cy.get(":nth-child(3) > .container > .row > #utilities > h2");
    cy.get(":nth-child(3) > .container > .row > #utilities > h2");

  })
  it('pass 2', () => {
    cy.visit('https://example.cypress.io')
    cy.get(":nth-child(3) > .container > .row > #utilities > h2");
    cy.get(":nth-child(3) > .container > .row > #utilities > h2");
  })
})