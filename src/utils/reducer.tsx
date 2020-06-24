import { GeneralType, Action, WalletDetails, Block, Transaction, TourName } from 'src/Types'
import * as _ from 'lodash'
import { DefaultEmptyTransaction, DefaultEmptyBlock, LazyPublicAddress, LazyAlias, LazyPrivateKey, DefaultWallets } from './defaultChain'
import { hashBlock, createTransactionSignature } from './blockchain'
import { logActionChange } from './misc'
import { emptyTransactionToPublish } from 'src/components/CoinArena'


let emptyKeyPair = { address: '', privateKey: '' }

const reducer = (general: GeneralType, action: Action) => {
  switch (action.type) {
    case 'changeAlias':
      return {...general, alias: action.alias}
    case 'changeStep':
      if (action.tour === TourName.Intro) {
        return { ...general, mobileStep: action.step }
      } else { // NOTE: action.tour === TourName.Chain
        return { ...general, chainStep: action.step }
      }
    case 'changeDirToAddMined':
      return {...general, dirToAddMined: action.dir}
    case 'changeTourOpen':
      if (action.tour === TourName.Intro) {
        return { ...general, mobileTourOpen: action.on, introTourOpen: false }
      } else { // NOTE: action.tour === TourName.Chain
        return { ...general, introTourOpen: action.on, mobileTourOpen: false }
      }
    case 'changeGives':
      let clonedGives = _.cloneDeep(general)
      clonedGives.transactionToPublish.gives = action.gives
      return clonedGives
    case 'changeReceives':
      let clonedReceives = _.cloneDeep(general)
      clonedReceives.transactionToPublish.receives = action.receives
      return clonedReceives
    case 'changeTransactionAmount':
      let clonedTransactionAmount = _.cloneDeep(general)
      clonedTransactionAmount.transactionToPublish.amount = action.amount
      return clonedTransactionAmount
    case 'changeTransactionSecretKey':
      let clonedTransactionSecretKey = _.cloneDeep(general)
      clonedTransactionSecretKey.transactionToPublish.secretKey = action.secretKey
      return clonedTransactionSecretKey
    case 'changeChainTGives':
      let clonedChainTGives = _.cloneDeep(general)
      if (clonedChainTGives.editableChain) {
        clonedChainTGives.editableChain[action.blockIndex].transactions[action.index].gives = action.gives
      }
      return clonedChainTGives
    case 'changeChainTReceives':
      let clonedChainTReceives = _.cloneDeep(general)
      if (clonedChainTReceives.editableChain) {
        clonedChainTReceives.editableChain[action.blockIndex].transactions[action.index].receives = action.receives
      }
      return clonedChainTReceives
    case 'changeChainTAmount':
      let clonedChainTAmount = _.cloneDeep(general)
      if (clonedChainTAmount.editableChain) {
        clonedChainTAmount.editableChain[action.blockIndex].transactions[action.index].amount = action.amount
      }
      return clonedChainTAmount
    case 'changeChainTSignature':
      let clonedChainTSignature = _.cloneDeep(general)
      if (clonedChainTSignature.editableChain) {
        clonedChainTSignature.editableChain[action.blockIndex].transactions[action.index].signature = action.signature
      }
      return clonedChainTSignature
    case 'changeChainPrevHash':
      let clonedChainPrevHash = _.cloneDeep(general)
      if (clonedChainPrevHash.editableChain) {
        clonedChainPrevHash.editableChain[action.blockIndex].previousBlockHash = action.hash
      }
      return clonedChainPrevHash
    case 'changeChainNonce':
      let clonedChainNonce = _.cloneDeep(general)
      if (clonedChainNonce.editableChain) {
        clonedChainNonce.editableChain[action.blockIndex].nonce = action.nonce
      }
      return clonedChainNonce
    case 'removeBlock':
      let clonedBlockRemoved = _.cloneDeep(general)
      if (clonedBlockRemoved.editableChain) {
        clonedBlockRemoved.editableChain.splice(action.index, 1)
      }
      return clonedBlockRemoved
    case 'removeTransaction':
      let clonedTransactionRemoved = _.cloneDeep(general)
      if (clonedTransactionRemoved.editableChain) {
        clonedTransactionRemoved.editableChain[action.blockIndex].transactions.splice(action.index, 1)
      }
      return clonedTransactionRemoved
    case 'addTransaction':
      let clonedTransactionAdded = _.cloneDeep(general)
      if (clonedTransactionAdded.editableChain) {
        clonedTransactionAdded.editableChain[action.blockIndex].transactions.push(DefaultEmptyTransaction)
      }
      return clonedTransactionAdded
    case 'addBlock':
      let clonedBlockAdded = _.cloneDeep(general)
      if (clonedBlockAdded.editableChain) {
        clonedBlockAdded.editableChain.push(DefaultEmptyBlock)
      }
      return clonedBlockAdded
    case 'changeBlockNonce':
      let clonedNonce = _.cloneDeep(general)
      if (clonedNonce.editableChain) {
        clonedNonce.editableChain[action.blockIndex].nonce = action.nonce
      }
      return clonedNonce
    case 'changeMinedBlockNonce':
      let clonedMinedNonce = _.cloneDeep(general)
      if (clonedMinedNonce.minedBlock) {
        clonedMinedNonce.minedBlock.nonce = action.nonce
      }
      return clonedMinedNonce
    case 'changeMinedBlock':
      let clonedMined = _.cloneDeep(general)
      clonedMined.minedBlock = action.block
      return clonedMined
    case 'addMinedBlockToChain':
      let clonedNewBlock = _.cloneDeep(general)
      if (clonedNewBlock.minedBlock) {
        clonedNewBlock.chain.push(clonedNewBlock.minedBlock)
        delete clonedNewBlock.minedBlock
        clonedNewBlock.pendingTransactions = []
      }
      return clonedNewBlock
    case 'publishTransaction':
      let clonedPublished = _.cloneDeep(general)
      let tran = clonedPublished.transactionToPublish
      // Note: security check to ensure amount is not null
      let isTransactionValid = tran.gives !== '' && tran.receives !== '' && tran.amount !== null && tran.signature !== '' && tran.secretKey !== ''
      if (! isTransactionValid) { return clonedPublished }
      let toPublish = {
        ...clonedPublished.transactionToPublish,
        amount: clonedPublished.transactionToPublish.amount as number
      }
      clonedPublished.pendingTransactions.push(toPublish)
      clonedPublished.transactionToPublish = _.cloneDeep(emptyTransactionToPublish)
      return clonedPublished
    case 'toggleEditableChain':
      let clonedToggledChain = _.cloneDeep(general)
      if (clonedToggledChain.editableChain) {
        delete clonedToggledChain.editableChain
      } else {
        clonedToggledChain.editableChain = _.cloneDeep(clonedToggledChain.chain)
      }
      return clonedToggledChain
    case 'backToUneditedChain':
      let clonedUneditedChain = _.cloneDeep(general)
      if (clonedUneditedChain.editableChain) {
        delete clonedUneditedChain.editableChain
      }
      return clonedUneditedChain
    case 'changeKeyPair':
      return { ...general, keyPair: action.keyPair }
    case 'generateWallet':
      let clonedWallet = _.cloneDeep(general)
      let details: WalletDetails = { alias: clonedWallet.alias, privateKey: clonedWallet.keyPair.privateKey }
      clonedWallet.wallets[clonedWallet.keyPair.address] = _.cloneDeep(details)
      clonedWallet.keyPair = _.cloneDeep(emptyKeyPair)
      clonedWallet.alias = ''
      return clonedWallet
    case 'generateLazyWallet':
      let clonedLazyWallet = _.cloneDeep(general)
      if (Object.keys(clonedLazyWallet.wallets).length > Object.keys(DefaultWallets).length) {
        return clonedLazyWallet
      }
      let aliasEnsured = clonedLazyWallet.alias || LazyAlias
      let addressEnsured = clonedLazyWallet.keyPair.address || LazyPublicAddress
      let privateKeyEnsured = clonedLazyWallet.keyPair.privateKey || LazyPrivateKey
      clonedLazyWallet.wallets[addressEnsured] = {
        alias: aliasEnsured,
        privateKey: privateKeyEnsured
      }
      clonedLazyWallet.keyPair = _.cloneDeep(emptyKeyPair)
      clonedLazyWallet.alias = ''
      return clonedLazyWallet
    case 'signTransaction':
      let clonedTransactionSign = _.cloneDeep(general)
      try {
        let lastBlockHash = hashBlock(_.last(clonedTransactionSign.chain) as Block)
        // security check to ensure amount is not null
        if (clonedTransactionSign.transactionToPublish.amount !== null) {
          let signature = createTransactionSignature(clonedTransactionSign.transactionToPublish as Transaction, lastBlockHash, clonedTransactionSign.transactionToPublish.secretKey)
          clonedTransactionSign.transactionToPublish.signature = signature
          delete clonedTransactionSign.signatureError
        }
      } catch (error) {
        clonedTransactionSign.signatureError = 'There was an error generating the signature, please check the private key'
      }
      return clonedTransactionSign
    case 'changeNotification':
      let clonedNotifications = _.cloneDeep(general)
      clonedNotifications.notifications[action.area] = action.on
      return clonedNotifications
    case 'changeGeneral':
      return _.cloneDeep(action.general)
    default:
      throw new Error();

  }
}
export const reducerAndLog = (general: GeneralType, action: Action) => {
  let bypass = reducer(general, action)
  logActionChange(action)
  return bypass
}