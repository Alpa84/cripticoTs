import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as _ from 'lodash'
import General from './components/General'
import { GeneralType, Transaction, Block, WalletDetails, Functions } from './Types'
import { generateKeyPair } from './utils/rsa'
import './index.css';
import registerServiceWorker from './registerServiceWorker'
import { createTransactionSignature, hashBlock, calculateGiverFunds, hashBlockWithoutNonce, validateTransactions, startsWithZeros, addDelay, isInvalidBlock } from './utils/blockchain';
import { DefaultWallets, DefaultChain, DefaultEmptyTransaction, DefaultEmptyBlock } from './utils/defaultChain'

let emptyTransactionToPublish = { gives: '', receives: '', amount: 0, signature: '', secretKey: '' }
let emptyKeyPair = { address: '', privateKey: ''}
let general: GeneralType = {
  alias: '',
  chain: DefaultChain,
  dirToAddMined:'',
  keyPair: _.cloneDeep(emptyKeyPair),
  pendingTransactions: [],
  tourOpen: true,
  transactionToPublish: _.cloneDeep(emptyTransactionToPublish),
  wallets: DefaultWallets,
}

const generateKeyPairAndUpdate = () => {
  let keyPair = generateKeyPair()
  general.keyPair = keyPair
  update()
}
const publishTransaction = async () => {
  general.pendingTransactions.push( _.cloneDeep(general.transactionToPublish) as Transaction)
  general.transactionToPublish = _.cloneDeep(emptyTransactionToPublish)
  update()
}

const generateWallet = async() => {
  let details: WalletDetails = { alias: general.alias , privateKey: general.keyPair.privateKey}
  general.wallets[general.keyPair.address] = _.cloneDeep(details)
  general.keyPair = _.cloneDeep(emptyKeyPair)
  general.alias = ''
  update()
}

export const signTransactionInternal = () => {
  let lastBlockHash = hashBlock(_.last(general.chain) as Block )
  return createTransactionSignature(general.transactionToPublish, lastBlockHash, general.transactionToPublish.secretKey )

}
export const signTransaction = () =>{
  try {
    let signature = signTransactionInternal()
    general.transactionToPublish.signature = signature
    delete general.signatureError
  } catch (error) {
    general.signatureError = 'There was an error generating the signature, please check the private key'
  }
  update()
}
const calculateOwnerCoinsFromChain = (chain: Block[], address: string) => {
  let transactions = _.flatMap(chain, (block: Block) => block.transactions)
    return calculateGiverFunds(transactions, address)
}
const removeBlock = (index: number) => {
  if (general.editableChain){
    general.editableChain.splice(index, 1)
  }
  update()
}
const removeTransaction = (blockIndex: number, index: number) => {
  if (general.editableChain){
    general.editableChain[blockIndex].transactions.splice(index, 1)
  }
  update()
}
const addTransaction = (blockIndex: number) => {
  if (general.editableChain){
    general.editableChain[blockIndex].transactions.push(DefaultEmptyTransaction)
  }
  update()
}
const addBlock = () => {
  if (general.editableChain){
    general.editableChain.push(DefaultEmptyBlock)
  }
  update()
}
const generalChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement >) => {
  let element = event.target
  let path = element.getAttribute('data-key') as string
  let value: string | number = element.value
  if (path.split('.')[path.split('.').length - 1] === 'amount') {
    value = parseFloat(value)
  }
  _.set(general, path, value)
  if (path === 'general.transactionToPublish.signature') { general.transactionToPublish.signature = value.toString()}
  update()
}
const tryDifferentNonces = async(block: Block) => {
  let nonce = 0
  while (true) {
    block.nonce = nonce.toString()
    let result = hashBlockWithoutNonce(block, nonce)
    let doesStart = startsWithZeros(result)
    if (doesStart) {
      update()
      return nonce
    } else {
      nonce = nonce + 1
    }
    update()
    await addDelay(4)
  }
}
const findNonce = async (block: Block)=> {
  tryDifferentNonces(block)
}
const mine = async() => {
  let blockWithoutNonce = validateTransactions(general.pendingTransactions, general.chain, general.dirToAddMined)
  general.minedBlock = blockWithoutNonce
  let nonce = await tryDifferentNonces(blockWithoutNonce)
  blockWithoutNonce.nonce = nonce.toString()
  general.chain.push(blockWithoutNonce)
  delete general.minedBlock
  general.pendingTransactions = []
  update()
}
const toggleEditableChain = () => {
  if (general.editableChain) {
    delete general.editableChain
  } else {
    general.editableChain = _.cloneDeep(general.chain)
  }
  update()
}
const closeTour = () => {
    general.tourOpen = false
  update()
}
const functions: Functions = {
  addBlock,
  addTransaction,
  calculateOwnerCoinsFromChain,
  closeTour,
  findNonce,
  generalChange,
  generateKeyPair: generateKeyPairAndUpdate,
  generateWallet,
  hashBlock,
  isInvalidBlock,
  mine,
  publishTransaction,
  removeBlock,
  removeTransaction,
  signTransaction,
  toggleEditableChain,
}
const update =  () => {
  ReactDOM.render(
    <General general={general} functions={functions}/>,
    document.getElementById('root') as HTMLElement
  );
}

update()
registerServiceWorker();

