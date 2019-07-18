describe('Home Page', () => {
  describe('when not authenticated', () => {
    before(() => {
      cy.visit('/home')
    })

    it('redirects to landing (/)', () => {
      cy.url().should('equal', 'http://localhost:3000/')
    });
  })

  describe('when authenticated', () => {
    before(() => {
      cy.login()

      cy.visit('/home')
    })

    it('does not redirect', () => {
      cy.url().should('equal', 'http://localhost:3000/home')
    })

    it('shows list & items categories', () => {
      cy.get('[data-test=lists-header]').contains("Lists");
      cy.get('[data-test=items-header]').contains("Items");
    })

    it('logs out & redirects to landing', () => {
      cy.get('.navbar-inline').click();

      cy.url().should('equal', 'http://localhost:3000/')
    })
  })

});
