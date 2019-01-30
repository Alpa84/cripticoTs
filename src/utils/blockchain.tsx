import { Block, Transaccion } from "src/Types"
import * as md5 from 'md5'
// import * as axios from 'axios'
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


async function verQueAgregarleParaQueElHashEmpieceConCero(bloqueSinClave: Block, cadenaExistente: Block[], bloqueElement = null, cadena?: Block[]): Promise<string> {
    let clave = '0'
    let seguirBuscando = true

    while (seguirBuscando) {
        if (cadena) {
            seguirBuscando = bloqueSinClave.hashBloqueAnterior === hashearBloque(cadenaExistente[cadenaExistente.length - 1])
            if (!seguirBuscando) {
                alert('alguien agregó un nuevo bloque a la cadena antes que pudiéramos encontrar la clave del bloque para agregarlo nosotros')
                return 'cancelado'
            }
        }
        bloqueSinClave.clave = clave
        let resultado = hashearBloque(bloqueSinClave)
        let empieza = empiezaConCero(resultado) // split e index
        if (empieza) {
            return clave
        } else {
            clave = clave + 1
        }
        await simularDemora(400)
    }
    return ''
}

async function tratarDeAgregarUnBloque(depositoTransaccionesPendientes: Transaccion[], cadenaExistente: Block[]) {
    let transaccionesPendientes = depositoTransaccionesPendientes
    let ultimoBloque = cadenaExistente[cadenaExistente.length - 1]
    let hashBloqueAnterior = hashearBloque(ultimoBloque)
    let transaccionesPendientesAprobadas = []
    let transaccionesDeLaCadena = cadenaATransacciones(cadenaExistente)
    for (let transaccionPendiente of transaccionesPendientes) {
        let transaccionesPrevias = [...transaccionesDeLaCadena, ...transaccionesPendientesAprobadas]
        let vale = verSiElQueDaTieneLaPlata(transaccionPendiente, transaccionesPrevias)
        if (vale) {
            if (hasValidTransactionSignature(transaccionPendiente, hashBloqueAnterior)) {
                transaccionesPendientesAprobadas.push(transaccionPendiente)
            } else {
                alert(`firma invalida. No vale la transacción de ${transaccionPendiente.da} a ${transaccionPendiente.recibe} por ${transaccionPendiente.cuanto}, la vamos a ignorar`)
            }
        } else {
            alert(`no vale la transacción de ${transaccionPendiente.da} a ${transaccionPendiente.recibe} por ${transaccionPendiente.cuanto}, la vamos a ignorar`)
        }
    }
    transaccionesPendientesAprobadas.unshift({ da: 'nadie', recibe: 'MineroA', cuanto: 1 , firma:''})
    let nuevoBloque: Block = {
        clave: '',
        hashBloqueAnterior,
        transacciones: transaccionesPendientesAprobadas,
    }

    let clave = await verQueAgregarleParaQueElHashEmpieceConCero(nuevoBloque,cadenaExistente , null, cadenaExistente)
    if (clave === 'cancelado') { return }
    nuevoBloque.clave = clave
    cadenaExistente.push(nuevoBloque)

    // let cadenaYTransResponse = await axios({
    //     data: cadenaExistente,
    //     method: 'post',
    //     url: '/cadena',
    // })
    // cadenaYTransResponse.data
    // mandarATodosLaCadenaConBloqueNuevo(cadenaExistente)

}
tratarDeAgregarUnBloque([], [])
// recibirTransaccion(transaccionEjemplo)

async function agregarATransaccionesPendientes(transaccion: Transaccion, clave: string, cadenaExistente: Block[]) {
    let ultimoBloque = cadenaExistente[cadenaExistente.length - 1]
    let hashUltimoBloque = hashearBloque(ultimoBloque)
    transaccion.firma = createTransactionSignature(transaccion, hashUltimoBloque, clave)
    // let pendientesResponse = await axios({
    //     data: transaccion,
    //     method: 'post',
    //     url: '/transaccion_pendiente',
    // })
}
agregarATransaccionesPendientes({da:'', recibe:'', cuanto:0, firma: ''},'',[])
function recibirUnaNuevaCadena(cadenaRecibida: Block[], cadenaExistente: Block[]) {
    let razon = esUnaCadenaInvalida(cadenaRecibida)
    if (razon) {
        alert(razon)
        return cadenaExistente
    } else {
        // pararLaBusquedaSiEstaActiva()
        if (cadenaRecibida.length > cadenaExistente.length) {
            alert('la cadena recibida es valida y mas larga que la existente, vamos a usar esa')
            return cadenaRecibida
        } else {
            // alert('la cadena recibida no es mas larga que la que tenemos')
            return cadenaExistente
        }
    }
}
recibirUnaNuevaCadena([],[])

function simularDemora(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function createTransactionSignature(transaccion: Transaccion, hashUltimoBloque: string, clave: string) {
    let privateE = bigInt(clave.split(',')[0])
    let publicN = bigInt(clave.split(',')[1])
    let transactionString = transactionToStringToSign(transaccion, hashUltimoBloque)
    let hash = md5(transactionString)
    const encodedMessage = RSA.encode(hash);
    return RSA.encrypt(encodedMessage, publicN, privateE).toString()
}
