import * as React from 'react'
import { GeneralType } from '../Types'
export interface Props {
  general: GeneralType
}

function PendingTransactions({ general }: Props) {

  return (
    <div className="PendingTransactions">
      {
        general.transaccionesPendientes.map((transaccion, transIndex) => (
          <div className="panel panel-default" key={transIndex}>
            <div className="panel-body">
              <div key={transIndex}>
                <div data-toggle="tooltip" title={`dir: ${transaccion.gives}`} >da: {prefferName(transaccion.gives, general)}</div>
                <div data-toggle="tooltip" title={`dir: ${transaccion.receives}`} >recibe: {prefferName(transaccion.receives, general)}</div>
                <div>cuanto: {transaccion.amount}</div>
                <div>firma: {transaccion.signature}</div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )

}
const prefferName =  (dir: string, general: GeneralType) => {
  let name = general.directorio[dir]
  return name ? name.alias : dir
}
export default PendingTransactions;
