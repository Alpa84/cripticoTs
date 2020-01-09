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
                <div data-toggle="tooltip" title={`dir: ${transaccion.da}`} >da: {prefferName(transaccion.da, general)}</div>
                <div data-toggle="tooltip" title={`dir: ${transaccion.recibe}`} >recibe: {prefferName(transaccion.recibe, general)}</div>
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
const prefferName =  (dir: string, general: GeneralType) => {
  let name = general.directorio[dir]
  return name ? name.alias : dir
}
export default PendingTransactions;
