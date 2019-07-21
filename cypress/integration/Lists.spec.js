describe('Lists', () => {
  before(() => {
    cy.login();
    cy.visit('/home');

    //create list to test
    const newList = "Test Only123"
    cy.get('[aria-describedby=newListHelp]').type(newList)
    cy.get('[data-test=new-list-submit]').click()
  })

  it('adds list and immediately shows', () => {
    cy.callRtdb('get', 'lists/')
      .then(lists => {
        cy.getList(Object.values(lists))
        .then(list => {
          cy.get('[data-test=list-list]').should('contain', 'Test Only123')

          cy.wrap(list)
            .its('list')
            .should('equal', 'Test Only123')
        })
      })
  })

  it('shows edit list options when button is pressed', () => {
    cy.get('[data-test=toggle-edit-btn]').click()

    cy.get('[data-test=edit-list-btn]').should('exist')
    cy.get('[data-test=delete-list-btn]').should('exist')
  })

  it('brings up edit option & edits then deletes', () => {
    cy.get('[data-test=edit-list-btn]').click();

    cy.get('[aria-describedby=editListHelp]').type('Test Only1234')
    cy.get('[data-test=edit-list-submit]').click()

    cy.get('[data-test=list-list]').should('contain', 'Test Only1234')

    cy.get('[data-test=toggle-edit-btn]').click()
    cy.get('[data-test=delete-list-btn]').click()
    cy.get('[data-test=list-list]').should('not.contain', 'Test Only1234')

      cy.callRtdb('get', 'lists/')
        .then(lists => {
          cy.getList(Object.values(lists))
          .then(list => {
            cy.expect(list).to.be.undefined
        })
      })
  })

})
