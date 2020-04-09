import * as React from 'react'
import { GeneralType } from '../Types'
import FixedTransaction from './FixedTransaction';
export interface Props {
  general: GeneralType
}

function PendingTransactions({ general }: Props) {

  return (
    <div className="PendingTransactions">
      {
        general.pendingTransactions.map((transaction, transIndex) => (
          <div className="panel panel-default" key={transIndex}>
            <div className="panel-body" id='pendingTransactionsPanel'>
              <div key={transIndex}>
                <FixedTransaction general={general} transaction={transaction} />
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )

}

export default PendingTransactions;
