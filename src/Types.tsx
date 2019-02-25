import { BigInteger } from 'big-integer'
export interface Block  {
    hashBloqueAnterior: string
    clave: string
    transacciones: Transaccion[]
}
export interface Functions {
    generalChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    publishTransaction: () => void
    generateKeyPair: () => void
    firmarTransaccion: () => void
    minear: () => void
}
export interface Transaccion {
    da: string
    recibe: string
    cuanto: number
    firma: string
}
export interface GeneralType {
    transaccionesPendientes: Transaccion[]
    cadena: Block[]
    transactionToPublish: Transaccion
    keyPair: KeyPair
    directorio: Directorio
    balance: {[dir: string]: number}
}
export interface Directorio { [id: string]: string }
export interface KeyPair {
    direccion: string
    clave: string
}

export interface Keys {
    d: BigInteger
    e: BigInteger
    n: BigInteger
}