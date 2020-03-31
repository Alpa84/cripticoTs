import { BigInteger } from 'big-integer'
export interface Block  {
    previousBlockHash: string
    nonce: string
    transactions: Transaction[]
}
export interface Functions {
    generalChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    removeBlock:(index: number)=> void
    removeTransaction:(blockIndex: number, index: number)=> void
    addTransaction: (blockIndex:number) => void
    addBlock: () => void
    findNonce: (block: Block) => Promise<void>
    publishTransaction: () => void
    closeTour: () => void
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
