import * as React from 'react'
import { KeyPair, Functions, GeneralType } from '../Types'
export interface Props {
  general: GeneralType
  functions: Functions
}

function KeyPair({ general, functions }: Props) {
  let keyPair = general.keyPair
  return (
    <div className='KeyPair'>
      <div className='panel panel-default' >
        <div className='panel-body'>
          <button type='button' onClick={functions.generateKeyPair} className='btn btn-large btn-block btn-primary'>Generar Dirección y Clave</button>
          <div className="input-group">
            <div className="input-group-addon">direccion</div>
            <input
              type="text"
              className="form-control"
              value={keyPair.direccion}
              data-key='keyPair.direccion'
              onChange={functions.generalChange} />
          </div>
          <div className="input-group">
            <div className="input-group-addon">clave privada</div>
            <input
              type="text"
              className="form-control"
              value={keyPair.clave}
              data-key='keyPair.clave'
              onChange={functions.generalChange} />
          </div>
        </div>
        <div className="input-group">
          <div className="input-group-addon">alias</div>
          <input
            type="text"
            className="form-control"
            value={general.alias}
            data-key='alias'
            onChange={functions.generalChange} />
        </div>
        <button
          type="button"
          className="btn btn-large btn-block btn-default"
          onClick={functions.generateWallet}
        >
          Generar Billetera
        </button>
      </div>
    </div>
  )
}

export default KeyPair;
