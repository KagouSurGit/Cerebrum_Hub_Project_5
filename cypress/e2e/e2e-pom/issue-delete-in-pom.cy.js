/**
 * This is an example file and approach for POM in Cypress
 */
import IssueModal from "../../pages/IssueModal";

describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
    //open issue detail modal with title from line 16  
    cy.contains(issueTitle).click();
    });
  });

  //issue title, that we are testing with, saved into variable
  const issueTitle = 'This is an issue of type: Task.';

  it('Should delete issue successfully', () => {
    IssueModal.clickDeleteButton();
    IssueModal.confirmDeletion();
    cy.reload();
    IssueModal.ensureIssueIsNotVisibleOnBoard(issueTitle)
  });

  it('Should cancel deletion process successfully', () => {
    IssueModal.clickDeleteButton();
    IssueModal.cancelDeletion();
    IssueModal.closeDetailModal()
    IssueModal.ensureIssueIsVisibleOnBoard(issueTitle)
  });
});

/* 
23-05-2024
Sprint 1 - Week 2 
Assignment 4: Cover issue deletion functionality using POM approach
POM Test Rewriting: Issue Deletion
POM Test Rewriting: Issue Deletion Cancellation
*/