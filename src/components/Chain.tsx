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
        general.cadena.map((bloque, index) => (
          <div key={index} className='panel panel-primary'>
            <div className="panel-heading">{index}</div>
            <div className="panel-body">
              <p>hash: {functions.hashearBloque(bloque)}</p>
              { editable ? (
                <div>
                  <Input text='hash bloque anterior' onChange={functions.generalChange} value={bloque.previousBlockHash} path={`cadena[${index}].hashBloqueAnterior`} />
                  <Input text='clave' value={bloque.hash} onChange={functions.generalChange} path={`cadena[${index}].clave`} />
                </div>
              ) : (
                <div>
                    <p>clave: {bloque.hash}</p>
                </div>
              )}
              <h3>transacciones</h3>
              <Transactions general={general} blockIndex={index} generalChange={functions.generalChange} editable={editable}/>
              <p>hash bloque anterior: {bloque.previousBlockHash}</p>
            </div>
          </div>
        )).reverse()
      }
    </div>
  )
}

export default Chain;
