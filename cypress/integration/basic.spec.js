/// <reference types="Cypress" />
const PublicAddress = '2429591038702207169527055321287347260698030400419129219397402631555421258249,54334791982059904886297432039313727154330513618477202451099219546996291545379'
const PrivateKey = '65537,54334791982059904886297432039313727154330513618477202451099219546996291545379'
const LoloPrivateKey = '65537,32738739318480270880847344601765335773851669760144296954546538700397943059327'
describe('smoke test', function () {
    it('should generate keys', function () {
        cy.visit('http://localhost:3000/')
        cy.get('#generateKeys').click()
        cy.get('#publicAddress').should('not.have.value', '')
        cy.get('#privateKey').should('not.have.value', '')
    })
    it('should generate a new wallet', function () {
        cy.get('#publicAddress').clear()
        cy.get('#publicAddress').type(PublicAddress)
        cy.get('#privateKey').clear()
        cy.get('#privateKey').type(PrivateKey)
        cy.get('#alias').type('Pirulo')
        cy.get('#generateWallet').click()
        cy.get('.panel-body > :nth-child(2) > h3').should('have.text', 'Pirulo')
        cy.get(':nth-child(2) > :nth-child(3) > .longString').should('have.text', PublicAddress)
    })
    it('should generate a pending transfer', function () {
        cy.get('#toPublishGives').select('lolo')
        cy.get('#toPublishReceives').select('Pirulo')
        cy.get('#toPublishAmount').type('0.1')
        cy.get('#toPublishPass').type(LoloPrivateKey)
        cy.get('#toPublishSign').click()
        cy.get('#toPublishPublish').click()
        cy.get('#pendingTransactionsPanel').should('contain', 'gives: lolo')
        cy.get('#pendingTransactionsPanel').should('contain', 'receives: Pirulo')
        cy.get('#pendingTransactionsPanel').should('contain', 'amount: 0.1')
        cy.get('#pendingTransactionsPanel').should('contain', 'signature: 9817518981838004403115236544317486232355014985304657386431667768642330750650')
    })
    it('should eventually add a block', function () {
        cy.get('#selectDirToAddMined').select('Pirulo')
        cy.get('#dirToAdMinedBitcoin').should('have.value', PublicAddress)
        cy.get('#startMining').click()
        cy.wait(10000)
        cy.get('.Chain > :nth-last-child(2)').find('.blockHash').should('have.text', '0044fbf701f140ab3708fd09727111be')
        cy.get(':nth-child(2) > :nth-child(2) > .coins').should('have.text', '1.1')
    })

})