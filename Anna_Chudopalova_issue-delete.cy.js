describe('Issue details: deleting', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
      cy.visit(url + '/board');
      cy.contains('This is an issue of type: Task.').click();
    });
  });

  it('Test Case 1: Issue Deletion - Should delete an issue and validate it successfully', () => {

    //Delete an issue by pressing the trash icon
    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('[data-testid="icon:trash"]').click()
    })

    //Confirm deletion by pressing "Delete issue"
    cy.get('[data-testid="modal:confirm"]').within(() => {
      cy.contains('Delete issue').click()
    })

    //Assert that the confirmation window is not visible anymore
    cy.get('[data-testid="modal:confirm"]').should('not.exist')

    //Assert that the issue is deleted and the list contains only 3 issues after 1 was deleted
    cy.reload()
    cy.get('[data-testid="board-list:backlog"]').should('be.visible').and('have.length', '1').within(() => {
      cy.get('[data-testid="list-issue"]').should('have.length', '3')
    })
  })


  it('Test Case 2:  Issue Deletion Cancellation - Should cancel deletion of an issue and validate it successfully', () => {

    //Delete an issue by pressing the trash icon
    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('[data-testid="icon:trash"]').click()
    })

    //Cancel deletion by pressing "Cancel"
    cy.get('[data-testid="modal:confirm"]').within(() => {
      cy.contains('Cancel').click()
    })

    //Assert that the confirmation window is not visible anymore
    cy.get('[data-testid="modal:confirm"]').should('not.exist')

    //Close the issue window
    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('[data-testid="icon:close"]').first().click()
    })

    //Assert that the issue is not deleted and the list contains 4 issues
    cy.reload()
    cy.get('[data-testid="board-list:backlog"]').should('be.visible').and('have.length', '1').within(() => {
      cy.get('[data-testid="list-issue"]').should('have.length', '4')
  })
})
})

