import * as React from 'react'
import { GeneralType, Functions } from '../Types'
export interface Props {
  general: GeneralType
  functions: Functions,
}

function MinedBlock({ general, functions }: Props) {
  if (!general.minedBlock) {
    return (<span/>)
  }
  let blockIndex =  general.chain.length
  return (
    <div className="MinedBlock">
      <div className='panel panel-primary'>
        <div className="panel-heading">Trying to add block {blockIndex}</div>
        <div className="panel-body">
          <div>
            <p>previous block hash: {general.minedBlock.previousBlockHash}</p>
            <p>nonce: {general.minedBlock.nonce}</p>
          </div>
          <h3>transactions</h3>
          {
            general.minedBlock.transactions.map((transaccion, index) => (
              <div key={index}>
                <p>gives: {transaccion.gives}</p>
                <p>receives: {transaccion.receives}</p>
                <p>amount: {transaccion.amount}</p>
                <p>signature: {transaccion.signature}</p>
              </div>
            ))
          }
          <p>hash: {functions.hashBlock(general.minedBlock)}</p>
        </div>
      </div>
    </div>
  )
}

export default MinedBlock;
