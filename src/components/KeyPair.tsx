import * as React from 'react'
import { KeyPair, Functions } from '../Types'
import Input from './Input';
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
          <Input text='direccion' value={keyPair.direccion} onChange={functions.generalChange} path={'keyPair.direccion'} />
          <Input text='clave privada' value={keyPair.clave} onChange={functions.generateKeyPair} path={'keyPair.clave'} />
        </div>
      </div>
    </div>
  )
}

export default KeyPair;
