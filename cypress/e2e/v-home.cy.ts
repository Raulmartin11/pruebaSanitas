import { take } from "cypress/types/lodash"

describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200/')
  })

  it('find filter and search by number', () => {
    cy.visit('http://localhost:4200/')
    cy.wait(300)
    cy.get('.filter').type('111')
    cy.get('.mat-row > .cdk-column-id').should('have.text', 111)
  })

  it('filter by number but not found data', () => {
    cy.visit('http://localhost:4200/')
    cy.wait(300)
    cy.get('.filter').type('11111')
    cy.get('.mat-row > .cdk-column-id').should('not.contain', 11111)
  })

  it('clear number filter', () => {
    cy.visit('http://localhost:4200/')
    cy.wait(300)
    cy.get('.filter').type('111')
    cy.get('.mat-row > .cdk-column-id').should('have.text', 111)
    cy.get('.filter').clear()
    cy.wait(300)
    cy.get('.mat-row > .cdk-column-id').should('not.contain', 111)
  })

  it('filter by text', () => {
    cy.visit('http://localhost:4200/')
    cy.get('.filter').type('Elit quis laboris voluptate')
    cy.wait(300)
    cy.get('.mat-row > .cdk-column-text').should('include.text', 'irure reprehenderit veniam')
  })

  it('filter by text but not found data', () => {
    cy.visit('http://localhost:4200/')
    cy.get('.filter').type('test de prueba')
    cy.wait(300)
    cy.get('.mat-row > .cdk-column-text').should('not.contain', 'test de prueba')
  })

  it('clear text filter', () => {
    cy.visit('http://localhost:4200/')
    cy.get('.filter').type('Elit quis laboris voluptate')
    cy.wait(300)
    cy.get('.mat-row > .cdk-column-text').should('include.text', 'irure reprehenderit veniam')
    cy.get('.filter').clear()
    cy.wait(300)
    cy.get('.mat-row > .cdk-column-text').should('not.contain', 'Elit quis laboris voluptate')
  })

  it('filter by especial character but not found data', () => {
    cy.visit('http://localhost:4200/')
    cy.get('.filter').type('º')
    cy.wait(300)
    cy.get('.mat-row > .cdk-column-text').should('not.contain', 'º')
  })

  it.skip('scroll to bottom', () => { //FIX TEST
    cy.visit('http://localhost:4200/')
    cy.wait(2000)
    cy.get(':nth-child(20) > .cdk-column-id').scrollIntoView({ duration: 1000 })
    cy.get(':nth-child(21) > .cdk-column-id').should('be.visible')
  })
})