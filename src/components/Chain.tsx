import * as React from 'react'
import { GeneralType, Functions} from '../Types'
import * as _ from 'lodash'
import Input from './Input'
import Transactions from './Transacions';
export interface Props {
  general: GeneralType
  functions: Functions
}


function Chain({ general, functions }: Props) {
  return (
    <div className="Chain">
      <button
        type="button"
        onClick={functions.toggleEditableChain}
        id='toggleEditableChain'
        className="btn btn-large btn-block btn-default"
      >
        { general.showEditableChain ? ('Back to Unedited Chain'):('Edit Chain')}
      </button>
      {
        general.chain.map((block, index) => {
          let invalidBlockReason = functions.isInvalidBlock(block, index, general.chain)
          return (
            <div key={index} className={`panel panel-${invalidBlockReason ? 'danger': 'primary'}`}>
              <div className="panel-heading">{index}</div>
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
                <p>hash: <span className='blockHash'>{functions.hashBlock(block)}</span></p>
                {general.showEditableChain ? (
                  <div>
                    <Input text='previous block hash' onChange={functions.generalChange} value={block.previousBlockHash} path={`chain[${index}].previousBlockHash`} />
                    <Input text='nonce' value={block.nonce} onChange={functions.generalChange} path={`chain[${index}].nonce`} />
                  </div>
                ) : (
                    <div>
                      <p>nonce: {block.nonce}</p>
                    </div>
                  )}
                <h3>transactions</h3>
                <Transactions general={general} blockIndex={index} generalChange={functions.generalChange} editable={general.showEditableChain} />
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
