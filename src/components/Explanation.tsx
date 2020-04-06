import * as React from 'react'
import { GeneralType, Functions } from 'src/Types'

export interface Props {
  general: GeneralType
  functions: Functions
}
function Explanation({general, functions}: Props) {
  return (
    <div className="Explanation">
      <br/>
      <p>Do you want to hack the chain?</p>
      <p>Nothing stops you from editing the chain and sending it to everybody s  </p>
    </div>
  )
}

export default Explanation;
