import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as axios from 'axios'
import * as _ from 'lodash'
import General from './components/General'
import { GeneralType, Transaccion, Directorio, Block } from './Types'
import { generateKeyPair } from './utils/rsa'
import './index.css';
import registerServiceWorker from './registerServiceWorker'
import { tratarDeAgregarUnBloque, createTransactionSignature, hashearBloque } from './utils/blockchain';


let general: GeneralType = {
  cadena: [],
  directorio: {},
  keyPair: {
    clave: '',
    direccion: '',
  },
  transaccionesPendientes: [],
  transactionToPublish: {da: '', recibe:'', cuanto: 0, firma:'' },
}

const generateKeyPairAndUpdate = () => {
  let keyPair = generateKeyPair()
  general.keyPair =  keyPair
  general.transactionToPublish.da = keyPair.direccion
  update()
}
const publishTransaction = async () => {
  let response = await axios.default.post<Transaccion[]>('http://localhost:5000/transaccion_pendiente', general.transactionToPublish)
  general.transaccionesPendientes =  response.data
  update()
}
const preguntarYAgregarAlias = async() => {
  let alias = prompt('cual es el alias de la direccion?')
  let response = await axios.default.post<Directorio>('http://localhost:5000/directorio', { direccion: general.keyPair.direccion, nombre: alias })
  general.directorio = response.data
}

const firmarTransaccion = async () => {
  let firma = createTransactionSignature(general.transactionToPublish, hashearBloque(_.last(general.cadena) as Block), general.keyPair.clave)
  general.transactionToPublish.firma = firma
  preguntarYAgregarAlias()
  update()

}

const updateChain = async () => {
  let response = await axios.default.get< GeneralType >('http://localhost:5000/cadena_y_transacciones_pendientes')
  general.cadena =  response.data.cadena
  general.transaccionesPendientes =  response.data.transaccionesPendientes
  general.directorio = response.data.directorio
  update()
}
// setInterval(() => {
  updateChain()
// }, 3000)


const generalChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement >) => {
  let element = event.target
  let path = element.getAttribute('data-key') as string
  let value: string | number = element.value
  if (path.split('.')[path.split('.').length - 1] === 'cuanto') {
    value = parseFloat(value)
  }
  _.set(general, path, value)
  update()
}
const minear = async() => {
  preguntarYAgregarAlias()
  let nuevaCadena = await tratarDeAgregarUnBloque(general.transaccionesPendientes, general.cadena, general.keyPair.direccion)
  general.cadena = nuevaCadena
  update()
}
const functions = {
  firmarTransaccion,
  generalChange,
  generateKeyPair: generateKeyPairAndUpdate,
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

