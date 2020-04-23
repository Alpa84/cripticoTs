import * as React from 'react'
import * as _ from 'lodash'
import { GeneralType, Functions } from '../Types'
import Input from './Input'
import InputNumber from './InputNumber'
export interface Props {
  general: GeneralType
  blockIndex: number
  transactionIndex: number
  functions: Functions
}

function Transaction({ general, blockIndex, functions, transactionIndex }: Props) {
  let block = general.editableChain ? general.editableChain[blockIndex] : general.chain[blockIndex]
  let transaction = block.transactions[transactionIndex]
  return (
    <div>
      <div>
        <Input text='gives address' value={transaction.gives} onChange={
          (event) => functions.dispatch({
            type: 'changeChainTGives',
            gives: event.target.value,
            blockIndex,
            index: transactionIndex
          })
        } />
        <Input text='receives address' value={transaction.receives} onChange={
          (event) => functions.dispatch({
            type: 'changeChainTReceives',
            receives: event.target.value,
            blockIndex,
            index: transactionIndex
          })
        } />
        <InputNumber text='amount' value={transaction.amount} onChange={
          (event) => functions.dispatch({
            type: 'changeChainTAmount',
            amount: parseFloat(event.target.value),
            blockIndex,
            index: transactionIndex
          })
        } />
        <Input text='signature' value={transaction.signature ? transaction.signature : ''} onChange={
          (event) => functions.dispatch({
            type: 'changeChainTSignature',
            signature: event.target.value,
            blockIndex,
            index: transactionIndex
          })
        } />

        <button
          type="button"
          onClick={() => functions.dispatch({type: 'removeTransaction', blockIndex, index: transactionIndex})}
          className="btn btn-warning">Remove Transaction</button>

      </div>
    </div>
  )
}

export default Transaction;
