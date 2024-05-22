/*  
22-05-2024 
Sprint 1 - Week 2 
Assignment 3: Add tests for covering issue deletion functionality 
*/

describe('Issue deleting', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.visit(url + '/board');
      });
    });

    it('Test Case 2: Issue Deletion Cancellation', () => {
        // Assert list is visible
        cy.get('[data-testid="board-list:backlog"]')
        // .should('be.visible')
        .should('have.length', '1')
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

        // Confirm cancelation of said issue
        cy.get('[data-testid="modal:confirm"]')
            .should('be.visible')
            .within(() => {
                cy.contains('Cancel')
                .click();

        });

        // Click the close icon (X) to leave the details window
        cy.get('body').click(0,0);

        // After waiting, reload
        cy.reload();

        // wait 5sec 
        cy.wait(5000);

        // Assert that list is visible
        cy.get('[data-testid="board-list:backlog"]')
        .should('be.visible')
        .and('have.length', '1')
        .within(() => {
            // Assert that this list contains 4 issues and p contains text
            cy.get('[data-testid="list-issue"]')
            .should('have.length', '4')
            .find('p')
            .contains('This is an issue of type: Task.')
        });

        cy.wait(5000);

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