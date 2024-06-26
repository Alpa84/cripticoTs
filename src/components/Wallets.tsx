import * as React from 'react'
import { GeneralType, Functions } from '../Types'
import { calculateOwnerCoinsFromChain } from '../utils/blockchain'
import { CreatorPublicAddress } from '../utils/defaultChain'
import PrivateKey from './PrivateKey'

export interface Props {
  general: GeneralType
  functions: Functions
}

function Wallets({ general, functions }: Props) {
  return (
    <div data-tut="wallets">
      <h2>Wallets</h2>
      <div className="panel panel-default">
        <div className="panel-body">
          {Object.keys(general.wallets)
            .map((dir, index) => (
              <div
                key={'walletsTut' + index}
                data-tut={
                  index + 1 === Object.keys(general.wallets).length
                    ? 'userWallet'
                    : ''
                }
              >
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">{general.wallets[dir].alias}</h3>
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
                          <td>
                            <div className="longString">{dir}</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div
                      data-tut={
                        dir === CreatorPublicAddress
                          ? 'creatorPrivateKey'
                          : 'otherPrivateKey'
                      }
                    >
                      <PrivateKey
                        pKey={general.wallets[dir].privateKey}
                        functions={functions}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
            .reverse()}
        </div>
      </div>
    </div>
  )
}

export default Wallets
