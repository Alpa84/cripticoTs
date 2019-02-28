import * as React from 'react'
import * as _ from 'lodash'
import { Functions, GeneralType } from '../Types'
import InputNumber from './InputNumber'
import Input from './Input'
export interface Props {
  general: GeneralType
  functions: Functions
}

function TransactionToPublish({ general, functions }: Props) {
  let daOptions = _.map(general.directorio, (key, value) => (
    <option key={value} value={value} >{key}</option>
  ))
  const empty = () => (<option disabled={true} value='empty' key={-1}> -- select an option -- </option>)
  // if (!general.directorio[general.transactionToPublish.da]) {
    daOptions.push(empty())
  // }
  let recibeOptions = _.map(general.directorio, (key, value) => (
    <option key={value} value={value} >{key}</option>
  ))
  // if (!general.directorio[general.transactionToPublish.recibe]) {
  //   recibeOptions.push(empty())
  // }
  return (
    <div>
      <select
        name="da"
        id="inputda"
        className="form-control"
        onChange={functions.generalChange}
        value={general.transactionToPublish.da}
        data-key = 'transactionToPublish.da'
        >
        {daOptions}
      </select>
      <div className="input-group">
        <div className="input-group-addon">da</div>
        <input
          type="text"
          className="form-control"
          id="exampleInputAmount"
          name='username'
          value={general.transactionToPublish.da}
          data-key={'transactionToPublish.da'}
          onChange={functions.generalChange} />
      </div>
      <select
        name="recibe"
        id="inputrecibe"
        className="form-control"
        onChange={functions.generalChange}
        value={general.transactionToPublish.recibe}
        data-key='transactionToPublish.recibe'
      >
        {recibeOptions}
      </select>
      <Input text='recibe dirección' value={general.transactionToPublish.recibe} onChange={functions.generalChange} path='transactionToPublish.recibe'/>
      <InputNumber text='cuanto' value={general.transactionToPublish.cuanto} onChange={functions.generalChange} path='transactionToPublish.cuanto'/>
      <div className="input-group">
        <div className="input-group-addon">clave secreta</div>
        <input
          type='password'
          name='password'
          className="form-control"
          id="exampleInputAmount"
          value={general.transactionToPublish.secretKey}
          data-key={'general.transactionToPublish.secretKey'}
          onChange={functions.generalChange} />
      </div>
      <p>Firma: {general.transactionToPublish.firma}</p>
      <p>para agregar en el bloque número {general.cadena.length}</p>
      <button type="button" className="btn btn-warning" onClick={functions.firmarTransaccion}>firmar con clave privada</button>
      <button type="button" className="btn btn-default" onClick={functions.publishTransaction}>Publicar Transacción</button>
    </div>
  )
}

export default TransactionToPublish;
