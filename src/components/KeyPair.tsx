import * as React from 'react'
import { KeyPair, Functions } from '../Types'
export interface Props {
  keyPair: KeyPair
  functions: Functions
}

function KeyPair({ keyPair, functions }: Props) {
  return (
    <div className='KeyPair'>
      <div className='panel panel-default' >
        <div className='panel-body'>
          <button type='button' onClick={functions.generateKeyPair} className='btn btn-large btn-block btn-primary'>Generar Dirección y Clave</button>
          <div>dirección: {keyPair.direccion}</div>
          <div>clave privada: {keyPair.clave}</div>
        </div>
      </div>
    </div>
  )
}

export default KeyPair;
