import * as React from 'react'
import * as _ from 'lodash'
import { GeneralType, Functions } from '../Types'
import Chain from './Chain';
import PendingTransactions from './PendingTransactions'
import TransactionToPublish from './TransactionToPublish'
import KeyPair from './KeyPair'
import Directory from './Wallets'
import MinedBlock from './MinedBlock'

export interface Props {
  general: GeneralType
  functions: Functions
}

function General({ general, functions }: Props) {
  let givesOptions = _.map(general.wallets, (key, value) => (
    <option key={value} value={value} >{key.alias}</option>
  ))
  return (
    <div className="General">
      <div className="container">
        <div className="row">
          <div className="col-sm-8">
            <KeyPair general={general} functions={functions}/>
            <h2>Transfer a simpl</h2>
            <TransactionToPublish general={general} functions={functions} />
            <h2>Published Transactions not yet included in the Blockchain</h2>
            <PendingTransactions general={general} />
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
            <div className="input-group">
              <div className="input-group-addon">address to add simplecoin</div>
              <input
                type="text"
                className="form-control"
                id="dirToAdMinedBitcoin"
                value={general.dirToAddMined}
                data-key='dirToAddMined'
                onChange={functions.generalChange} />
            </div>
            <button
              type="button"
              id="startMining"
              className="btn btn-info"
              onClick={functions.mine}>Include Published Transactions in Blockchain</button>
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