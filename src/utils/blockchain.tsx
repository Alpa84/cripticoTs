import { Block, Transaction, InvalidBlockReason } from '../Types'
import md5 from 'md5'
import _ from 'lodash'
import bigInt from 'big-integer'
import { RSA } from '../utils/rsa'
import { addDelay } from './misc'

const MinedAmount = 100

function isInvalidChain(receivedChain: Block[]) {
  for (let blockIndex = 0; blockIndex < receivedChain.length; blockIndex++) {
    let block = receivedChain[blockIndex];
    let reason = checkValidBlock(block, blockIndex, receivedChain);
    if (!reason.isValid) {
      return { [blockIndex]: reason };
    }
  }
  return false;
}
const MinedTransactionNotPresent = () => ({
  transactions: {
    0: {
      gives: `The first transaction has to be a mined coin, (gives: mined)`,
    },
  },
})
const MinedTransactionWrongValue = (actualAmount: number) => ({
  transactions: {
    0: {
      amount: `The first transaction has to be a mined coin, and it has to have a value of ${MinedAmount} and it has a value of : ${actualAmount}`,
    },
  },
})
const InvalidSignature = (index: number) => ({
  transactions: {
    [index]: {
      signature: `the transaction does not have a valid signature`,
    },
  },
})
const InvalidTransactionGeneral = () => ({
  transactions: {
    general: `there is an invalid transaction signature`,
  },
})
const InsufficientFunds = (index: number, amount: number) => ({
  transactions: {
    [index]: {
      signature: `the giver does not have ${amount} simplecoins to give`,
    },
  },
})
export function checkValidBlock(block: Block, blockIndex: number, receivedChain: Block[]): InvalidBlockReason {
  let chainUntilThisBlock = receivedChain.slice(0, blockIndex)
  let chainTransactions = chainToTransactions(chainUntilThisBlock)
  let reviewedTransactions: Transaction[] = []
  if (blockIndex !== 0) {
    let hasPreviousBlockHash = block.previousBlockHash === hashBlock(receivedChain[blockIndex - 1])
    if (!hasPreviousBlockHash) {
      return { previousBlockHash: 'does not have the previous block hash' }
    }
  }
  block.transactions.forEach((transaction, index) => {
    if (index === 0) {
      if (transaction.gives !== 'mined') {
        return MinedTransactionNotPresent();
      }
      if (transaction.amount !== MinedAmount) {
        return MinedTransactionWrongValue(transaction.amount);
      }
      reviewedTransactions.push(transaction);
    } else {
      let previousTransactions = [...chainTransactions, ...reviewedTransactions];
      try {
        let transactionSignatureValid = hasValidTransactionSignature(transaction, block.previousBlockHash);
        if (!transactionSignatureValid) {
          return InvalidSignature(index);
        }
      } catch (error) {
        return InvalidTransactionGeneral();
      }
      if (checkIfGiverHasFunds(transaction, previousTransactions)) {
        reviewedTransactions.push(transaction);
      } else {
        return InsufficientFunds(index, transaction.amount);
      }
    }
  })
  let hash = hashBlock(block)
  if (!startsWithZeros(hash)) {
    return { hash: 'the hash does not start with the required amount of zeros' }
  }
  return { isValid: true }
}
export function hashBlock(block: Block) {
  let transactionsString = transactionsToStrings(block.transactions)
  return md5(block.previousBlockHash + ',' + transactionsString + ',' + block.nonce)
}
function transactionsToStrings(transactions: Transaction[]) {
  let transactionsString = ''
  for (let transaction of transactions) {
    transactionsString += `,${transaction.gives},${transaction.receives},${transaction.amount},${transaction.signature}`
  }
  return transactionsString
}
function chainToTransactions(chain: Block[]) {
  let chainTransactions = [] as Transaction[]
  chain.forEach((block, blockIndex) => {
    block.transactions.map((transaction, transactionIndex) => {
      chainTransactions.push(transaction)
    })
  })
  return chainTransactions
}
function hasValidTransactionSignature(transaction: Transaction, lastBlockHash: string) {
  let transactionString = transactionToStringToSign(transaction, lastBlockHash)
  let hash = md5(transactionString)
  let publicD = bigInt(transaction.gives.split(',')[0])
  let publicN = bigInt(transaction.gives.split(',')[1])
  const decryptedMessage = RSA.decrypt(transaction.signature, publicD, publicN)
  return RSA.decode(decryptedMessage.toString()) === hash
}
function transactionToStringToSign(transaction: Transaction, lastBlockHash: string) {
  return `gives: ${transaction.gives}, receives: ${transaction.receives}, amount: ${transaction.amount}, lastBlockHash: ${lastBlockHash}`
}
function checkIfGiverHasFunds(transaction: Transaction, transactions: Transaction[]) {
  let giverFunds = calculateGiverFunds(transactions, transaction.gives)
  return transaction.amount <= giverFunds
}
export const calculateOwnerCoinsFromChain = (chain: Block[], address: string) => {
  let transactions = _.flatMap(chain, (block: Block) => block.transactions)
  return calculateGiverFunds(transactions, address)
}
export function calculateGiverFunds(transactions: Transaction[], giver: string) {
  let funds = 0
  for (let transaction of transactions) {
    if (transaction.gives === giver) {
      funds = funds - transaction.amount
    }
    if (transaction.receives === giver) {
      funds = funds + transaction.amount
    }
  }
  return funds
}
export function startsWithZeros(hash: string) {
  return hash.substring(0, 2) === '00'
}
async function calculateNonce(blockWithoutNonce: Block, existingChain: Block[], chain?: Block[]): Promise<string> {
  let nonce = 0
  let keepLooking = true
  while (keepLooking) {
    if (chain) {
      let blockHash = hashBlock(existingChain[existingChain.length - 1])
      keepLooking = blockWithoutNonce.previousBlockHash === blockHash
      if (!keepLooking) {
        alert('somebody added a new block to the blockchain before we could find our nonce and ad the block ourselves')
        return 'cancelled'
      }
    }
    let result = hashBlockWithoutNonce(blockWithoutNonce, nonce)
    let startsWithRequiredZeros = startsWithZeros(result)
    if (startsWithRequiredZeros) {
      return nonce.toString()
    } else {
      nonce = nonce + 1
    }
    await addDelay(400)
  }
  return ''
}
export const hashBlockWithoutNonce = (blockWithoutNonce: Block, nonceCandidate: number): string => {
  blockWithoutNonce.nonce = nonceCandidate.toString()
  return hashBlock(blockWithoutNonce)
}
export const validateTransactions = ( pendingTransactionsDeposit: Transaction[], existingChain: Block[], minersAddress: string ): Block => {
  let pendingTransactions = pendingTransactionsDeposit
  let lastBlock = existingChain[existingChain.length - 1]
  let previousBlockHash = hashBlock(lastBlock)
  let approvedPendingTransactions = []
  let chainTransactions = chainToTransactions(existingChain)
  for (let pendingTransaction of pendingTransactions) {
    let previousTransactions = [...chainTransactions, ...approvedPendingTransactions]
    let giverHasFunds = checkIfGiverHasFunds(pendingTransaction, previousTransactions)
    if (giverHasFunds) {
      if (hasValidTransactionSignature(pendingTransaction, previousBlockHash)) {
        approvedPendingTransactions.push(pendingTransaction)
      } else {
        alert(`Invalid Signature. the transaction for an amount of ${pendingTransaction.amount}, ignoring transaction`)
      }
    } else {
      alert(
        `The giver does not have funds to do this transaction. Invalid transaction for an amount of ${pendingTransaction.amount}, ignoring transaction`
      )
    }
  }
  approvedPendingTransactions.unshift({
    gives: 'mined',
    receives: minersAddress,
    amount: MinedAmount,
    signature: '',
  })
  return {
    nonce: '',
    previousBlockHash,
    transactions: approvedPendingTransactions,
  }
}
export async function tryToAddBlock( pendingTransactionsDeposit: Transaction[], existingChain: Block[], minersAddress: string ): Promise<Block[]> {
  let newBlock = validateTransactions(pendingTransactionsDeposit, existingChain, minersAddress)
  let nonce = await calculateNonce(newBlock, existingChain, existingChain)
  if (nonce === 'cancelled') {
    return existingChain
  }
  newBlock.nonce = nonce
  existingChain.push(newBlock)
  return existingChain
}
export async function addToPendingTransactions(transaction: Transaction, clave: string, existingChain: Block[]) {
  let lastBlock = existingChain[existingChain.length - 1]
  let lastBlockHash = hashBlock(lastBlock)
  transaction.signature = createTransactionSignature(transaction, lastBlockHash, clave)
}
export function receiveChain(receivedChain: Block[], existingChain: Block[]) {
  let reason = isInvalidChain(receivedChain)
  if (reason) {
    alert(JSON.stringify(reason))
    return existingChain
  } else {
    if (receivedChain.length > existingChain.length) {
      alert('a longer, valid chain has been received, we are going to switch to that one')
      return receivedChain
    } else {
      return existingChain
    }
  }
}
export function createTransactionSignature(transaction: Transaction, lastBlockHash: string, privateKey: string) {
  let privateE = bigInt(privateKey.split(',')[0])
  let publicN = bigInt(privateKey.split(',')[1])
  let transactionString = transactionToStringToSign(transaction, lastBlockHash)
  let hash = md5(transactionString)
  const encodedMessage = RSA.encode(hash)
  return RSA.encrypt(encodedMessage, publicN, privateE).toString()
}
