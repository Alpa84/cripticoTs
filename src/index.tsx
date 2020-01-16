import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as axios from 'axios'
import * as _ from 'lodash'
import General from './components/General'
import { GeneralType, Transaction, Wallets, Block, WalletDetails, WalletsAPI, Functions } from './Types'
import { generateKeyPair } from './utils/rsa'
import './index.css';
import registerServiceWorker from './registerServiceWorker'
import { createTransactionSignature, hashBlock, calculateGiverFunds, hashBlockWithoutNonce, validateTransactions, startsWithZeros, addDelay, receiveChain } from './utils/blockchain';

// TBD Make the following fix for prod/local less brittle
// CORS network error ?
let defaultUrl = 'http://localhost:5000'
// let defaultUrl = ''

let general: GeneralType = {
  alias: '',
  chain: [],
  dirToAddMined:'',
  keyPair: {
    address: '',
    privateKey: '',
  },
  pendingTransactions: [],
  transactionToPublish: {gives: '', receives:'', amount: 0, signature:'', secretKey:'' },
  wallets: {},
}

const generateKeyPairAndUpdate = () => {
  let keyPair = generateKeyPair()
  general.keyPair = keyPair
  update()
}
const publishTransaction = async () => {
  let response = await axios.default.post<Transaction[]>(`${defaultUrl}/pending_transaction`, general.transactionToPublish)
  general.pendingTransactions =  response.data
  update()
}
const publishChain = async (chain: Block[]) => {
  try {
    let response = await axios.default.post<{chain: Block[]}>(`${defaultUrl}/chain`, chain)
    general.chain = response.data.chain
    update()
  } catch (error) {
    console.error(error)
  }
}
const generateWallet = async() => {
  let details: WalletDetails = { alias: general.alias , privateKey: general.keyPair.privateKey}
  let walletsApi: WalletsAPI = { address: general.keyPair.address, details }
  let response = await axios.default.post<Wallets>(`${defaultUrl}/wallets`, walletsApi)
  general.wallets = response.data
  update()
}

const signTransaction = async () => {
  let signature = createTransactionSignature(general.transactionToPublish, hashBlock(_.last(general.chain) as Block), general.transactionToPublish.secretKey )
  general.transactionToPublish.signature = signature
  update()

}
const calculateOwnerCoinsFromChain = (chain: Block[], address: string) => {
  let transactions = _.flatMap(chain, (block: Block) => block.transactions)
    return calculateGiverFunds(transactions, address)
}
const updateChain = async () => {
  let response = await axios.default.get<GeneralType>(`${defaultUrl}/pending_transactions_and_chain`)
  let receivedChain = response.data.chain
  let chainToKeep = receiveChain(receivedChain, general.chain)
  general.chain = chainToKeep
  general.pendingTransactions =  response.data.pendingTransactions
  general.wallets = response.data.wallets
  update()
}
setInterval(() => {
  updateChain()
}, 3000)


const generalChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement >) => {
  let element = event.target
  let path = element.getAttribute('data-key') as string
  let value: string | number = element.value
  if (path.split('.')[path.split('.').length - 1] === 'amount') {
    value = parseFloat(value)
  }
  _.set(general, path, value)
  // don't know why the line above wont work for the secret key
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
  publishChain(general.chain)
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

