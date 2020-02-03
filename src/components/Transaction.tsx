import * as React from 'react'
import * as _ from 'lodash'
import { GeneralType, Functions } from '../Types'
import InputNumber from './InputNumber'
import Input from './Input'
export interface Props {
  general: GeneralType
  blockIndex: number
  transactionIndex: number
  functions: Functions
}

function Transaction({ general, blockIndex, functions, transactionIndex }: Props) {
  let onChange = functions.generalChange
  let block = general.editableChain ? general.editableChain[blockIndex] : general.chain[blockIndex]
  let transaction = block.transactions[transactionIndex]
  let path = `editableChain[${blockIndex}].transactions[${transactionIndex}]`
  let receives = _.has(general.wallets, transaction.receives) ? general.wallets[transaction.receives].alias : transaction.receives
  let gives = _.has(general.wallets, transaction.gives) ? general.wallets[transaction.gives].alias : transaction.gives
  return (
    <div>
      {general.editableChain ? (
        <div>
          <Input text='gives' value={transaction.gives} onChange={onChange} path={`${path}.gives`} />
          <Input text='receives' value={transaction.receives} onChange={onChange} path={`${path}.receives`} />
          <InputNumber text='amount' value={transaction.amount} onChange={onChange} path={`${path}.amount`} />
          <Input text='signature' value={transaction.signature ? transaction.signature : ''} onChange={onChange} path={`${path}.signature`} />

          <button
            type="button"
            onClick={() => functions.removeTransaction(blockIndex, transactionIndex)}
            className="btn btn-large btn-block btn-warning">Remove Transaction</button>

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
