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
  let signEnabled = toPub.da && toPub.recibe && toPub.cuanto && toPub.secretKey
  let publishEnabled = signEnabled && toPub.firma
  return (
    <div>
      <div className="input-group">
        <div className="input-group-addon">da</div>
        <select
          name="da"
          className="form-control"
          onChange={functions.generalChange}
          value={general.transactionToPublish.da}
          data-key='transactionToPublish.da'
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
          value={general.transactionToPublish.recibe}
          data-key='transactionToPublish.recibe'
        >
          {recibeOptions}
        </select>
      </div>
      <InputNumber text='cuanto' value={general.transactionToPublish.cuanto} onChange={functions.generalChange} path='transactionToPublish.cuanto'/>
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
      <p>Firma de Transacción: {general.transactionToPublish.firma}</p>
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
