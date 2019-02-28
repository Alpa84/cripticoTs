import * as React from 'react'
import { GeneralType } from '../Types'

export interface Props {
  general: GeneralType
}

function Directory({ general }: Props) {
  return (
    <div className="Directory">
      <h1>Directorio</h1>
      <div className="panel panel-default">
        <div className="panel-body">
          {
            Object.keys(general.directorio).map((dir, index) => (
              <div key={index}>
                {general.directorio[dir]} : {dir}
              </div>
            ))
          }
      </div>
    </div>
    </div>
  )
}

export default Directory;
