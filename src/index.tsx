import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as _ from 'lodash'
import General from './components/General'
import { GeneralType, Transaction, Block, WalletDetails, Functions } from './Types'
import { generateKeyPair } from './utils/rsa'
import './index.css';
import registerServiceWorker from './registerServiceWorker'
import { createTransactionSignature, hashBlock, calculateGiverFunds, hashBlockWithoutNonce, validateTransactions, startsWithZeros, addDelay } from './utils/blockchain';
import { DefaultWallets, DefaultChain } from './utils/defaultChain'



let general: GeneralType = {
  alias: '',
  chain: DefaultChain,
  dirToAddMined:'',
  keyPair: {
    address: '',
    privateKey: '',
  },
  pendingTransactions: [],
  transactionToPublish: {gives: '', receives:'', amount: 0, signature:'', secretKey:'' },
  wallets: DefaultWallets,
}

const generateKeyPairAndUpdate = () => {
  let keyPair = generateKeyPair()
  general.keyPair = keyPair
  update()
}
const publishTransaction = async () => {
  general.pendingTransactions.push( _.cloneDeep(general.transactionToPublish) as Transaction)
  update()
}

const generateWallet = async() => {
  let details: WalletDetails = { alias: general.alias , privateKey: general.keyPair.privateKey}
  general.wallets[general.keyPair.address] = _.cloneDeep(details)
  update()
}

export const signTransaction = async () => {
  let lastBlockHash = hashBlock(_.last(general.chain) as Block )
  let signature = createTransactionSignature(general.transactionToPublish, lastBlockHash, general.transactionToPublish.secretKey )
  general.transactionToPublish.signature = signature
  update()

}
const calculateOwnerCoinsFromChain = (chain: Block[], address: string) => {
  let transactions = _.flatMap(chain, (block: Block) => block.transactions)
    return calculateGiverFunds(transactions, address)
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
const mine = async() => {
  let blockWithoutNonce = validateTransactions(general.pendingTransactions, general.chain, general.dirToAddMined)
  general.minedBlock = blockWithoutNonce
  let nonce = 0
  let keepSearching = true
  while (keepSearching) {
    blockWithoutNonce.nonce = nonce.toString()
    let result = hashBlockWithoutNonce(blockWithoutNonce, nonce)
    let doesStart = startsWithZeros(result)
    if (doesStart) {
      keepSearching = false
    } else {
      nonce = nonce + 1
    }
    update()
    await addDelay(4)
  }
  blockWithoutNonce.nonce = nonce.toString()
  general.chain.push(blockWithoutNonce)
  delete general.minedBlock
  update()
}
const functions: Functions = {
  calculateOwnerCoinsFromChain,
  generalChange,
  generateKeyPair: generateKeyPairAndUpdate,
  generateWallet,
  hashBlock,
  mine,
  publishTransaction,
  signTransaction,
}
const update =  () => {
  ReactDOM.render(
    <General general={general} functions={functions}/>,
    document.getElementById('root') as HTMLElement
  );
}

update()
registerServiceWorker();

