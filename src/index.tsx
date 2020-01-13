import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as axios from 'axios'
import * as _ from 'lodash'
import General from './components/General'
import { GeneralType, Transaccion, Directorio, Block, WalletDetails, DirectorioAPI, Functions } from './Types'
import { generateKeyPair } from './utils/rsa'
import './index.css';
import registerServiceWorker from './registerServiceWorker'
import { createTransactionSignature, hashearBloque, calcularCuantoTieneElQueDa, hashearBloqueConClave, validateTransactions, empiezaConCero, simularDemora } from './utils/blockchain';

// TBD Make the following fix for prod/local less brittle
// CORS network error ?
// let defaultUrl = 'http://localhost:5000'
let defaultUrl = ''

let general: GeneralType = {
  alias: '',
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
  general.keyPair = keyPair
  update()
}
const publishTransaction = async () => {
  let response = await axios.default.post<Transaccion[]>(`${defaultUrl}/pending_transaction`, general.transactionToPublish)
  general.transaccionesPendientes =  response.data
  update()
}
const publishChain = async (cadena: Block[]) => {
  try {
    let response = await axios.default.post<{cadena: Block[]}>(`${defaultUrl}/chain`, cadena)
    general.cadena = response.data.cadena
    update()
  } catch (error) {
    console.error(error)
  }
}
const generateWallet = async() => {
  let details: WalletDetails = { alias: general.alias , privateKey: general.keyPair.clave}
  let directorioApi: DirectorioAPI = { address: general.keyPair.direccion, details }
  let response = await axios.default.post<Directorio>(`${defaultUrl}/wallets`, directorioApi)
  general.directorio = response.data
  update()
}

const firmarTransaccion = async () => {
  let firma = createTransactionSignature(general.transactionToPublish, hashearBloque(_.last(general.cadena) as Block), general.transactionToPublish.secretKey )
  general.transactionToPublish.firma = firma
  update()

}
const calculateOwnerCoinsFromChain = (chain: Block[], address: string) => {
  let transacciones = _.flatMap(chain, (block: Block) => block.transacciones)
    return calcularCuantoTieneElQueDa(transacciones, address)
}
const updateChain = async () => {
  let response = await axios.default.get<GeneralType>(`${defaultUrl}/pending_transactions_and_chain`)
  general.cadena =  response.data.cadena
  general.transaccionesPendientes =  response.data.transaccionesPendientes
  general.directorio = response.data.directorio
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
  if (path === 'general.transactionToPublish.firma') { general.transactionToPublish.firma = value.toString()}
  update()
}
const minear = async() => {
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
const functions: Functions = {
  calculateOwnerCoinsFromChain,
  firmarTransaccion,
  generalChange,
  generateKeyPair: generateKeyPairAndUpdate,
  generateWallet,
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

