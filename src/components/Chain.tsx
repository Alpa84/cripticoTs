import * as React from 'react'
import { Block} from '../Types'
import Input from './Input'
import Transactions from './Transacions';
export interface Props {
    chain: Block[]
    generalChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function Chain({ chain, generalChange }: Props) {

    return (
        <div className="Chain">
            {
                chain.map((bloque, index) => (
                    <div key={index} className='panel panel-primary'>
                        <div className="panel-heading">{index}</div>
                        <div className="panel-body">
                            <Input text='hash bloque anterior' onChange={generalChange} value={bloque.hashBloqueAnterior} path={`cadena[${index}].hashBloqueAnterior`} />
                            <Input text='clave' value={bloque.clave} onChange={generalChange} path={`cadena[${index}].clave`} />
                            <h3>transacciones</h3>
                            <Transactions transactions={bloque.transacciones} blockIndex={index} generalChange={generalChange}/>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Chain;

// // helpers

// function getExclamationMarks(numChars: number) {
//     return Array(numChars + 1).join('!');
// }