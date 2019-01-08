import * as React from 'react'
import { GeneralType, Functions } from '../Types'
import Chain from './Chain';
import PendingTransactions from './PendingTransactions'
import TransactionToPublish from './TransactionToPublish'
import KeyPair from './KeyPair'

export interface Props {
  general: GeneralType
  functions: Functions
}

function General({ general, functions }: Props) {

  return (
    <div className="General">
      <div className="container">
        <div className="row">
          <div className="col-sm-8">
            <KeyPair keyPair={general.keyPair} functions={functions}/>
            <TransactionToPublish general={general} functions={functions} />
            <PendingTransactions transactions={general.transaccionesPendientes} />
            <br />
            <Chain chain={general.cadena} generalChange={functions.generalChange}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default General;