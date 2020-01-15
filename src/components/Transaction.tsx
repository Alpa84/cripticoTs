import * as React from 'react'
import * as _ from 'lodash'
import { GeneralType } from '../Types'
import InputNumber from './InputNumber'
import Input from './Input'
export interface Props {
  general: GeneralType
  blockIndex: number
  transactionIndex: number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  editable: boolean
}

function Transaction({ general, blockIndex, onChange, transactionIndex, editable }: Props) {
  let block = general.cadena[blockIndex]
  let transaction = block.transactions[transactionIndex]
  let path = `cadena[${blockIndex}].transacciones[${transactionIndex}]`
  let recibe = _.has(general.directorio, transaction.receives) ? general.directorio[transaction.receives].alias : transaction.receives
  let da = _.has(general.directorio, transaction.gives) ? general.directorio[transaction.gives].alias : transaction.gives
  return (
    <div>
      {editable ? (
        <div>
          <Input text='da' value={transaction.gives} onChange={onChange} path={`${path}.amount`} />
          <Input text='recibe' value={transaction.receives} onChange={onChange} path={`${path}.receives`} />
          <InputNumber text='cuanto' value={transaction.amount} onChange={onChange} path={`${path}.amount`} />
          <Input text='firma' value={transaction.signature ? transaction.signature : ''} onChange={onChange} path={`${path}.signature`} />
        </div>
      ) : (
        <div>
            <p>da: {da}</p>
            <p>recibe: {recibe}</p>
            <p>cuanto: {transaction.amount}</p>
            <p>firma: {transaction.signature}</p>
        </div>
      )}

    </div>
  )
}

export default Transaction;
