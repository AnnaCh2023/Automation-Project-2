// We don't want to waste time when running e2e on cypress waiting for debounced
// inputs. We can use tick() to speed up time and trigger onChange immediately.
Cypress.Commands.add('debounced', { prevSubject: true }, (input, action, value) => {
    cy.clock();
    cy.wrap(input)[action](value);
    cy.tick(1000);
});


Cypress.Commands.add('createIssue', (title, description) => {
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get('.ql-editor').type(description);
      cy.get('input[name="title"]').type(title);
      cy.get('button[type="submit"]').click();
    });
  });

Cypress.Commands.add('clickFirstIssueWithText', (text) => {
    cy.get('[data-testid="board-list:backlog"]')
      .should('be.visible')
      .and('have.length', 1)
      .within(() => {
        cy.get('[data-testid="list-issue"]')
          .first()
          .find('p')
          .contains(text)
          .click();
      });
  });

  Cypress.Commands.add('clickCloseIcon', () => {
    cy.get('[data-testid="icon:close"]').click();
  });
