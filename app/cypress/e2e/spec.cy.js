describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })

  it('deployed react app to localhost', () => {
    cy.visit('http://localhost:3000')
    cy.contains('1 user(s) already registered')
  })
  
})