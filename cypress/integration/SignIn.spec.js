describe('Sign In', () => {
  before(() => {
    cy.logout()
    cy.visit('/');
    cy.get('[data-test=signin-component]').click()
  })

  afterEach(() => {
    cy.logout()
  })

  it('shows Sign In pop-up', () => {
    cy.get('[data-test=signin-header]').contains('Sign In');
  })

  it('should not allow user with incorrect credentials to sign in', () => {
    const username = 'tester123'
    const password = 'bloop'

    cy.get('[data-test=signin-username]').type(username);
    cy.get('[data-test=signin-password]').type(password);
    cy.get('[data-test=signin-submit]').click();

    cy.url().should('equal', 'http://localhost:3000/')
    cy.get('[data-test=signin-password]').clear();
  })

  it('User can sign in', () => {

    const username = 'tester123'
    const password = 'test123'

    cy.get('[data-test=signin-password]').type(password);
    cy.get('[data-test=signin-submit]').click();

    cy.get('#signout-component').should('exist')
    cy.get('[data-test=user-greeting]').should('contain', username)
  })
})
