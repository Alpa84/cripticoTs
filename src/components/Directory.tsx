import * as React from 'react'
import { GeneralType, Functions } from '../Types'

export interface Props {
  general: GeneralType
  functions: Functions
}

function Directory({ general, functions }: Props) {
  return (
    <div className="Directory">
      <h1>Billeteras</h1>
      <div className="panel panel-default">
        <div className="panel-body">
          {
            Object.keys(general.directorio).map((dir, index) => (
              <div key={index}>
                <h3>{general.directorio[dir].alias}</h3>
                <div>
                  <b>Simplecoins:</b>
                    {functions.calculateOwnerCoinsFromChain(general.cadena, dir)}
                </div>
                <div><b>Public address:</b>
                  <div className='longString'>
                    {dir}
                  </div>
                </div>
                <div><b>Private Key (shhhhhh!):</b>
                  <div className='longString'>
                    {general.directorio[dir].privateKey}
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

export default Directory;
