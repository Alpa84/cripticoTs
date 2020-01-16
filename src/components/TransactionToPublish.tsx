import * as React from 'react'
import * as _ from 'lodash'
import { Functions, GeneralType } from '../Types'
import InputNumber from './InputNumber'
export interface Props {
  general: GeneralType
  functions: Functions
}

function TransactionToPublish({ general, functions }: Props) {
  let givesOptions = _.map(general.wallets, (value, key) => (
    <option key={key} value={key} >{value.alias}</option>
  ))
  const empty = () => (<option disabled={true} value='' key={-1}> -- </option>)
  givesOptions.unshift(empty())
  let receivesOptions = _.map(general.wallets, (value, key) => (
    <option key={key} value={key} >{value.alias}</option>
  ))
  receivesOptions.unshift(empty())
  let toPub = general.transactionToPublish
  let signEnabled = toPub.gives && toPub.receives && toPub.amount && toPub.secretKey
  let publishEnabled = signEnabled && toPub.signature
  return (
    <div>
      <div className="input-group">
        <div className="input-group-addon">da</div>
        <select
          name="da"
          id='toPublishGives'
          className="form-control"
          onChange={functions.generalChange}
          value={general.transactionToPublish.gives}
          data-key='transactionToPublish.gives'
        >
          {givesOptions}
        </select>
      </div>
      <div className="input-group">
        <div className="input-group-addon">recibe</div>
        <select
          name="recibe"
          id='toPublishReceives'
          className="form-control"
          onChange={functions.generalChange}
          value={general.transactionToPublish.receives}
          data-key='transactionToPublish.receives'
        >
          {receivesOptions}
        </select>
      </div>
      <InputNumber inputId='toPublishAmount' text='cuanto' value={general.transactionToPublish.amount} onChange={functions.generalChange} path='transactionToPublish.amount'/>
      <div className="input-group">
        <div className="input-group-addon">private Key</div>
        <input
          type='password'
          name='password'
          id = 'toPublishPass'
          className="form-control"
          value={general.transactionToPublish.secretKey}
          data-key={'transactionToPublish.secretKey'}
          onChange={functions.generalChange} />
      </div>
      <p className='longString'>Transaction Signature: {general.transactionToPublish.signature}</p>
      <p>to add in Block number: {general.chain.length}</p>
      <button
        disabled={!signEnabled }
        type="button"
        id='toPublishSign'
        className="btn
        btn-warning"
        onClick={functions.signTransaction}>Sign with private Key</button>
      <button
        disabled={!publishEnabled}
        type="button"
        id='toPublishPublish'
        className="btn btn-default"
        onClick={functions.publishTransaction}>Publish Transaction</button>
    </div>
  )
}

export default TransactionToPublish;
