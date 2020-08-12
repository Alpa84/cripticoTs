/// <reference types="Cypress" />
const PublicAddress = '2429591038702207169527055321287347260698030400419129219397402631555421258249,54334791982059904886297432039313727154330513618477202451099219546996291545379'
const PrivateKey = '65537,54334791982059904886297432039313727154330513618477202451099219546996291545379'
const CreatorPrivateKey = '65537,32738739318480270880847344601765335773851669760144296954546538700397943059327'
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
        cy.get('#alias').type('Athena')
        cy.get('#generateWallet').click()
        cy.get('.panel-body > :nth-child(2) > h3').should('have.text', 'Athena')
        cy.get(':nth-child(2) > :nth-child(3) > .longString').should('have.text', PublicAddress)
    })
    it('should generate a pending transfer', function () {
        cy.get('#toPublishGives').select('AlePan')
        cy.get('#toPublishReceives').select('Athena')
        cy.get('#toPublishAmount').type('0.2')
        cy.get('#toPublishPass').type(CreatorPrivateKey)
        cy.get('#toPublishSign').click()
        cy.get('#toPublishPublish').click()
        cy.get('#pendingTransactionsPanel').should('contain', 'gives: AlePan')
        cy.get('#pendingTransactionsPanel').should('contain', 'receives: Athena')
        cy.get('#pendingTransactionsPanel').should('contain', 'amount: 0.2')
        cy.get('#pendingTransactionsPanel').should('contain', 'signature: 5553261615011638652114843277879704064577452225334472495029161237783265216613')
    })
    it('should eventually add a block', function () {
        cy.get('#selectDirToAddMined').select('Athena')
        cy.get('#dirToAdMinedBitcoin').should('have.value', PublicAddress)
        cy.get('#startMining').click()
        cy.get('.Chain > :nth-last-child(1)').find('.blockHash').should('have.text', '005d0a494e618e052cb3fd683cebe954')
        cy.get('.Chain > :nth-last-child(2)').find('.blockHash').should('have.text', '0007d82def501b09057ece1d8886aed4')
        cy.get(':nth-child(2) > :nth-child(2) > .coins').should('have.text', '1.4')
    })
    it('be able to edit the chain', function () {
        cy.get('#toggleEditableChain').click()
    })

})