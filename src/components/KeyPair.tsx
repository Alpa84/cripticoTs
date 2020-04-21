import * as React from 'react'
import { KeyPair, Functions, GeneralType } from '../Types'
import TourWrapper from './TourWrapper'
export interface Props {
  general: GeneralType
  functions: Functions
}

function KeyPair({ general, functions }: Props) {
  let keyPair = general.keyPair
  return (
    <TourWrapper general={general} functions={functions} tutName={"keyPair"}>
      <h2>Wallet Generator</h2>
      <button
        id='generateKeys'
        type='button'
        onClick={() => {
          functions.dispatch({ type: 'generateKeyPair' })
          functions.setStep(3)
        }}
        className="btn btn-primary">Generate Public Address and Private Key</button>
      <div className='longString'>Public Address: {keyPair.address}</div>
      <div className='longString'>Private Key: {keyPair.privateKey}</div>
      <TourWrapper general={general} functions={functions} tutName={"alias"}>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">alias</span>
          </div>
          <input
            type="text"
            className="form-control"
            value={general.alias}
            data-key='alias'
            key='newAlias'
            onChange={(event) => functions.dispatch({ type: 'changeAlias', alias: event.target.value })} />
        </div>
        <button
          type="button"
          id='generateWallet'
          className="btn btn-primary"
          onClick={() => {
            functions.dispatch({ type: 'generateWallet' })
            functions.setStep(4)
          }}
          disabled={general.keyPair.address === '' || general.alias === ''}
        >
          Generate Wallet
        </button>
      </TourWrapper>

    </TourWrapper>
  )
}

export default KeyPair;
