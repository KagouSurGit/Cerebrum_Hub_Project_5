describe('Issue comments creating, editing and deleting', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');

    it('Should create a comment successfully', () => {
        const comment = 'TEST_COMMENT';

        getIssueDetailsModal().within(() => {
            cy.contains('Add a comment...')
                .click();

            cy.get('textarea[placeholder="Add a comment..."]').type(comment);

            cy.contains('button', 'Save')
                .click()
                .should('not.exist');

            cy.contains('Add a comment...').should('exist');
            cy.get('[data-testid="issue-comment"]').should('contain', comment);
        });
    });

    it('Should edit a comment successfully', () => {
        const previousComment = 'An old silent pond...';
        const comment = 'TEST_COMMENT_EDITED';

        getIssueDetailsModal().within(() => {
            cy.get('[data-testid="issue-comment"]')
                .first()
                .contains('Edit')
                .click()
                .should('not.exist');

            cy.get('textarea[placeholder="Add a comment..."]')
                .should('contain', previousComment)
                .clear()
                .type(comment);

            cy.contains('button', 'Save')
                .click()
                .should('not.exist');

            cy.get('[data-testid="issue-comment"]')
                .should('contain', 'Edit')
                .and('contain', comment);
        });
    });

    it('Should delete a comment successfully', () => {
        getIssueDetailsModal()
            .find('[data-testid="issue-comment"]')
            .contains('Delete')
            .click();

        cy.get('[data-testid="modal:confirm"]')
            .contains('button', 'Delete comment')
            .click()
            .should('not.exist');

        getIssueDetailsModal()
            .find('[data-testid="issue-comment"]')
            .should('not.exist');
    });

    /* Assigment 5: Add, update, delete comments
    05/06/2024 */

    it('Should add, update and delete a comment successfully', () => {
        const addComment = 'Adding a proper comment to this comment section';
        const updateComment = 'Updating previous comment, isn\'t cool ?'

        getIssueDetailsModal().within(() => {
           // Adding comment
            cy.contains('Add a comment...')
                .click();

            cy.get('textarea[placeholder="Add a comment..."]')
                .type(addComment);

            cy.contains('button', 'Save')
                .click()
                .should('not.exist');

            // Assert of added & visible comment
            cy.contains('Add a comment...')
                .should('exist');

            cy.get('[data-testid="issue-comment"]')
                .should('contain', addComment)
                .and('be.visible');

            // Editing comment
            cy.get('[data-testid="issue-comment"]')
                .first()
                .contains('Edit')
                .click()
                .should('not.exist');
    
            cy.get('textarea[placeholder="Add a comment..."]')
                .should('contain', addComment)
                .clear()
                .type(updateComment);
    
            cy.contains('button', 'Save')
                .click()
                .should('not.exist');
            
            // Assert the updated comment is visible
            cy.get('[data-testid="issue-comment"]')
                .should('contain', updateComment)
                .and('be.visible'); 
        });
            
        // Delete comment 
        cy.get('[data-testid="issue-comment"]')
            .first()
            .contains('Delete')
            .click();
        
        cy.get('[data-testid="modal:confirm"]')
            .contains('button', 'Delete comment')
            .click()
            .should('not.exist');
    
        // Assert deletion
        cy.get('[data-testid="issue-comment"]')
            .contains(updateComment)
            .should('not.exist');
    });


    // Using functions to add, update and delete

    const comment = "First comment using function"
    const updatedComment = "Second comment updated for other function"
    
    function addingComment(comment) {
        getIssueDetailsModal().within(() => {
            cy.contains('Add a comment...')
                .click();

            cy.get('textarea[placeholder="Add a comment..."]').type(comment);

            cy.contains('button', 'Save')
                .click()
                .should('not.exist');

            cy.contains('Add a comment...').should('exist');
            cy.get('[data-testid="issue-comment"]').should('contain', comment);
        });
    }

    function updatingComment(comment, updatedComment) {
        getIssueDetailsModal().within(() => {
            cy.get('[data-testid="issue-comment"]')
                .first()
                .contains('Edit')
                .click()
                .should('not.exist');

            cy.get('textarea[placeholder="Add a comment..."]')
                .should('contain', comment)
                .clear()
                .type(updatedComment);

            cy.contains('button', 'Save')
                .click()
                .should('not.exist');

            cy.get('[data-testid="issue-comment"]')
                .should('contain', 'Edit')
                .and('contain', updatedComment);
        });
    }

    function deletingComment(updatedComment) {
        getIssueDetailsModal()
        .find('[data-testid="issue-comment"]')
        .contains('Delete')
        .click();

    cy.get('[data-testid="modal:confirm"]')
        .contains('button', 'Delete comment')
        .click()
        .should('not.exist');

    getIssueDetailsModal()
        .find('[data-testid="issue-comment"]')
        .should('not.contain', updatedComment);
    }

    it('Using functions, it should add, update and delete a comment successfully', () => {
        const comment = "First comment using function"
        const updatedComment = "Second comment updated for other function"
        
        addingComment(comment);
        updatingComment(comment, updatedComment);
        deletingComment(updatedComment)
    });

});