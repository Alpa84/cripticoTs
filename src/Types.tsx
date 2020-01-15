import { BigInteger } from 'big-integer'
export interface Block  {
    previousBlockHash: string
    hash: string
    transactions: Transaccion[]
}
export interface Functions {
    generalChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    publishTransaction: () => void
    generateKeyPair: () => void
    generateWallet: () => void
    firmarTransaccion: () => void
    minear: () => void
    hashearBloque: (bloque: Block) => string
    calculateOwnerCoinsFromChain: (chain: Block[], address: string) => number
}
export interface Transaccion {
    gives: string
    receives: string
    amount: number
    signature: string
}
export interface TransactionPlusKey extends Transaccion {
    secretKey: string
}
export interface GeneralType {
    transaccionesPendientes: Transaccion[]
    cadena: Block[]
    transactionToPublish: TransactionPlusKey
    dirToAddMined: string,
    keyPair: KeyPair
    alias: string
    directorio: Directorio
    minedBlock?: Block
}
export interface WalletDetails {
    alias: string,
    privateKey: string,
}
export interface Directorio { [id: string]:  WalletDetails}
export interface KeyPair {
    direccion: string
    clave: string
}

export interface Keys {
    d: BigInteger
    e: BigInteger
    n: BigInteger
}

export interface DirectorioAPI {
    address: string,
    details: WalletDetails
}