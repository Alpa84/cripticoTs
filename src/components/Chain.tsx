import * as React from 'react'
import { GeneralType, Functions} from '../Types'
import * as _ from 'lodash'
import Input from './Input'
import Transactions from './Transactions';
import { isInvalidBlock, hashBlock } from 'src/utils/blockchain';
import TourWrapper from './TourWrapper';
export interface Props {
  general: GeneralType
  functions: Functions
}


function Chain({ general, functions }: Props) {
  let chain = general.editableChain ? general.editableChain : general.chain
  let onHackChain: () => void
  if (general.editableChain) {
    onHackChain = () => {
      functions.setStep(28)
      functions.dispatch({ type: 'toggleEditableChain' })
    }
  } else {
    onHackChain = () => {
      functions.setStep(22)
      functions.dispatch({ type: 'toggleEditableChain' })
    }
  }
  const doubleClick = () => {
    if (!general.editableChain) {
      functions.dispatch({ type: 'toggleEditableChain' })
    }
  }

  return (
    <div className="Chain">
      <TourWrapper general={general} functions={functions} tutName='toggleHackTheChain'>
        <button
          type="button"
          onClick={onHackChain}
          id='toggleEditableChain'
          className="btn btn-large btn-block btn-default"
        >
          { general.editableChain ? ('Back to Unedited Chain'):('Hack the Chain')}
        </button>
      </TourWrapper>
      { general.editableChain && (
        <button
          type="button"
          onClick={()=> functions.dispatch({type: 'addBlock'})}
          className="btn btn-large btn-block btn-default">Add Block</button>
      )}
      <div onDoubleClick={doubleClick}>
        {
          chain.map((block, index) => {
            let invalidBlockReason = isInvalidBlock(block, index, chain)
            return (
              <TourWrapper
                general={general}
                functions={functions}
                key={index}
                tutName={index=== 0 ? "block": ''}>
                <div
                  key={index}
                  className={`panel panel-${invalidBlockReason ? 'danger' : 'primary'}`}
                  >
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
              </TourWrapper>
            )
          }).reverse()
        }
      </div>
    </div>
  )
}

export default Chain;
