import * as React from 'react'
import { GeneralType, Functions } from '../Types'
import Transaction from './Transaction';
import TourWrapper from './TourWrapper';
export interface Props {
  general: GeneralType,
  blockIndex: number
  functions: Functions
}

function Transactions({ general, functions, blockIndex }: Props) {
  let transactions = general.editableChain ? general.editableChain[blockIndex].transactions : general.chain[blockIndex].transactions
  return (
      <ul className="list-group list-group-flush">
        {
          transactions.map((transaction, transIndex) => (
            <li className="list-group-item" key={transIndex}>
              { transIndex === transactions.length -1 && (
                <button
                  type="button"
                  onClick={() => functions.dispatch({ type: 'addTransaction', blockIndex })}
                  className="btn btn-primary ">Add Transaction</button>
              )}
              <TourWrapper
                general={general}
                functions={functions}
                tutName={transIndex === 0 && blockIndex === 0  ? 'transaction' : ''}
              >
                <h5 className="card-title">transaction {transIndex + 1}</h5>
                <Transaction general={general} transactionIndex={transIndex} blockIndex={blockIndex} functions={functions} />
              </TourWrapper>
            </li>
          )).reverse()
        }
      </ul>
  )
}

export default Transactions;
