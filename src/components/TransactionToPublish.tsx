import * as React from 'react'
import * as _ from 'lodash'
import { Functions, GeneralType } from '../Types'
import TourWrapper from './TourWrapper'
import FixedInput from './FixedInput'
import { calculateOwnerCoinsFromChain } from 'src/utils/blockchain'
export interface Props {
  general: GeneralType
  functions: Functions
}
export const Empty = () => (<option disabled={true} value='' key={-1}> -- </option>)

function TransactionToPublish({ general, functions }: Props) {
  let givesOptions = _.map(general.wallets, (value, key) => (
    <option key={key} value={key} >{value.alias}</option>
  ))
  givesOptions.unshift(Empty())
  let receivesOptions = _.map(general.wallets, (value, key) => (
    <option key={key} value={key} >{value.alias}</option>
  ))
  receivesOptions.unshift(Empty())
  let toPub = general.transactionToPublish
  let signEnabled = toPub.gives && toPub.receives && toPub.amount && toPub.secretKey
  let signHint
  if (! toPub.gives) {
    signHint = 'first choose a giver above'
  } else if (!toPub.receives) {
    signHint = 'choose a receiver'
  } else if (!toPub.amount) {
    signHint = 'enter an amount'
  } else if (!toPub.secretKey) {
    signHint = "paste the giver's secret key"
  }
  let publishEnabled = signEnabled && toPub.signature
  let giverFunds = calculateOwnerCoinsFromChain(general.chain, toPub.gives)
  let showAmountWarning = !!toPub.amount && !!toPub.gives && toPub.amount > giverFunds
  return (
    <TourWrapper general={general} functions={functions} tutName='publish'>
      <h2>Transaction Generator</h2>
      <p>Declare that you want to transfer some coins.</p>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <label className="input-group-text" >gives</label>
          </div>
        <select
          name="gives"
          id='toPublishGives'
          className="custom-select"
          onChange={(event) => functions.dispatch({ type: 'changeGives', gives: event.target.value})}
          value={general.transactionToPublish.gives}
        >
          {givesOptions}
        </select>
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
            <label className="input-group-text">receives</label>
          </div>
        <select
          name="receives"
          id='toPublishReceives'
          className="custom-select"
          onChange={(event) => functions.dispatch({ type: 'changeReceives', receives: event.target.value })}
          value={general.transactionToPublish.receives}
        >
          {receivesOptions}
        </select>
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
            <span className="input-group-text">amount</span>
          </div>
        <input
          id='toPublishAmount'
          type="number"
          className="form-control"
          onChange={(event) => functions.dispatch({type:'changeTransactionAmount' , amount: parseFloat(event.target.value)})}
          value={general.transactionToPublish.amount}
        />
      </div>
      { showAmountWarning && (
        <div className="alert alert-danger">
          The giver only has ${giverFunds}. You can create the transaction anyway but the miners will ignore it.
        </div>
      )}
      <div className="input-group mb-3">
        <div className="input-group-prepend">
            <span className="input-group-text">giver's private Key</span>
          </div>
        <input
          type='password'
          name='password'
          id = 'toPublishPass'
          className="form-control"
          value={general.transactionToPublish.secretKey}
          onChange={(event) => functions.dispatch({ type: 'changeTransactionSecretKey', secretKey: event.target.value })} />
      </div>
      <button
        disabled={!signEnabled}
        type="button"
        id='toPublishSign'
        className="btn btn-primary"
        onClick={() => {
          functions.dispatch({ type: 'signTransaction' })
          functions.setStep(15)
        }}
      >Sign with private Key</button>
      {!signEnabled &&
        <span className='hint'> {signHint}</span>}
      <FixedInput text='Transaction Signature' value={general.transactionToPublish.signature} />
      <FixedInput text='to add in Block number' value={ general.chain.length + 1 } />
      {general.signatureError && (
        <div>{general.signatureError}</div>
      )}
      <button
        disabled={!publishEnabled}
        type="button"
        id='toPublishPublish'
        className="btn btn-primary"
        onClick={()=>{
          functions.dispatch({ type: 'publishTransaction' })
          functions.showNotification('transactionPublished')
          functions.setStep(17)
        } }
        >Publish Transaction</button>
      {!publishEnabled &&
        <span className='hint'> first sign the transaction</span>}
      {general.notifications.transactionPublished && (
        <div className="alert alert-success">
          <strong>Transaction Published.</strong>
          <span >You will find it in the next section.</span>
        </div>
      )}
    </TourWrapper>
  )
}

export default TransactionToPublish;
