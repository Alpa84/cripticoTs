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
          <button id='generateKeys' type='button' onClick={functions.generateKeyPair} className='btn btn-large btn-block btn-primary'>Generate Public Address and Private Key</button>
          <div className="input-group">
            <div className="input-group-addon">Public Address</div>
            <input
              type="text"
              id='publicAddress'
              className="form-control"
              value={keyPair.address}
              data-key='keyPair.address'
              onChange={functions.generalChange} />
          </div>
          <div className="input-group">
            <div className="input-group-addon">Private Key</div>
            <input
              type="text"
              id='privateKey'
              className="form-control"
              value={keyPair.privateKey}
              data-key='keyPair.privateKey'
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
            id='alias'
            onChange={functions.generalChange} />
        </div>
        <button
          type="button"
          id='generateWallet'
          className="btn btn-large btn-block btn-default"
          onClick={functions.generateWallet}
        >
          Generate Wallet
        </button>
      </div>
    </div>
  )
}

export default KeyPair;
