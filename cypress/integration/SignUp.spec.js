describe('Sign Up', () => {
  before(() => {
    cy.logout()
    cy.visit('/');
    cy.get('[data-test=signup-component]').click()
  })

  after(() => {
    cy.wait(500)
    cy.getUser()
      .then(user => {
        cy.callRtdb('remove', `users/${user.uid}`)
        user.delete()
        cy.log("fake user deleted")
      })
  })

  it('shows Sign Up pop-up', () => {
    cy.get('[data-test=signup-header]').contains('Sign Up');
  })

  it('does not let a previously used username to sign up', () => {
    const oldUsername = "tester123"
    const newEmail = "new@example.com"
    const newPassword = "test123"
    const newConfirm = "test123"

    cy.get('[data-test=signup-username]').type(oldUsername);
    cy.get('[data-test=signup-email]').type(newEmail);
    cy.get('[data-test=signup-password]').type(newPassword);
    cy.get('[data-test=signup-pass-confirm]').type(newConfirm);
    cy.get('[data-test=signup-submit]').click();

    cy.get('[data-test=signup-error]').should('contain', 'Username already exists')
    cy.get('[data-test=signup-username]').clear();
  })

  it('user can sign up with proper credentials', () => {

    const newUsername = "Username"

    cy.get('[data-test=signup-username]').type(newUsername);
    cy.get('[data-test=signup-submit]').click();

    cy.get('#signout-component').should('exist')
    cy.get('[data-test=user-greeting]').should('contain', newUsername)
  })
})
