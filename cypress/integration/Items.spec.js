describe('Items', () => {
  before(() => {
    cy.login();
    cy.visit('/home');

    //create item to test
    const newList = "Test Only123"
    cy.get('[aria-describedby=newListHelp]').type(newList)
    cy.get('[data-test=new-list-submit]').click()
    //create item to test
    const newItem = "Item123"
    cy.get('[data-test=list-list]').click()
    cy.get('[aria-describedby=newItemHelp]').type(newItem)
    cy.get('[data-test=new-item-submit]').click()
  })

  it('adds item and immediately shows', () => {
    cy.callRtdb('get', 'items/')
      .then(items => {
        cy.getItem(Object.values(items))
        .then(item => {
          cy.get('[data-test=list-item]').should('contain', 'Item123')

          cy.wrap(item)
            .its('item')
            .should('equal', 'Item123')
        })
      })
  })

  // it('toggles purchased & item moves to purchased list', () => {
  //   cy.get('[data-test=item-checkbox]').click()
  //
  //   cy.get('[data-test=show-purchased-btn]').click()
  //
  //   cy.get('data-test=list-item').should('exist')
  //
  //   cy.get('[data-test=item-checkbox]').click()
  //
  //   cy.get('data-test=list-item').should('not.exist')
  //
  //   cy.get('[data-test=show-items-btn]').click()
  // })

  it('brings up edit option & edits then deletes', () => {
    cy.get('[data-test=edit-item-btn]').click();

    cy.get('[aria-describedby=editItemHelp]').type('Item1234')
    cy.get('[data-test=edit-item-submit]').click()

    cy.get('[data-test=list-item]').should('contain', 'Item1234')

    cy.get('[data-test=delete-item-btn]').click()

    cy.callRtdb('get', 'items/')
      .then(items => {
        cy.getItem(Object.values(items))
        .then(item => {
          cy.expect(item).to.be.undefined
      })
    })

    cy.get('[data-test=toggle-edit-btn]').click()
    cy.get('[data-test=delete-list-btn]').click()
  })

})
