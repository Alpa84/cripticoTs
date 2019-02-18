import * as React from 'react'
import { GeneralType} from '../Types'
import Input from './Input'
import Transactions from './Transacions';
export interface Props {
  general: GeneralType
  generalChange: (event: React.ChangeEvent<HTMLInputElement > ) => void
}

function Chain({ general, generalChange }: Props) {
  let editable = false
  return (
    <div className="Chain">
      {
        general.cadena.map((bloque, index) => (
          <div key={index} className='panel panel-primary'>
            <div className="panel-heading">{index}</div>
            <div className="panel-body">
              { editable ? (
                <div>
                  <Input text='hash bloque anterior' onChange={generalChange} value={bloque.hashBloqueAnterior} path={`cadena[${index}].hashBloqueAnterior`} />
                  <Input text='clave' value={bloque.clave} onChange={generalChange} path={`cadena[${index}].clave`} />
                </div>
              ) : (
                <div>
                    <p>hash bloque anterior: {bloque.hashBloqueAnterior}</p>
                    <p>clave: {bloque.clave}</p>
                </div>
              )}
              <h3>transacciones</h3>
              <Transactions general={general} blockIndex={index} generalChange={generalChange} editable={editable}/>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Chain;
