import * as React from 'react'
import { GeneralType, Functions } from '../Types'

export interface Props {
  general: GeneralType
  functions: Functions
}

function Wallets({ general, functions }: Props) {
  return (
    <div className="Wallets" data-tut="wallets">
      <h1>Wallets</h1>
      <div className="panel panel-default">
        <div className="panel-body">
          {
            Object.keys(general.wallets).map((dir, index) => (
              <div key={index} data-tut="wallet">
                <h3>{general.wallets[dir].alias}</h3>
                <div>
                  <b>Simplecoins:</b>
                    <span className='coins'>{functions.calculateOwnerCoinsFromChain(general.chain, dir)}</span>
                </div>
                <div><b>Public address:</b>
                  <div className='longString'>
                    {dir}
                  </div>
                </div>
                <div className='privateKey'><b>Private Key (shhhhhh!):</b>
                  <div className='longString'>
                    {general.wallets[dir].privateKey}
                  </div>
                </div>
              </div>
            ))
          }
      </div>
    </div>
    </div>
  )
}

export default Wallets;
