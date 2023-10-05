describe('Time tracking', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
        cy.visit(url + '/board?modal-issue-create=true');
      });
    });

    it('Time estimation functionality: add, update and remove estimation', () => {
        //creating an issue for further actions
        cy.createIssue('Time', 'Test for time tracking')
        
        //asseting there's no any value in the field
        cy.clickFirstIssueWithText('Time')
        cy.get('div').contains('No time logged').should('exist').and('be.visible')
        
        //adding value 10
        cy.get('[placeholder="Number"]').should('be.empty')
                .click()
                .type(10)
                .wait(2000)
        cy.clickCloseIcon()

        //assering the added value is visible
        cy.clickFirstIssueWithText('Time')
        cy.get('div').contains('10h estimated').should('exist').and('be.visible')
        
        //updating the value from 10 to 20
        cy.get('[placeholder="Number"]').should('have.value', '10')
                .click()
                .clear()
                .type(20)
                .wait(2000)
        cy.clickCloseIcon()

        //assering the updated value is visible
        cy.clickFirstIssueWithText('Time')
        cy.get('div').contains('20h estimated').should('exist').and('be.visible')

        //removing the value
        cy.get('[placeholder="Number"]').should('have.value', '20')
                .click()
                .clear()
                .wait(2000)
        cy.clickCloseIcon()

        //assering the value is removed
        cy.clickFirstIssueWithText('Time')
        cy.get('div').contains('20h estimated').should('not.exist')
    })


    it('Time logging functionality: add and remove logged time', () => {
        //creating an issue & adding value for further actions
        cy.createIssue('Time', 'Test for time tracking')
        cy.clickFirstIssueWithText('Time')
        cy.get('[placeholder="Number"]').should('be.empty')
                .click()
                .type(10)
                .wait(2000)
        
        //adding logged & remaining values
        cy.get('[data-testid="icon:stopwatch"]').should('exist').and('be.visible')
                .click()

        cy.get('[data-testid="modal:tracking"]').should('exist').within(() => {
        cy.get('[placeholder="Number"]').eq(0).should('have.attr', 'placeholder', 'Number')
                .click()
                .type(2)
                .wait(2000)
    
        cy.get('[placeholder="Number"]').eq(1).should('have.attr', 'placeholder', 'Number')
                .click()
                .type(5)
                .wait(2000)
    
        cy.get('button').contains('Done').should('exist').and('be.visible')
                .click()
        })

        //asserting the added values are visible
        cy.get('[data-testid="modal:issue-details"]').within(() => {
        cy.get('div').contains('No time logged').should('not.exist')
        cy.get('div').contains('2h logged').should('exist').and('be.visible')
        cy.get('div').contains('5h remaining').should('exist').and('be.visible')
        })

        //removing logged & remaining values
        cy.get('[data-testid="icon:stopwatch"]').should('exist').and('be.visible')
                .click()

        cy.get('[data-testid="modal:tracking"]').should('exist').within(() => {
        cy.get('[placeholder="Number"]').eq(0).should('have.attr', 'placeholder', 'Number')
                .click()
                .clear()
                .wait(2000)
    
        cy.get('[placeholder="Number"]').eq(1).should('have.attr', 'placeholder', 'Number')
                .click()
                .clear()
                .wait(2000)
    
        cy.get('button').contains('Done').should('exist').and('be.visible')
                .click()
        })

        //asserting the values are removed
        cy.get('[data-testid="modal:issue-details"]').within(() => {
            cy.get('div').contains('No time logged').should('exist').and('be.visible')
            cy.get('div').contains('2h logged').should('not.exist')
            cy.get('div').contains('5h remaining').should('not.exist')
            })

    })
})

