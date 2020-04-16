import * as React from 'react'
import * as _ from 'lodash'
import { GeneralType, Functions } from '../Types'
import Chain from './Chain';
import PendingTransactions from './PendingTransactions'
import TransactionToPublish, { Empty } from './TransactionToPublish'
import KeyPair from './KeyPair'
import Directory from './Wallets'
import MinedBlock from './MinedBlock'
import TourWrapper from './TourWrapper';

export interface Props {
  isSmallScreen: boolean
  general: GeneralType
  functions: Functions
}


function General({ general, functions, isSmallScreen }: Props) {

  let givesOptions = _.map(general.wallets, (value, key) => (
    <option key={key} value={key} >{value.alias}</option>
  ))
  givesOptions.unshift(Empty())
  return (
    <div className="General">
      <div className="container">
        <div className="row">
          <TourWrapper general={general} functions={functions} tutName='header'>
            <h1>Toy Coin</h1>
            <h3>
              Your own crypto coin to play with (with every major feature a crypto coin should have)
            </h3>
          </TourWrapper>
          <button type="button" className="btn btn-default"
            onClick={functions.joinTour}
          >
            {isSmallScreen && general.mobileStep !== 0 ?  (
              'Resume the Tour'
            ) : (
                'Join the Tour'
            )}
          </button>
        </div>
        <div className="row">
          <div className="col-sm-5">
            <KeyPair general={general} functions={functions}/>
            <h2>Transfer Generator</h2>
            <TransactionToPublish general={general} functions={functions} />
            <TourWrapper general={general} functions={functions} tutName='notPublishedYet'>
              { general.pendingTransactions.length >0  && (
                <div>
                  <h2>Published Transactions not yet included in the Blockchain</h2>
                  <PendingTransactions general={general} />
                </div>
              )}
              <TourWrapper general={general} functions={functions} tutName='mining'>
                <h2>Mining Zone</h2>
                <div className="input-group">
                  <div className="input-group-addon">Miner</div>
                  <select
                    name="minedDir"
                    id="selectDirToAddMined"
                    className="form-control"
                    onChange={(event) => functions.dispatch({ type: 'changeDirToAddMined', dir: event.target.value })}
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
                  onClick={functions.mine}>Start Mining</button>
              </TourWrapper>


              <br />
              <TourWrapper general={general} functions={functions} tutName={"blockchain"}>
                <h2>Blockchain</h2>
                <MinedBlock general={general} functions={functions} />
                <Chain general={general} functions={functions} />
              </TourWrapper>
            </TourWrapper>
          </div>
          <div className="col-sm-4">
            <Directory general={general} functions={functions}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default General;