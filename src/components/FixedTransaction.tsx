import * as React from 'react'
import * as _ from 'lodash'
import { GeneralType, Transaction } from '../Types'
import { prefferName } from 'src/utils/misc'
export interface Props {
  general: GeneralType
  transaction: Transaction
}

function FixedTransaction({ general, transaction }: Props) {
  return (
    <div>
      {prefferName(transaction.gives, general)} <span className="glyphicon glyphicon-arrow-right" aria-hidden="true" />
      {prefferName(transaction.receives, general)}  $: {transaction.amount}
      {transaction.signature && (
        <div className='longString'>signature: {transaction.signature}</div>
      )}
    </div>
  )
}

export default FixedTransaction;
