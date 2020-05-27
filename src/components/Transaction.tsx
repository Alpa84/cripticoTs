import * as React from 'react'
import * as _ from 'lodash'
import { GeneralType, Functions, SingleTransactionValidation } from '../Types'
import Input from './Input'
import InputNumber from './InputNumber'
import { Mined } from 'src/utils/defaultChain'
export interface Props {
  general: GeneralType
  blockIndex: number
  transactionIndex: number
  functions: Functions
  validation?: SingleTransactionValidation
}

function Transaction({ general, blockIndex, functions, transactionIndex, validation }: Props) {
  let block = general.editableChain ? general.editableChain[blockIndex] : general.chain[blockIndex]
  let transaction = block.transactions[transactionIndex]
  let hint = general.wallets[transaction.gives] ? `(${general.wallets[transaction.gives].alias})`
   : `(no wallet with that address)`
  return (
    <div>
      <div>

        {(transaction.gives !== Mined)  &&
          (<span className='hint' >{hint}</span>)
        }
        <Input text='gives address' value={transaction.gives} onChange={
          (event) => functions.dispatch({
            type: 'changeChainTGives',
            gives: event.target.value,
            blockIndex,
            index: transactionIndex
          })
        } />
        {(validation && validation.gives) && (
          <div className="alert alert-danger">
            <strong>Invalid Transaction </strong>
            <span >{validation.gives}</span>
          </div>
        )}
        {general.wallets[transaction.receives] ? (
          <span className='hint' >{`(${general.wallets[transaction.receives].alias})`}</span>
        ) : (
            <span className='hint' >{`(no wallet with that address)`}</span>
          )}
        <Input text='receives address' value={transaction.receives} onChange={
          (event) => functions.dispatch({
            type: 'changeChainTReceives',
            receives: event.target.value,
            blockIndex,
            index: transactionIndex
          })
        } />
        {(validation && validation.receives) && (
          <div className="alert alert-danger">
            <strong>Invalid Transaction </strong>
            <span >{validation.receives}</span>
          </div>
        )}
        <InputNumber text='amount' value={transaction.amount} onChange={
          (event) => functions.dispatch({
            type: 'changeChainTAmount',
            amount: parseFloat(event.target.value),
            blockIndex,
            index: transactionIndex
          })
        } />
        {(validation && validation.amount) && (
          <div className="alert alert-danger">
            <strong>Invalid Transaction </strong>
            <span >{validation.amount}</span>
          </div>
        )}
        <Input text='signature' value={transaction.signature ? transaction.signature : ''} onChange={
          (event) => functions.dispatch({
            type: 'changeChainTSignature',
            signature: event.target.value,
            blockIndex,
            index: transactionIndex
          })
        } />
        {(validation && validation.signature) && (
          <div className="alert alert-danger">
            <strong>Invalid Transaction </strong>
            <span >{validation.signature}</span>
          </div>
        )}

        <button
          type="button"
          onClick={() => functions.dispatch({type: 'removeTransaction', blockIndex, index: transactionIndex})}
          className="btn btn-warning">Remove Transaction</button>

      </div>
    </div>
  )
}

export default Transaction;
