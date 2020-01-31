import * as React from 'react'
import * as _ from 'lodash'
import { GeneralType, Functions } from '../Types'
import Chain from './Chain';
import PendingTransactions from './PendingTransactions'
import TransactionToPublish, { Empty } from './TransactionToPublish'
import KeyPair from './KeyPair'
import Directory from './Wallets'
import MinedBlock from './MinedBlock'
import Explanation from './Explanation';

export interface Props {
  general: GeneralType
  functions: Functions
}


function General({ general, functions }: Props) {
  let givesOptions = _.map(general.wallets, (value, key) => (
    <option key={key} value={key} >{value.alias}</option>
  ))
  givesOptions.unshift(Empty())
  return (
    <div className="General">
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <Explanation/>
          </div>
          <div className="col-sm-7">
            <KeyPair general={general} functions={functions}/>
            <h2>Transfer a simpl</h2>
            <TransactionToPublish general={general} functions={functions} />
            <h2>Published Transactions not yet included in the Blockchain</h2>
            <PendingTransactions general={general} />
            <h2>Mining</h2>
            <div className="input-group">
              <div className="input-group-addon">Owner of the new coin</div>
              <select
                name="minedDir"
                id="selectDirToAddMined"
                className="form-control"
                onChange={functions.generalChange}
                value={general.dirToAddMined}
                data-key='dirToAddMined'
              >
                {givesOptions}
              </select>
            </div>
            <button
              type="button"
              id="startMining"
              className="btn btn-info"
              onClick={functions.mine}>Find a nonce that makes the block hash start with 00 and publish block</button>
            <br />
            <h2>Blockchain</h2>
            <MinedBlock general={general} functions={functions} />
            <Chain general={general} functions={functions}/>
          </div>
          <div className="col-sm-2">
            <Directory general={general} functions={functions}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default General;