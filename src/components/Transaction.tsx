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
  let transaction = block.transacciones[transactionIndex]
  let path = `cadena[${blockIndex}].transacciones[${transactionIndex}]`
  let recibe = _.has(general.directorio, transaction.recibe) ? general.directorio[transaction.recibe].alias : transaction.recibe
  let da = _.has(general.directorio, transaction.da) ? general.directorio[transaction.da].alias : transaction.da
  return (
    <div>
      {editable ? (
        <div>
          <Input text='da' value={transaction.da} onChange={onChange} path={`${path}.cuanto`} />
          <Input text='recibe' value={transaction.recibe} onChange={onChange} path={`${path}.recibe`} />
          <InputNumber text='cuanto' value={transaction.cuanto} onChange={onChange} path={`${path}.cuanto`} />
          <Input text='firma' value={transaction.firma ? transaction.firma : ''} onChange={onChange} path={`${path}.firma`} />
        </div>
      ) : (
        <div>
            <p>da: {da}</p>
            <p>recibe: {recibe}</p>
            <p>cuanto: {transaction.cuanto}</p>
            <p>firma: {transaction.firma}</p>
        </div>
      )}

    </div>
  )
}

export default Transaction;
