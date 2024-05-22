describe('Issue deleting', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.visit(url + '/board');
      });
    });

    it('Test Case 1: Issue Deletion', () => {
        // Assert list is visible
        cy.get('[data-testid="board-list:backlog"]')
        .should('be.visible')
        .and('have.length', '1')
        .within(() => {
            // Assert that this list contains 4 issues 
            cy.get('[data-testid="list-issue"]')
            .should('have.length', '4') 
        });

        // Click on issue to be deleted
        cy.contains('This is an issue of type: Task.').click();

        // Click on the trash icon to delete said issue
        cy.get('[data-testid="modal:issue-details"]').within(() => {
            cy.get('[data-testid="icon:trash"]').click();

        });

        // Confirm the deletion of said issue
        cy.get('[data-testid="modal:confirm"]').within(() => {
            cy.contains('Delete issue').click();
        });

        // wait 5sec 
        cy.wait(5000);

        // After waiting, reload
        cy.reload();

        // Assert that list is visible
        cy.get('[data-testid="board-list:backlog"]')
        .should('be.visible')
        .and('have.length', '1')
        .within(() => {
            // Assert that this list contains 3 issues 
            cy.get('[data-testid="list-issue"]')
            .should('have.length', '3') 
        });

    });

});