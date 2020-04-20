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
        <div className="row">
          <div className="col-sm-5">
            <h2>Features</h2>
            <p><b>Blockchain:</b></p>
            <p> The data of every block is hashed, including the hash of the previous block. Every block is checked to have the correct previous block hash.</p>
            <p>Click <b>Hack the Chain</b> and try changing the previous block hash field</p>
            <p><b>Proof of work:</b></p>
            <p> To be considered valid, every block has to start with two zeros.</p>
            <p>Try changing the nonce.</p>
            <p><b>Transaction Validation: </b></p>
            <p>Every transaction has to be signed by the giver using his <b>private key</b>. The transaction data also includes the number of the block it is supposed to be included in, to prevent orphan transacions.
              Also a transaction is valid only if the <b>giver</b> has funds to make the transaction at that particular block.
            </p>
            <p>Try changing the amount of a transaction.</p>
            <p><b>Key Pair Generation and Digital Signatures:</b></p>
            <p>The key pair is generated using a basic implementation of the RSA algorithm <a target="_blank" href="https://github.com/denysdovhan/rsa-labwork"> taken from this repo.</a><div className="">
              Digital signature checking was also <a target="_blank" href="<https://github.com/Alpa84/cripticoTs/blob/mobile_tour/src/utils/blockchain.tsx#L86">artisanally implemented.</a></div></p>
            <h2>Missing Features</h2>
            <p><b>Auto-adjustment of the mining difficulty:</b></p>
            <p>The amount of zeros required for the block to be valid will always be two.</p>
            <p><b>Miner's Fee, or 'Toss a Coin to your Miner':</b></p>
            <p>The only incentive for the miner is the mined coin itself. The transaction creator cannot choose to pay the miner to include his transactions in the block.</p>
            <p><b>Connection With the Outside Word:</b></p>
            <p>For pedagogic reasons you will experience this cryptocoin system as if you were alone in the universe.
               It would be cool to connect browsers in a p2p manner using WebRTC messages to see transactions published by other users and receive extended chains. This may be implemented in the future.
            </p>
            <h2>Take a look at the code</h2>
            <p>The crypto-coin code is written to be as simple to understand as possible and it is <a target="_blank" href="https://github.com/Alpa84/cripticoTs/blob/mobile_tour/src/utils/blockchain.tsx#L18">only 220 lines of code</a>.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default General;