import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as axios from 'axios'
import * as bigInt from 'big-integer'
import * as md5 from 'md5'
import * as _ from 'lodash'
import General from './components/General'
import { GeneralType, Transaccion } from './Types'
import { generateKeyPair, RSA } from './utils/rsa'
import './index.css';
import registerServiceWorker from './registerServiceWorker'


let general: GeneralType = {
  cadena: [],
  keyPair: {
    clave: '',
    direccion: '',
  },
  transaccionesPendientes: [],
  transactionToPublish: {da: '', recibe:'', cuanto: 0 },
}


const generateKeyPairAndUpdate = () => {
  let keyPair = generateKeyPair()
  general.keyPair =  keyPair
  update()
}
const publishTransaction = async () => {
  let response = await axios.default.post<Transaccion[]>('http://localhost:5000/transaccion_pendiente', general.transactionToPublish)
  general.transaccionesPendientes =  response.data
  update()
}
const firmarTransaccion = () => {
  let privateE = bigInt(general.keyPair.clave.split(',')[0])
  let publicN = bigInt(general.keyPair.clave.split(',')[1])
  // atenti al hash ultimo bloque que está como string
  let transactionString = transactionToStringToSign(general.transactionToPublish, 'hashUltimoBloque')
  let hash = md5(transactionString)
  const encodedMessage = RSA.encode(hash);
  general.transactionToPublish.firma =  RSA.encrypt(encodedMessage, publicN, privateE).toString()
  update()
}
function transactionToStringToSign(transaccion: Transaccion, hashUltimoBloque: string) {
  return `da: ${transaccion.da}, recibe: ${transaccion.recibe}, cuanto: ${transaccion.cuanto}, hashUtlimoBloque: ${hashUltimoBloque}`
}
const updateChain = async () => {
  let response = await axios.default.get< GeneralType >('http://localhost:5000/cadena_y_transacciones_pendientes')
  general.cadena =  response.data.cadena
  general.transaccionesPendientes =  response.data.transaccionesPendientes
  update()
}
setInterval(() => {
  updateChain()
}, 3000)

const generalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  let element = event.target
  let path = element.getAttribute('data-key') as string
  let value: string | number = element.value
  if (path.split('.')[path.split('.').length - 1] === 'cuanto') {
    value = parseFloat(value)
  }
  _.set(general, path, value)
  update()
}
const functions = {
  firmarTransaccion,
  generalChange,
  generateKeyPair: generateKeyPairAndUpdate,
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

