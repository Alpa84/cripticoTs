import * as React from 'react'
import { GeneralType, Functions} from '../Types'
import * as _ from 'lodash'
import Input from './Input'
import Transactions from './Transactions';
import { checkValidBlock, hashBlock } from 'src/utils/blockchain';
import TourWrapper from './TourWrapper';
import FixedInput from './FixedInput';
import FixedBlock from './FixedBlock';
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
  const toggleIfNonEditable = () => {
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
          className="btn btn-secondary"
        >
          { general.editableChain ? ('Back to Unedited Chain'):('Hack the Chain')}
        </button>
        {!general.editableChain && (
          <p>Alter the data to experience the blockchain security features.</p>
        )}
      </TourWrapper>
      { general.editableChain && (
        <button
          type="button"
          onClick={()=> functions.dispatch({type: 'addBlock'})}
          className="btn btn-secondary">Add Block</button>
      )}
      <div onDoubleClick={ toggleIfNonEditable}>
        {
          chain.map((block, index) => {
            let blockValidation = checkValidBlock(block, index, chain)
            return (
              <TourWrapper
                general={general}
                functions={functions}
                key={index}
                componentClass="blockTutorial"
                tutName={index=== 0 ? "block": ''}>
                <div
                  key={index}
                  className={`card border-primary ${(general.editableChain && !blockValidation.isValid) ? 'invalidBlock' : ''}`}
                  >
                  <div className="card-header"><h4>Block {index + 1}</h4></div>
                  <div className={`card-body ${general.editableChain ? '' :'slim'}`}>
                    { general.editableChain ? (
                      <>
                        {/* the following is working but was hidden for pedagogic reasons */}
                        <button
                          type="button"
                          onClick={() => { functions.dispatch( {type:'removeBlock', index })}}
                          className="btn btn-warning remove">Remove Block</button>
                        <FixedInput text="hash" value={hashBlock(block)}/>
                        {blockValidation.hash && (
                          <div className="alert alert-danger">
                            <strong>Invalid Block </strong>
                            <span >{blockValidation.hash}</span>
                          </div>
                        )}
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
                          <Transactions
                            general={general}
                            blockIndex={index}
                            functions={functions}
                            validations={blockValidation.transactions} />
                        </div>
                        <Input text='previous block hash' value={general.editableChain[index].previousBlockHash} onChange={
                          (event) => functions.dispatch({
                            type: 'changeChainPrevHash',
                            hash: event.target.value,
                            blockIndex: index,
                          })
                        } />
                        {blockValidation && blockValidation.previousBlockHash && (
                          <div className="alert alert-danger">
                            <strong>Invalid Block </strong>
                            <span >{blockValidation.previousBlockHash}</span>
                          </div>
                        )}
                      </>
                    ) : (
                      <FixedBlock general={general} functions={functions} block={block} />
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
