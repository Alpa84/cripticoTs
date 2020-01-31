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
  let block = general.chain[blockIndex]
  let transaction = block.transactions[transactionIndex]
  let path = `chain[${blockIndex}].transactions[${transactionIndex}]`
  let receives = _.has(general.wallets, transaction.receives) ? general.wallets[transaction.receives].alias : transaction.receives
  let gives = _.has(general.wallets, transaction.gives) ? general.wallets[transaction.gives].alias : transaction.gives
  return (
    <div>
      {editable ? (
        <div>
          <Input text='gives' value={transaction.gives} onChange={onChange} path={`${path}.gives`} />
          <Input text='receives' value={transaction.receives} onChange={onChange} path={`${path}.receives`} />
          <InputNumber text='amount' value={transaction.amount} onChange={onChange} path={`${path}.amount`} />
          <Input text='signature' value={transaction.signature ? transaction.signature : ''} onChange={onChange} path={`${path}.signature`} />
        </div>
      ) : (
        <div>
            <p>gives: {gives}</p>
            <p>receives: {receives}</p>
            <p>amount: {transaction.amount}</p>
            { transaction.signature && (
              <p className='longString'>signature: {transaction.signature}</p>
            )}
        </div>
      )}

    </div>
  )
}

export default Transaction;
