import * as React from 'react'
import { KeyPair, Functions, GeneralType } from '../Types'
import FixedInput from './FixedInput'
export interface Props {
  general: GeneralType
  functions: Functions
}

function KeyPair({ general, functions }: Props) {
  let keyPair = general.keyPair
  let hint: string
  if (general.keyPair.address === '') {
    hint = 'first, generate a Public Address above'
  } else if (general.alias === '') {
    hint = 'type an alias for your wallet'
  } else {
    hint = ''
  }
  let aliasList = Object.keys(general.wallets).map(
    (key) => general.wallets[key].alias
  )
  let isAliasTaken = aliasList.indexOf(general.alias) >= 0
  const handleGenerateClick = () => {
    functions.dispatch({ type: 'generateWallet' })
    functions.showNotification('walletGenerated')
  }
  return (
    <div data-tut="keyPair">
      <h2>Wallet Generator</h2>
      <p>Be someone in the crypto-word! Generate your wallet.</p>
      <button
        id="generateKeys"
        type="button"
        onClick={() => {
          functions.loadingAndGenerateKeyPair()
        }}
        className="btn btn-primary"
      >
        Generate Public Address and Private Key
      </button>
      <div data-tut="onlyKeys">
        <FixedInput text="Public Address" value={keyPair.address} />
        <FixedInput text="Private Key" value={keyPair.privateKey} />
      </div>
      <div data-tut="alias">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">alias</span>
          </div>
          <input
            type="text"
            className="form-control"
            value={general.alias}
            data-key="alias"
            key="newAlias"
            onChange={(event) =>
              functions.dispatch({
                type: 'changeAlias',
                alias: event.target.value,
              })
            }
          />
        </div>
        {isAliasTaken && (
          <div className="alert alert-danger">
            <strong>That alias already exists, </strong>
            <span>please select another one.</span>
          </div>
        )}
        <button
          type="button"
          id="generateWallet"
          className="btn btn-primary"
          onClick={handleGenerateClick}
          disabled={general.keyPair.address === '' || general.alias === ''}
        >
          Generate Wallet
        </button>
        {hint && <span className="hint"> {hint} </span>}
        {general.notifications.walletGenerated && (
          <div className="alert alert-success">
            <strong>Wallet Generated. </strong>
            <span>You will find it the Wallets section.</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default KeyPair
