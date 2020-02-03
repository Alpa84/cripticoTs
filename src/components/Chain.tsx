import * as React from 'react'
import { GeneralType, Functions} from '../Types'
import * as _ from 'lodash'
import Input from './Input'
import Transactions from './Transactions';
export interface Props {
  general: GeneralType
  functions: Functions
}


function Chain({ general, functions }: Props) {
  let chain = general.editableChain ? general.editableChain : general.chain
  return (
    <div className="Chain">
      <button
        type="button"
        onClick={functions.toggleEditableChain}
        id='toggleEditableChain'
        className="btn btn-large btn-block btn-default"
      >
        { general.editableChain ? ('Back to Unedited Chain'):('Edit Chain')}
      </button>
      {
        chain.map((block, index) => {
          let invalidBlockReason = functions.isInvalidBlock(block, index, chain)
          return (
            <div key={index} className={`panel panel-${invalidBlockReason ? 'danger': 'primary'}`}>
              <div className="panel-heading">Block {index + 1}</div>
              <div className="panel-body">
                {invalidBlockReason && (
                  <div className="alert alert-danger">
                    <strong>Invalid Block</strong> {
                      _.map(invalidBlockReason, (value, key) => (
                        <span key={key}>{value}</span>
                      ))
                    }
                  </div>

                )}
                { general.editableChain && (
                  <button
                    type="button"
                    onClick={() => { functions.removeBlock(index) }}
                    className="btn btn-large btn-block btn-warning">Remove Block</button>
                )}
                <p>hash: <span className='blockHash'>{functions.hashBlock(block)}</span></p>
                {general.editableChain ? (
                  <div>
                    <Input text='previous block hash' onChange={functions.generalChange} value={block.previousBlockHash} path={`editableChain[${index}].previousBlockHash`} />
                    <Input text='nonce' value={block.nonce} onChange={functions.generalChange} path={`editableChain[${index}].nonce`} />
                    <button type="button" className="btn btn-info" onClick={() => functions.findNonce(block)}>Search Nonce</button>
                  </div>
                ) : (
                    <div>
                      <p>nonce: {block.nonce}</p>
                    </div>
                  )}
                <h3>transactions</h3>
                <Transactions general={general} blockIndex={index} functions={functions} />
                <p>previous block hash: {block.previousBlockHash}</p>
              </div>
            </div>
          )
        }).reverse()
      }
    </div>
  )
}

export default Chain;
