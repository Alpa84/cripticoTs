import * as React from 'react'
import { KeyPair, Functions, GeneralType } from '../Types'
export interface Props {
  general: GeneralType
  functions: Functions
}

function KeyPair({ general, functions }: Props) {
  let keyPair = general.keyPair
  return (
    <div className='panel panel-default' >
      <div className='panel-body' data-tut="keyPair">
        <button
          id='generateKeys'
          type='button'
          onClick={()=> functions.dispatch({type: 'generateKeyPair'})}
          className='btn btn-large btn-block btn-primary'>Generate Public Address and Private Key</button>
        <div className='longString'>Public Address: {keyPair.address}</div>
        <div className='longString'>Private Key: {keyPair.privateKey}</div>
      </div>
      <div data-tut="alias">
        <div className="input-group">
          <div className="input-group-addon">alias</div>
          <input
            type="text"
            className="form-control"
            value={general.alias}
            data-key='alias'
            key='newAlias'
            onChange={(event)=>functions.dispatch({type:'changeAlias', alias: event.target.value})} />
        </div>
        <button
          type="button"
          id='generateWallet'
          className="btn btn-large btn-block btn-default"
          onClick={()=> functions.dispatch({type: 'generateWallet'}) }
        >
          Generate Wallet
        </button>
      </div>
    </div>
  )
}

export default KeyPair;
