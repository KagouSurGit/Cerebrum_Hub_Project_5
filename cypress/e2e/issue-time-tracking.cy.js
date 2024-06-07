describe('Time estimation functionality', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
        });
    });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');

    it('Should add time estimation to issue', () => {

        cy.contains('This is an issue of type: Task.').click();

        getIssueDetailsModal().within(() => {
            cy.get('input[placeholder="Number"]')
            .first()
            .clear()
            .type('10')
            cy.get('[data-testid="icon:close"]')
            .first()
            .click()
        });

        cy.contains('This is an issue of type: Task.').click();

        cy.wait(3000);

        getIssueDetailsModal().should('contain', '10h estimated');

        getIssueDetailsModal().within(() => {
            cy.get('[data-testid="icon:close"]')
            .first()
            .click()
        });
    
    });

    it('Should update time estimation to issue', () => {

        cy.contains('Click on an issue to see what\'s behind it.').click()

        getIssueDetailsModal().within(() => {
            cy.get('input[placeholder="Number"]')
            .first()
            .clear()
            .type('20')
            cy.get('[data-testid="icon:close"]')
            .first()
            .click()
        });

        cy.contains('Click on an issue to see what\'s behind it.').click();

        cy.wait(3000);

        getIssueDetailsModal().should('contain', '20h estimated');

        getIssueDetailsModal().within(() => {
            cy.get('[data-testid="icon:close"]')
            .first()
            .click()
        });
    
    });

    it('Should delete time estimation to issue', () => {

        cy.contains('Try dragging issues to different columns to transition their status.').click()

        getIssueDetailsModal().within(() => {
            cy.get('input[placeholder="Number"]')
            .first()
            .clear()
            cy.get('[data-testid="icon:close"]')
            .first()
            .click()
        });

        cy.contains('Try dragging issues to different columns to transition their status.').click();

        cy.wait(3000);

        getIssueDetailsModal().should('contain', '15h estimated');

        getIssueDetailsModal().within(() => {
            cy.get('[data-testid="icon:close"]')
            .first()
            .click()
        });        

    });

});
