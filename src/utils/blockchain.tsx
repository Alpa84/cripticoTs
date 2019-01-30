import { Block, Transaccion } from "src/Types"
import * as md5 from 'md5'
import * as bigInt from 'big-integer'
import { RSA } from '../utils/rsa'

let HashBloqueOriginario = 'd9d330abd7822d3b10e0a22151d95af4'

function esUnaCadenaInvalida(cadenaRecibida: Block[]) {
    for (let [indexBloque, bloque] of cadenaRecibida.entries()) {
        let razon = esUnBloqueInvalido(bloque, indexBloque, cadenaRecibida)
        if (razon) { return { [indexBloque]: razon } }
    }
    return false
}

function esUnBloqueInvalido(bloque: Block, indexBloque: number, cadenaRecibida: Block[]) {
    // si es el primero, chequear si tiene el hash originario
    if (indexBloque === 0) {
        if (hashearBloque(bloque) !== HashBloqueOriginario) {
            return { clave: 'no es el bloque originario' }
        } else {
            return false
        }
    }
    let cadenaHastaEsteBloque = cadenaRecibida.slice(0, indexBloque)
    let transaccionesDeLaCadena = cadenaATransacciones(cadenaHastaEsteBloque)
    let transaccionesRevisadas = []
    for (const [index, transaccion] of bloque.transacciones.entries()) {
        if (index === 0) { // la primera transaccion tiene que ser una moneda creada
            if (transaccion.da !== 'nadie') {
                return { transacciones: `La primera transacción tiene que ser una moneda generada, (da: nadie) y dice da: ${transaccion.da}` }
            }
            if (transaccion.cuanto !== 1) {
                return { transacciones: `La primera transacción tiene que ser una moneda generada, y tiene que tener un valor de 1 y tiene: ${transaccion.cuanto}` }
            }
            transaccionesRevisadas.push(transaccion)
        } else {
            let transaccionesPrevias = [...transaccionesDeLaCadena, ...transaccionesRevisadas]
            if (!hasValidTransactionSignature(transaccion, bloque.hashBloqueAnterior)) {
                return { transacciones: `la transaccion de ${transaccion.da} por ${transaccion.cuanto} para darle a ${transaccion.recibe} no tiene una firma valida` }
            }
            if (verSiElQueDaTieneLaPlata(transaccion, transaccionesPrevias)) {
                transaccionesRevisadas.push(transaccion)
            } else {
                return { transacciones: `${transaccion.da} no tiene ${transaccion.cuanto} para darle a ${transaccion.recibe}` }
            }

        }
    }
    let tieneRealmenteElHashDelBloqueAnterior = bloque.hashBloqueAnterior === hashearBloque(cadenaRecibida[indexBloque - 1])
    if (!tieneRealmenteElHashDelBloqueAnterior && indexBloque !== 0) {
        return { hashBloqueAnterior: 'no es el hash del bloque anterior' }
    }
    let hash = hashearBloque(bloque)
    if (!empiezaConCero(hash)) {
        return { hash: 'no empieza con 0' }
    }

    return false
}

function hashearBloque(bloque: Block) {
    let transaccionesString = transaccionesAString(bloque.transacciones)
    return md5(bloque.hashBloqueAnterior + ',' + transaccionesString + ',' + bloque.clave)
}
function transaccionesAString(transacciones: Transaccion[]) {
    let transaccionesString = ''
    for (let transaccion of transacciones) {
        transaccionesString += ',' + transaccion.da + ',' + transaccion.recibe + ',' + transaccion.cuanto + ',' + transaccion.firma
    }
    return transaccionesString
}

function cadenaATransacciones(cadena: Block[]) {
    let transaccionesDeLaCadena = []
    for (let bloque of cadena) {
        for (let transaccion of bloque.transacciones) {
            transaccionesDeLaCadena.push(transaccion)
        }
    }
    return transaccionesDeLaCadena
}

function hasValidTransactionSignature(transaccion: Transaccion, hashUltimoBloque: string) {
    let transactionString = transactionToStringToSign(transaccion, hashUltimoBloque)
    let hash = md5(transactionString)
    let publicD = bigInt(transaccion.da.split(',')[0])
    let publicN = bigInt(transaccion.da.split(',')[1])
    const decryptedMessage = RSA.decrypt(transaccion.firma, publicD, publicN)
    return RSA.decode(decryptedMessage.toString()) === hash
}
function transactionToStringToSign(transaccion: Transaccion, hashUltimoBloque: string) {
    return `da: ${transaccion.da}, recibe: ${transaccion.recibe}, cuanto: ${transaccion.cuanto}, hashUtlimoBloque: ${hashUltimoBloque}`
}

function verSiElQueDaTieneLaPlata(transaccion: Transaccion, transacciones: Transaccion[]) {
    let elQueDaTiene = calcularCuantoTieneElQueDa(transacciones, transaccion.da)
    if (transaccion.cuanto <= elQueDaTiene) {
        return true
    } else {
        return false
    }
}

function calcularCuantoTieneElQueDa(transacciones: Transaccion[], calcularPara: string) {
    let cuantoTiene = 0 // reforzar scope
    for (let transaccion of transacciones) {
        if (transaccion.da === calcularPara) {
            cuantoTiene = cuantoTiene - transaccion.cuanto
        }
        if (transaccion.recibe === calcularPara) {
            cuantoTiene = cuantoTiene + transaccion.cuanto
        }
    }
    return cuantoTiene
}

function empiezaConCero(hash: string) {
    return hash.split('')[0] === '0'
}
