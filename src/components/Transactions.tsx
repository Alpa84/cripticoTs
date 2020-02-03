import * as React from 'react'
import { GeneralType, Functions } from '../Types'
import Transaction from './Transaction';
export interface Props {
  general: GeneralType,
  blockIndex: number
  functions: Functions
}

function Transactions({ general, functions, blockIndex }: Props) {
  let transactions = general.editableChain ? general.editableChain[blockIndex].transactions : general.chain[blockIndex].transactions
  return (
    <div className="Transactions">
      {
        transactions.map((transaccion, transIndex) => (
          <div className="panel panel-default" key={transIndex}>
            <div className="panel-body">
              <div key={transIndex}>
                <Transaction general={general} transactionIndex={transIndex} blockIndex={blockIndex} functions={functions} />
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Transactions;
