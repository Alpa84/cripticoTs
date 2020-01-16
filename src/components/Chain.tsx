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
  let editable = false
  return (
    <div className="Chain">
      {
        general.chain.map((block, index) => (
          <div key={index} className='panel panel-primary'>
            <div className="panel-heading">{index}</div>
            <div className="panel-body">
              <p>hash: {functions.hashBlock(block)}</p>
              { editable ? (
                <div>
                  <Input text='previous block hash' onChange={functions.generalChange} value={block.previousBlockHash} path={`chain[${index}].previousBlockHash`} />
                  <Input text='nonce' value={block.nonce} onChange={functions.generalChange} path={`chain[${index}].privateKey`} />
                </div>
              ) : (
                <div>
                    <p>nonce: {block.nonce}</p>
                </div>
              )}
              <h3>transactions</h3>
              <Transactions general={general} blockIndex={index} generalChange={functions.generalChange} editable={editable}/>
              <p>previous block hash: {block.previousBlockHash}</p>
            </div>
          </div>
        )).reverse()
      }
    </div>
  )
}

export default Chain;
