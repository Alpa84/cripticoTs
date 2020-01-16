import * as React from 'react'
import { GeneralType } from '../Types'
export interface Props {
  general: GeneralType
}

function PendingTransactions({ general }: Props) {

  return (
    <div className="PendingTransactions">
      {
        general.pendingTransactions.map((transaccion, transIndex) => (
          <div className="panel panel-default" key={transIndex}>
            <div className="panel-body">
              <div key={transIndex}>
                <div data-toggle="tooltip" title={`dir: ${transaccion.gives}`} >gives: {prefferName(transaccion.gives, general)}</div>
                <div data-toggle="tooltip" title={`dir: ${transaccion.receives}`} >receives: {prefferName(transaccion.receives, general)}</div>
                <div>amount: {transaccion.amount}</div>
                <div>signature: {transaccion.signature}</div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )

}
const prefferName =  (dir: string, general: GeneralType) => {
  let name = general.wallets[dir]
  return name ? name.alias : dir
}
export default PendingTransactions;
