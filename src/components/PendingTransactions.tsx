import * as React from 'react'
import { GeneralType } from '../Types'
import FixedTransaction from './FixedTransaction';
export interface Props {
  general: GeneralType
}

function PendingTransactions({ general }: Props) {

  return (
    <div className='card'>
      <div className='card-body'>
        <table className='table inside fixedTable'>
          <tbody>
            {
              general.pendingTransactions.map((transaction, transIndex) => (
                <tr key={transIndex}>
                  <td scope="row">
                    <div key={transIndex}>
                      <FixedTransaction general={general} transaction={transaction} />
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )

}

export default PendingTransactions;
