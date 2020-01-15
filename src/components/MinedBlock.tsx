import * as React from 'react'
import { GeneralType, Functions } from '../Types'
export interface Props {
  general: GeneralType
  functions: Functions,
}

function MinedBlock({ general, functions }: Props) {
  if (!general.minedBlock) {
    return (<span/>)
  }
  let blockIndex =  general.cadena.length
  return (
    <div className="MinedBlock">
      <div className='panel panel-primary'>
        <div className="panel-heading">Trying to add block {blockIndex}</div>
        <div className="panel-body">
          <div>
            <p>hash bloque anterior: {general.minedBlock.previousBlockHash}</p>
            <p>clave: {general.minedBlock.hash}</p>
          </div>
          <h3>transacciones</h3>
          {
            general.minedBlock.transactions.map((transaccion, index) => (
              <div key={index}>
                <p>da: {transaccion.gives}</p>
                <p>recibe: {transaccion.receives}</p>
                <p>cuanto: {transaccion.amount}</p>
                <p>firma: {transaccion.signature}</p>
              </div>
            ))
          }
          <p>hash: {functions.hashearBloque(general.minedBlock)}</p>
        </div>
      </div>
    </div>
  )
}

export default MinedBlock;
