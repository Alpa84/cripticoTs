import * as React from 'react'
import { GeneralType } from '../Types'
import Transaction from './Transaction';
export interface Props {
  general: GeneralType,
  blockIndex: number
  generalChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  editable: boolean
}

function Transactions({ general, generalChange, blockIndex, editable }: Props) {
  let transactions = general.editableChain ? general.editableChain[blockIndex].transactions : general.chain[blockIndex].transactions
  return (
    <div className="Transactions">
      {
        transactions.map((transaccion, transIndex) => (
          <div className="panel panel-default" key={transIndex}>
            <div className="panel-body">
              <div key={transIndex}>
                <Transaction general={general} transactionIndex={transIndex} blockIndex={blockIndex} onChange={generalChange} />
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Transactions;
