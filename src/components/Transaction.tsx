import * as React from 'react'
import { Transaccion } from '../Types'
import InputNumber from './InputNumber'
import Input from './Input'
export interface Props {
  transaction: Transaccion
  path: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function Transaction({ transaction, onChange, path }: Props) {
  return (
    <div>
      <Input text='da' value={transaction.da} onChange={onChange} path={`${path}.cuanto`} />
      <Input text='recibe' value={transaction.recibe} onChange={onChange} path={`${path}.recibe`}/>
      <InputNumber text='cuanto' value={transaction.cuanto} onChange={onChange} path={`${path}.cuanto`}/>
      <Input text='firma' value={transaction.firma ? transaction.firma : ''} onChange={onChange} path={`${path}.firma`}/>
    </div>
  )
}

export default Transaction;
