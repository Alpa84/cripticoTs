import * as React from 'react'
import { GeneralType } from '../Types'
import FixedTransaction from './FixedTransaction'
export interface Props {
  general: GeneralType
}

function PendingTransactions({ general }: Props) {
  return (
    <div className="card">
      <div className="card-body">
        <table className="table inside fixedTable">
          <tbody>
            {general.pendingTransactions.length === 0 && (
              <tr>
                <td scope="row">
                  <div>No pending transactions</div>
                </td>
              </tr>
            )}
            {general.pendingTransactions.map((transaction, transIndex) => (
              <tr key={transIndex}>
                <td scope="row">
                  <div key={transIndex}>
                    <FixedTransaction
                      general={general}
                      transaction={transaction}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PendingTransactions
