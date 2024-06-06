import * as React from 'react'
import { GeneralType, Transaction } from '../Types'
import { prefferName } from '../utils/misc'
import { RightArrowPath } from '../utils/svgPaths'
export interface Props {
  general: GeneralType
  transaction: Transaction
  blockIndex?: number
  transactionIndex?: number
}

function FixedTransaction({
  general,
  transaction,
  blockIndex,
  transactionIndex,
}: Props) {
  return (
    <div
      data-tut={
        blockIndex === 1 && transactionIndex === 0 ? 'second-mined' : ''
      }
    >
      {prefferName(transaction.gives, general)}
      {'  '}
      <svg
        version="1.1"
        className="arrow"
        x="0px"
        y="0px"
        width="18px"
        height="18px"
        viewBox="0 0 492.004 492.004"
      >
        <g>
          <g>
            <path d={RightArrowPath} />
          </g>
        </g>
      </svg>
      {'  '}
      {prefferName(transaction.receives, general)} $: {transaction.amount}
      {transaction.signature && (
        <div className="longString">signature: {transaction.signature}</div>
      )}
    </div>
  )
}

export default FixedTransaction
