import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as axios from 'axios'
import * as _ from 'lodash'
import General from './components/General'
import { GeneralType, Transaccion, Directorio, Block } from './Types'
import { generateKeyPair } from './utils/rsa'
import './index.css';
import registerServiceWorker from './registerServiceWorker'
import { createTransactionSignature, hashearBloque, calcularCuantoTieneElQueDa, hashearBloqueConClave, validateTransactions, empiezaConCero, simularDemora } from './utils/blockchain';

let defaultUrl = 'http://localhost:5000'

let general: GeneralType = {
  balance:{},
  cadena: [],
  dirToAddMined:'',
  directorio: {},
  keyPair: {
    clave: '',
    direccion: '',
  },
  transaccionesPendientes: [],
  transactionToPublish: {da: '', recibe:'', cuanto: 0, firma:'', secretKey:'' },
}

const generateKeyPairAndUpdate = () => {
  let keyPair = generateKeyPair()
  general.transactionToPublish.da = keyPair.direccion
  update()
}
const publishTransaction = async () => {
  let response = await axios.default.post<Transaccion[]>(`${defaultUrl}/transaccion_pendiente`, general.transactionToPublish)
  general.transaccionesPendientes =  response.data
  update()
}
const publishChain = async (cadena: Block[]) => {
  try {
    let response = await axios.default.post<{cadena: Block[]}>(`${defaultUrl}/cadena`, cadena)
    general.cadena = response.data.cadena
    update()
  } catch (error) {
    console.error(error)
  }
}
const preguntarYAgregarAlias = async(path:string) => {
  let dir = _.get(general, path)
  if(!_.has(general.directorio, dir)) {
    let alias = prompt('cual es el alias de la direccion?')
    let response = await axios.default.post<Directorio>(`${defaultUrl}/directorio`, { direccion: general.keyPair.direccion, nombre: alias })
    general.directorio = response.data
  }
}

const firmarTransaccion = async () => {
  let firma = createTransactionSignature(general.transactionToPublish, hashearBloque(_.last(general.cadena) as Block), general.transactionToPublish.secretKey)
  general.transactionToPublish.firma = firma
  preguntarYAgregarAlias('transactionToPublish.da')
  update()

}

const updateChain = async () => {
  let response = await axios.default.get< GeneralType >(`${defaultUrl}/cadena_y_transacciones_pendientes`)
  general.cadena =  response.data.cadena
  general.transaccionesPendientes =  response.data.transaccionesPendientes
  general.directorio = response.data.directorio
  let transacciones = _.flatMap(general.cadena, (cadena: Block) => cadena.transacciones)
  let reciben = _.uniq(transacciones.map( transaccion => transaccion.recibe))
  general.balance = _.reduce(reciben, (obj, recibe) => {
    obj[recibe] = calcularCuantoTieneElQueDa(transacciones, recibe)
    return obj
  }, {})
  update()
}
setInterval(() => {
  updateChain()
}, 3000)


const generalChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement >) => {
  let element = event.target
  let path = element.getAttribute('data-key') as string
  let value: string | number = element.value
  if (path.split('.')[path.split('.').length - 1] === 'cuanto') {
    value = parseFloat(value)
  }
  _.set(general, path, value)
  // don't know why the line above wont work for the secret key
  if (path === 'general.transactionToPublish.secretKey') { general.transactionToPublish.secretKey = value.toString()}
  update()
}
const minear = async() => {
  preguntarYAgregarAlias('dirToAddMined')
  let bloqueSinClave = validateTransactions(general.transaccionesPendientes, general.cadena, general.dirToAddMined)
  general.minedBlock = bloqueSinClave
  let clave = 0
  let keepSearching = true
  while (keepSearching) {
    bloqueSinClave.clave = clave.toString()
    let resultado = hashearBloqueConClave(bloqueSinClave, clave)
    let empieza = empiezaConCero(resultado)
    if (empieza) {
      keepSearching = false
    } else {
      clave = clave + 1
    }
    update()
    await simularDemora(4)
  }
  bloqueSinClave.clave = clave.toString()
  general.cadena.push(bloqueSinClave)
  delete general.minedBlock
  publishChain(general.cadena)
  update()
}
const functions = {
  firmarTransaccion,
  generalChange,
  generateKeyPair: generateKeyPairAndUpdate,
  hashearBloque,
  minear,
  publishTransaction,
}
const update =  () => {
  ReactDOM.render(
    <General general={general} functions={functions}/>,
    document.getElementById('root') as HTMLElement
  );
}

update()
registerServiceWorker();

