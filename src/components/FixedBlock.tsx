import * as React from 'react'
import { GeneralType, Functions, Block } from '../Types'
import { hashBlock } from '../utils/blockchain'
import FixedTransaction from './FixedTransaction'

export interface Props {
  general: GeneralType
  functions: Functions
  block: Block
  blockIndex?: number
}

function FixedBlock({ general, functions, block, blockIndex }: Props) {
  return (
    <table className="table fixedTable  inside chainTable">
      <tbody>
        <tr
          data-tut={
            blockIndex === general.chain.length - 2 ? 'second-last-hash' : ''
          }
        >
          <th scope="row">Hash</th>
          <td>
            <div className="longString">{hashBlock(block)}</div>
          </td>
        </tr>
        <tr
          data-tut={
            blockIndex === general.chain.length - 2 ? 'second-last-nonce' : ''
          }
        >
          <th scope="row">Nonce</th>
          <td>
            <div className="longString">{block.nonce}</div>
          </td>
        </tr>
        <tr>
          <th scope="row">Transactions</th>
          <td>
            <table className="table inside fixedTable">
              <tbody>
                {block.transactions
                  .map((transaction, tIndex) => {
                    return (
                      <tr key={tIndex}>
                        <td>
                          <FixedTransaction
                            general={general}
                            transaction={transaction}
                            blockIndex={blockIndex}
                            transactionIndex={tIndex}
                          />
                        </td>
                      </tr>
                    )
                  })
                  .reverse()}
              </tbody>
            </table>
          </td>
        </tr>
        <tr
          data-tut={
            blockIndex === general.chain.length - 1 ? 'last-previous-hash' : ''
          }
        >
          <th scope="row">previous block hash</th>
          <td>
            <div className="longString">{block.previousBlockHash}</div>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default FixedBlock
