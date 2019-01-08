import * as React from 'react'
import { Transaccion } from '../Types'
export interface Props {
  transactions: Transaccion[]
}

function PendingTransactions({ transactions }: Props) {
  return (
    <div className="PendingTransactions">
      {
        transactions.map((transaccion, transIndex) => (
          <div className="panel panel-default" key={transIndex}>
            <div className="panel-body">
              <div key={transIndex}>
                <div>da: {transaccion.da}</div>
                <div>recibe: {transaccion.recibe}</div>
                <div>cuanto: {transaccion.cuanto}</div>
                <div>firma: {transaccion.firma}</div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default PendingTransactions;
