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
            <p>hash bloque anterior: {general.minedBlock.hashBloqueAnterior}</p>
            <p>clave: {general.minedBlock.clave}</p>
          </div>
          <h3>transacciones</h3>
          {
            general.minedBlock.transacciones.map((transaccion, index) => (
              <div key={index}>
                <p>da: {transaccion.da}</p>
                <p>recibe: {transaccion.recibe}</p>
                <p>cuanto: {transaccion.cuanto}</p>
                <p>firma: {transaccion.firma}</p>
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
