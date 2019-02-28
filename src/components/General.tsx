import * as React from 'react'
import * as _ from 'lodash'
import { GeneralType, Functions } from '../Types'
import Chain from './Chain';
import PendingTransactions from './PendingTransactions'
import TransactionToPublish from './TransactionToPublish'
import KeyPair from './KeyPair'
import Directory from './Directory'
import Balance from './Balance';
import MinedBlock from './MinedBlock'

export interface Props {
  general: GeneralType
  functions: Functions
}

function General({ general, functions }: Props) {
  let daOptions = _.map(general.directorio, (key, value) => (
    <option key={value} value={value} >{key}</option>
  ))
  return (
    <div className="General">
      <div className="container">
        <div className="row">
          <div className="col-sm-8">
            <KeyPair keyPair={general.keyPair} functions={functions}/>
            <h2>Transferir un simpl</h2>
            <TransactionToPublish general={general} functions={functions} />
            <h2>Transacciones Publicadas no incluidas en la cadena</h2>
            <PendingTransactions general={general} />
            <select
              name="minedDir"
              id="minedDir"
              className="form-control"
              onChange={functions.generalChange}
              value={general.dirToAddMined}
              data-key='dirToAddMined'
            >
              {daOptions}
            </select>
            <div className="input-group">
              <div className="input-group-addon">direccion a sumar un simplecoin</div>
              <input
                type="text"
                className="form-control"
                name='username'
                id="dirToAdMinedBitcoin"
                value={general.dirToAddMined}
                data-key='keyPair.direccion'
                onChange={functions.generalChange} />
            </div>
            <button
              type="button"
              className="btn btn-info"
              onClick={functions.minear}>Incluir Transacciones en la Cadena</button>
            <br />
            <h2>Cadena</h2>
            <MinedBlock general={general} functions={functions} />
            <Chain general={general} functions={functions}/>
          </div>
          <div className="col-sm-2">
            <Directory general={general}/>
            <Balance general={general}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default General;