import * as React from 'react'
import { GeneralType, Functions} from '../Types'
import * as _ from 'lodash'
import Input from './Input'
import Transactions from './Transactions';
import { isInvalidBlock, hashBlock } from 'src/utils/blockchain';
import TourWrapper from './TourWrapper';
import FixedInput from './FixedInput';
import FixedTransaction from './FixedTransaction';
export interface Props {
  general: GeneralType
  functions: Functions
}


function Chain({ general, functions }: Props) {
  let chain = general.editableChain ? general.editableChain : general.chain
  let onHackChain: () => void
  if (general.editableChain) {
    onHackChain = () => {
      functions.setStep(27)
      functions.dispatch({ type: 'toggleEditableChain' })
    }
  } else {
    onHackChain = () => {
      functions.setStep(22)
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
          className="btn btn-secondary"
        >
          { general.editableChain ? ('Back to Unedited Chain'):('Hack the Chain')}
        </button>
      </TourWrapper>
      { general.editableChain && (
        <button
          type="button"
          onClick={()=> functions.dispatch({type: 'addBlock'})}
          className="btn btn-secondary">Add Block</button>
      )}
      <div onDoubleClick={()=> functions.dispatch({ type: 'toggleEditableChain' })}>
        {
          chain.map((block, index) => {
            let invalidBlockReason = isInvalidBlock(block, index, chain)
            return (
              <TourWrapper
                general={general}
                functions={functions}
                key={index}
                componentClass="blockTutorial"
                tutName={index=== 0 ? "block": ''}>
                <div
                  key={index}
                  className={`card border-primary ${invalidBlockReason ? 'bg-danger' : ''}`}
                  >
                  <div className="card-header"><h4>Block {index + 1}</h4></div>
                  <div className="card-body">
                    {invalidBlockReason && (
                      <div className="alert alert-danger">
                        <strong>Invalid Block</strong> {
                          _.map(invalidBlockReason, (value, key) => (
                            <span key={key}>{value}</span>
                          ))
                        }
                      </div>

                    )}
                    { general.editableChain ? (
                      <>
                        <button
                          type="button"
                          onClick={() => { functions.dispatch( {type:'removeBlock', index })}}
                          className="btn btn-warning">Remove Block</button>
                        <FixedInput text="hash" value={hashBlock(block)}/>
                        <Input text='nonce' value={general.editableChain[index].nonce} onChange={
                          (event) => functions.dispatch({
                            type: 'changeChainNonce',
                            nonce: event.target.value,
                            blockIndex: index,
                          })
                        } />
                        <button type="button" className="btn btn-secondary" onClick={() => functions.findNonce(block, index)}>Search Nonce</button>
                        <div className='card'>
                          <div className="card-header">Transactions</div>
                          <Transactions general={general} blockIndex={index} functions={functions} />
                        </div>
                        <Input text='previous block hash' value={general.editableChain[index].previousBlockHash} onChange={
                          (event) => functions.dispatch({
                            type: 'changeChainPrevHash',
                            hash: event.target.value,
                            blockIndex: index,
                          })
                        } />
                      </>
                    ) : (
                      <table className="table fixedTable chainTable">
                        <tbody>
                          <tr>
                            <th scope="row">Hash</th>
                            <td><div className='longString'>{hashBlock(block)}</div></td>
                          </tr>
                          <tr>
                            <th scope="row">Nonce</th>
                            <td><div className='longString'>{block.nonce}</div></td>
                          </tr>
                          <tr>
                            <th scope="row">Transactions</th>
                            <td>
                              <table className="table inside fixedTable">
                                <tbody>
                                  { block.transactions.map( (transaction, tIndex) => { return (
                                    <tr key={tIndex} >
                                      <td>
                                        <FixedTransaction
                                          general={general}
                                          transaction={transaction}/>
                                      </td>
                                    </tr>
                                  )}).reverse() }
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">previous block hash</th>
                            <td><div className='longString'>{block.previousBlockHash}</div></td>
                          </tr>
                        </tbody>
                      </table>
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
