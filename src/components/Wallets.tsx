import * as React from 'react'
import { GeneralType, Functions } from '../Types'
import { calculateOwnerCoinsFromChain } from 'src/utils/blockchain';
import { CreatorPublicAddress } from 'src/utils/defaultChain';
import TourWrapper from './TourWrapper';

export interface Props {
  general: GeneralType
  functions: Functions
}

function Wallets({ general, functions }: Props) {
  return (
    <TourWrapper general={general} functions={functions} tutName={"wallets"}>
      <h2>Wallets</h2>
      <div className="panel panel-default">
        <div className="panel-body">
          {
            Object.keys(general.wallets).map((dir, index) => (
              <TourWrapper
                general={general}
                functions={functions}
                key={'walletsTut' + index}
                tutName={index + 1 === Object.keys(general.wallets).length? 'userWallet': ''}
                >
                <h3>{general.wallets[dir].alias}</h3>
                <div>
                  <b>$: </b>
                    <span className='coins'>{calculateOwnerCoinsFromChain(general.chain, dir)}</span>
                </div>
                <div><b>Public address:</b>
                  <div className='longString'>
                    {dir}
                  </div>
                </div>
                <TourWrapper
                  general={general}
                  functions={functions}
                  tutName={dir === CreatorPublicAddress ? 'creatorPrivateKey' : ''}
                  >
                  <div className='privateKey'><b>Private Key (shhhhhh!):</b>
                    <div className='longString'> {general.wallets[dir].privateKey} </div>
                  </div>
                </TourWrapper>
              </TourWrapper>
            )).reverse()
          }
        </div>
      </div>
    </TourWrapper>
  )
}

export default Wallets;
