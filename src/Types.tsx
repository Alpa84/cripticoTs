import { BigInteger } from 'big-integer'
import { Dispatch } from 'react'
export interface Block  {
    previousBlockHash: string
    nonce: string
    transactions: Transaction[]
}
export interface Functions {
    dispatch: Dispatch<Action>
    findNonce: (block: Block, blockIndex: number) => Promise<void>
    mine: ()=> void
}

export type Action =
    | { type: 'changeAlias', alias: string}
    | { type: 'changeGives', gives: string}
    | { type: 'changeReceives', receives: string}
    | { type: 'changeDirToAddMined', dir: string}
    | { type: 'changeTransactionAmount', amount: number}
    | { type: 'changeTransactionSecretKey', secretKey: string}
    | { type: 'changeChainTGives', gives: string, blockIndex: number, index: number}
    | { type: 'changeChainTReceives', receives: string, blockIndex: number, index: number}
    | { type: 'changeChainTAmount', amount: number, blockIndex: number, index: number}
    | { type: 'changeChainTSignature', signature: string, blockIndex: number, index: number}
    | { type: 'changeChainPrevHash', hash: string, blockIndex: number}
    | { type: 'changeChainNonce', nonce: string, blockIndex: number}
    | { type: 'removeBlock', index: number}
    | { type: 'removeTransaction', blockIndex: number, index: number}
    | { type: 'addTransaction', blockIndex:number}
    | { type: 'addBlock'}
    | { type: 'changeBlockNonce', blockIndex: number, nonce: string}
    | { type: 'changeMinedBlockNonce', nonce: string}
    | { type: 'changeMinedBlock', block: Block}
    | { type: 'addMinedBlockToChain'}
    | { type: 'publishTransaction'}
    | { type: 'closeTour'}
    | { type: 'toggleEditableChain'}
    | { type: 'generateKeyPair'}
    | { type: 'generateWallet'}
    | { type: 'signTransaction'}

export interface Transaction {
    gives: string
    receives: string
    amount: number
    signature: string
}
export interface TransactionPlusKey extends Transaction {
    secretKey: string
}
export interface GeneralType {
    tourOpen: boolean
    pendingTransactions: Transaction[]
    chain: Block[]
    editableChain?: Block[]
    signatureError?: string
    transactionToPublish: TransactionPlusKey
    dirToAddMined: string,
    keyPair: KeyPair
    alias: string
    wallets: Wallets
    minedBlock?: Block
}
export interface WalletDetails {
    alias: string,
    privateKey: string,
}
export interface Wallets { [id: string]:  WalletDetails}
export interface KeyPair {
    address: string
    privateKey: string
}

export interface Keys {
    d: BigInteger
    e: BigInteger
    n: BigInteger
}
