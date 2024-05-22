describe('Issue deleting', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.visit(url + '/board');
      });
    });

    it('Test Case 1: Issue Deletion', () => {
        cy.get('[data-testid="board-list:backlog"]')
        .should('be.visible')
        .and('have.length', '1')
        .within(() => {
            // Assert that this list contains 3 issues and first element with tag p has specified text
            cy.get('[data-testid="list-issue"]')
            .should('have.length', '4') 
        });

        cy.contains('This is an issue of type: Task.').click();

        cy.get('[data-testid="modal:issue-details"]').within(() => {
            cy.get('[data-testid="icon:trash"]').click();

        });

        cy.get('[data-testid="modal:confirm"]').within(() => {
            cy.contains('Delete issue').click();
        });

        cy.wait(5000);

        cy.reload();

        cy.get('[data-testid="board-list:backlog"]')
        .should('be.visible')
        .and('have.length', '1')
        .within(() => {
            // Assert that this list contains 3 issues and first element with tag p has specified text
            cy.get('[data-testid="list-issue"]')
            .should('have.length', '3') 
        });

    });

});