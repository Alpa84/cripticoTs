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
        {
          _.map( general.directorio, (key, value) => (
            <option key={value} value={value}>{key}</option>
          ))
        }
      </select>

      <Input text='da' onChange={functions.generalChange} value={general.transactionToPublish.da} path='transactionToPublish.da' />
      <Input text='recibe dirección' value={general.transactionToPublish.recibe} onChange={functions.generalChange} path='transactionToPublish.recibe'/>
      <InputNumber text='cuanto' value={general.transactionToPublish.cuanto} onChange={functions.generalChange} path='transactionToPublish.cuanto'/>
      <Input text='firma' value={general.transactionToPublish.firma ? general.transactionToPublish.firma : ''} onChange={functions.generalChange} path='transactionToPublish.firma' />
      <p>para agregar en el bloque número {general.cadena.length}</p>
      <button type="button" className="btn btn-warning" onClick={functions.firmarTransaccion}>firmar con clave privada</button>
      <button type="button" className="btn btn-default" onClick={functions.publishTransaction}>Publicar Transacción</button>
    </div>
  )
}

export default TransactionToPublish;
