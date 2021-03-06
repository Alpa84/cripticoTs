import * as React from 'react'
import { GeneralType, Functions, TransactionValidation } from '../Types'
import Transaction from './Transaction'
export interface Props {
  general: GeneralType
  blockIndex: number
  functions: Functions
  validations?: TransactionValidation
}

function Transactions({ general, functions, blockIndex, validations }: Props) {
  let transactions = general.editableChain
    ? general.editableChain[blockIndex].transactions
    : general.chain[blockIndex].transactions
  return (
    <ul className="list-group list-group-flush">
      {validations && validations.general && (
        <div className="alert alert-danger">
          <strong>Invalid Transaction </strong>
          <span>{validations.general}</span>
        </div>
      )}
      <li className="list-group-item">
        <button
          type="button"
          onClick={() =>
            functions.dispatch({ type: 'addTransaction', blockIndex })
          }
          className="btn btn-primary "
        >
          Add Transaction
        </button>
      </li>
      {transactions
        .map((transaction, transIndex) => (
          <li className="list-group-item" key={transIndex}>
            <div
              className="transactionGeneric"
              data-tut={
                transIndex === 0 && blockIndex === 0 ? 'transaction' : ''
              }
            >
              <h5 className="card-title">transaction {transIndex + 1}</h5>
              <Transaction
                general={general}
                transactionIndex={transIndex}
                blockIndex={blockIndex}
                validation={validations ? validations[transIndex] : {}}
                functions={functions}
              />
            </div>
          </li>
        ))
        .reverse()}
    </ul>
  )
}

export default Transactions
