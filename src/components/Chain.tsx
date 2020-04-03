import * as React from 'react'
import { GeneralType, Functions} from '../Types'
import * as _ from 'lodash'
import Input from './Input'
import Transactions from './Transactions';
import { isInvalidBlock, hashBlock } from 'src/utils/blockchain';
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
        onClick={()=>functions.dispatch({type:'toggleEditableChain'})}
        id='toggleEditableChain'
        className="btn btn-large btn-block btn-default"
        data-tut="toggleHackTheChain"
      >
        { general.editableChain ? ('Back to Unedited Chain'):('Hack the Chain')}
      </button>
      { general.editableChain && (
        <button
          type="button"
          onClick={()=> functions.dispatch({type: 'addBlock'})}
          className="btn btn-large btn-block btn-default">Add Block</button>
      )}

      {
        chain.map((block, index) => {
          let invalidBlockReason = isInvalidBlock(block, index, chain)
          return (
            <div
              key={index}
              className={`panel panel-${invalidBlockReason ? 'danger' : 'primary'}`}
              data-tut='block'>
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
                    onClick={() => { functions.dispatch( {type:'removeBlock', index })}}
                    className="btn btn-large btn-block btn-warning">Remove Block</button>
                )}
                <p>hash: <span className='blockHash'>{hashBlock(block)}</span></p>
                {general.editableChain ? (
                  <div>
                    <Input text='nonce' value={general.editableChain[index].nonce} onChange={
                      (event) => functions.dispatch({
                        type: 'changeChainNonce',
                        nonce: event.target.value,
                        blockIndex: index,
                      })
                    } />
                    <button type="button" className="btn btn-info" onClick={() => functions.findNonce(block, index)}>Search Nonce</button>
                  </div>
                ) : (
                    <div>
                      <p>nonce: {block.nonce}</p>
                    </div>
                  )}
                <h3>transactions</h3>
                <Transactions general={general} blockIndex={index} functions={functions} />
                {general.editableChain ? (
                  <div>
                    <Input text='previous block hash' value={general.editableChain[index].previousBlockHash} onChange={
                      (event) => functions.dispatch({
                        type: 'changeChainPrevHash',
                        hash: event.target.value,
                        blockIndex: index,
                      })
                    } />
                  </div>
                ) : (
                  <div>
                    <p>previous block hash: {block.previousBlockHash}</p>
                  </div>
                )}
              </div>
            </div>
          )
        }).reverse()
      }
    </div>
  )
}

export default Chain;
