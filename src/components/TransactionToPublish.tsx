import * as React from 'react'
import * as _ from 'lodash'
import { Functions, GeneralType } from '../Types'
import InputNumber from './InputNumber'
export interface Props {
  general: GeneralType
  functions: Functions
}

function TransactionToPublish({ general, functions }: Props) {
  let daOptions = _.map(general.directorio, (value, key) => (
    <option key={key} value={key} >{value.alias}</option>
  ))
  const empty = () => (<option disabled={true} value='' key={-1}> -- </option>)
  daOptions.unshift(empty())
  let recibeOptions = _.map(general.directorio, (value, key) => (
    <option key={key} value={key} >{value.alias}</option>
  ))
  recibeOptions.unshift(empty())
  let toPub = general.transactionToPublish
  let signEnabled = toPub.gives && toPub.receives && toPub.amount && toPub.secretKey
  let publishEnabled = signEnabled && toPub.signature
  return (
    <div>
      <div className="input-group">
        <div className="input-group-addon">da</div>
        <select
          name="da"
          className="form-control"
          onChange={functions.generalChange}
          value={general.transactionToPublish.gives}
          data-key='transactionToPublish.gives'
        >
          {daOptions}
        </select>
      </div>
      <div className="input-group">
        <div className="input-group-addon">recibe</div>
        <select
          name="recibe"
          className="form-control"
          onChange={functions.generalChange}
          value={general.transactionToPublish.receives}
          data-key='transactionToPublish.receives'
        >
          {recibeOptions}
        </select>
      </div>
      <InputNumber text='cuanto' value={general.transactionToPublish.amount} onChange={functions.generalChange} path='transactionToPublish.amount'/>
      <div className="input-group">
        <div className="input-group-addon">clave privada</div>
        <input
          type='password'
          name='password'
          className="form-control"
          value={general.transactionToPublish.secretKey}
          data-key={'transactionToPublish.secretKey'}
          onChange={functions.generalChange} />
      </div>
      <p>Firma de Transacción: {general.transactionToPublish.signature}</p>
      <p>para agregar en el bloque número {general.cadena.length}</p>
      <button
        disabled={!signEnabled }
        type="button"
        className="btn
        btn-warning"
        onClick={functions.firmarTransaccion}>firmar con clave privada</button>
      <button
        disabled={!publishEnabled}
        type="button"
        className="btn btn-default"
        onClick={functions.publishTransaction}>Publicar Transacción</button>
    </div>
  )
}

export default TransactionToPublish;
