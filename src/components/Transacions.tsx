import * as React from 'react'
import { Transaccion } from '../Types'
import Transaction from './Transaction';
export interface Props {
  transactions: Transaccion[]
  blockIndex: number
  generalChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function Transactions({ transactions, generalChange, blockIndex }: Props) {
  return (
    <div className="Transactions">
      {
        transactions.map((transaccion, transIndex) => (
          <div className="panel panel-default" key={transIndex}>
            <div className="panel-body">
              <div key={transIndex}>
                <Transaction transaction={transaccion} path={`cadena[${blockIndex}].transacciones[${transIndex}]`}  onChange={generalChange} />
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Transactions;
