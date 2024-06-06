describe('Time estimation functionality', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');

    it('Should add time estimation to issue', () => {
        getIssueDetailsModal().within(() => {
            cy.get('[data-testid="icon:stopwatch"]').click()
        });

        cy.get('[data-testid="modal:tracking"]').within(() => {
            cy.get('input[placeholder="Number"]')
            .first()
            .clear()
            .type('10')
            cy.contains('button', 'Done')
            .click()
            .should('not.exist');
        });

        /* When closing the issue, cypress does not update the value, 
        without closing it does update the value. When I do it manually, 
        it does update the value but it takes some time

        getIssueDetailsModal().within(() => {
            cy.get('[data-testid="icon:close"]')
            .first()
            .click()
        }); 

        cy.contains('This is an issue of type: Task.').click();
        */ 

        getIssueDetailsModal().should('contain', '10h logged');

        getIssueDetailsModal().within(() => {
            cy.get('[data-testid="icon:close"]')
            .first()
            .click()
        });
    
    });
});
