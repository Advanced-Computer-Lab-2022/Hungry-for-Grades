/// <reference types="cypress" />


const baseUrl = 'http://localhost:8000/';
describe('cancham Landing Page', () => {

    beforeEach(() => {
        // the url is written in the config file
        cy.visit(baseUrl);
    })

    context('login navigation button are working', () => {

        it('login button', () => {
            cy.get('#login-navlink').click();
            cy.url().should('include', '/auth/login');
            cy.get('#login-to-landing-page-navlink').click();
            cy.url().should('eq', baseUrl);
        })
    })

    context('Signup ', () => {

        it('Signup button', () => {

            cy.get('#signup-navlink').click();
            cy.url().should('include', '/auth/signup');

        })
    });

    context('Courses ', () => {

        it('course button', () => {

            cy.get('#courses-navlink').click();
            cy.url().should('include', '/courses');

        })
    });


    context('Explore categories ', () => {

        it('course button', () => {
            cy.get('#explore-nav-dropdown').click();


        })
    });



    context('Explore categories ', () => {

        it('course button', () => {
            cy.get('#explore-nav-dropdown').click();


        })
    });

    /* 

        context('can add new todo input validity', () => {
            const firstNameText = '123456789012345678901234567890123456789012345678901234567890';
            it('typing new item short length & button disabled', () => {
                cy.get('#inputField').clear({ force: true }).type('short input')
                cy.get('.message').should('contain', 'Text must be at least 10 characters')
                cy.get('#inputField').clear({ force: true })
            })
            it('typing new item limits entry to 30 char', () => {
                cy.get('#inputField')
                    .clear({ force: true })
                    .type(firstNameText)
                    .should('have.value', firstNameText.substring(0, 30));
            })
            it('typing new item correctly and button enabled then failed', () => {
                cy.get('#inputField').clear({ force: true }).type('long enough input entered !')
                cy.get('#submit').should('be.enabled')
                cy.get('.list-status').click().should('have.value', '')
                cy.get('#inputField').type("{backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace}")
                cy.get('#inputField').type("{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace} {backspace}")
                cy.get('.btnDisabled').should('be.disabled')
                cy.get('.list-status').click().should('have.value', '')
                cy.get('#inputField').clear({ force: true })
            })
        })

        context("CRUD on one item in the todolist", () => {

            it('insert 1 new item to the list and check the length of the list', () => {
                cy.get('#inputField').clear({ force: true }).type('I want to eat burger!');
                cy.get('#submit').should('be.enabled');
                cy.get('.list-status').click().should('have.value', '');
                cy.get('#submit').click();
                cy.get('#submit').should('be.disabled');
                cy.get('.list').children().should('have.length', 3);
            })
            it('update 1 item text', () => {
                cy.get('.text-input').click().clear({ force: true }).type('I want to play basketball!');
                cy.get('.text-input').should('have.value', 'I want to play basketball!');
            })

            it('update 1 item status to be completed', () => {
                cy.get('.complete-checkbox').click();
                cy.get('.text-input').should('have.css', 'text-decoration', 'line-through solid rgb(102, 102, 102)');
            })

            it('delete 1 item by X click', () => {
                cy.get('#close').click();
                cy.get('#todos3').children().should('have.length', 1);
            })
        })

        context('CRUD on 5 items ', () => {
            it('insert 5 new item to the list and check the length of the list', () => {
                for (let i = 0; i < 5; i++) {
                    cy.get('#inputField').wait(2000).type(`I want to eat burger ${i + 1}!!`);

                    cy.get('#submit').click().wait(200);
                }
            })

            it('check if there is 3 items in the 1st page list', () => {
                cy.get('#todos3').children().should('have.length', 3);
            })

            it('check if there is 2 items in the 2nd page list', () => {
                cy.get("#page1").next().wait(200).click().wait(200);
                cy.get('#todos3').children().should('have.length', 2);
            })
            it('mark these 2 items in the 2nd page list as done', () => {
                cy.get(':nth-child(1) > .item > .complete-checkbox').click();
                cy.get(':nth-child(2) > .item > .complete-checkbox').click().wait(200);
            })
            it('check if there is 2 items by clicking completed filter', () => {
                cy.get('.status-filters > :nth-child(3)').wait(400).click()
                cy.get('#todos3').children().should('have.length', 2).wait(200);
            })
            it('check if there is 3 items by clicking Not Yet filter', () => {
                cy.get('.status-filters > :nth-child(2)').wait(200).click()
                cy.get('#todos3').children().should('have.length', 0);
            })

        }) */
})