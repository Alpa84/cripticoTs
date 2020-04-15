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
    <div className="Transactions">
      {general.editableChain && (
        <button
          type="button"
          onClick={() => functions.dispatch({type: 'addTransaction', blockIndex})}
          className="btn btn-large btn-block btn-default">Add Transaction</button>
      )}
      {
        transactions.map((transaction, transIndex) => (
          <TourWrapper
            general={general}
            functions={functions}
            key={transIndex}
            tutName={transIndex === 0 && blockIndex === 0  ? 'transaction' : ''}
          >
          <div className="panel panel-default" >
            <div className="panel-body">
              <div key={transIndex}>
                <Transaction general={general} transactionIndex={transIndex} blockIndex={blockIndex} functions={functions} />
              </div>
            </div>
          </div>
          </TourWrapper>
        )).reverse()
      }
    </div>
  )
}

export default Transactions;
