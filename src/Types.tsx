import { BigInteger } from 'big-integer'
export interface Block  {
    previousBlockHash: string
    nonce: string
    transactions: Transaction[]
}
export interface Functions {
    generalChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    publishTransaction: () => void
    toggleEditableChain: () => void
    generateKeyPair: () => void
    generateWallet: () => void
    isInvalidBlock: (block: Block, blockIndex: number, receivedChain: Block[]) => false | {[id: number]: string}
    signTransaction: () => void
    mine: () => void
    hashBlock: (block: Block) => string
    calculateOwnerCoinsFromChain: (chain: Block[], address: string) => number
}
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
    pendingTransactions: Transaction[]
    chain: Block[]
    editableChain?: Block[]
    showEditableChain: boolean
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
