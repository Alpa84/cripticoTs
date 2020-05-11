import * as React from 'react'
import { GeneralType, Functions } from '../Types'
import { calculateOwnerCoinsFromChain } from 'src/utils/blockchain';
import { CreatorPublicAddress } from 'src/utils/defaultChain';
import TourWrapper from './TourWrapper';
import PrivateKey from './PrivateKey'

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
                <div className='card'>
                  <div className='card-body'>
                    <h3 className='card-title'>{general.wallets[dir].alias}</h3>
                    <table className="table fixedTable">
                      <tbody>
                        <tr>
                          <th scope="row">$</th>
                          <td>
                            {calculateOwnerCoinsFromChain(general.chain, dir)}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Public address</th>
                          <td><div className='longString'>{dir}</div></td>
                        </tr>
                      </tbody>
                    </table>
                    <TourWrapper
                      general={general}
                      functions={functions}
                      tutName={dir === CreatorPublicAddress ? 'creatorPrivateKey' : ''}
                    >
                      <PrivateKey  pKey={general.wallets[dir].privateKey}/>
                    </TourWrapper>
                  </div>
                </div>
              </TourWrapper>
            )).reverse()
          }
        </div>
      </div>
    </TourWrapper>
  )
}

export default Wallets;
