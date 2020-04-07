import * as React from 'react'
import * as _ from 'lodash'
import { useReducer } from 'react'
import { DefaultChain, DefaultWallets } from '../utils/defaultChain'
import { GeneralType, Functions, Block } from '../Types'
import { hashBlockWithoutNonce, startsWithZeros, validateTransactions, addDelay } from '../utils/blockchain'
import General from './General'
import { reducer } from 'src/utils/reducer'

let emptyTransactionToPublish = { gives: '', receives: '', amount: 0, signature: '', secretKey: '' }
let emptyKeyPair = { address: '', privateKey: '' }
const defaultGeneral: GeneralType = {
  alias: '',
  chain: DefaultChain,
  dirToAddMined: '',
  keyPair: _.cloneDeep(emptyKeyPair),
  pendingTransactions: [],
  transactionToPublish: _.cloneDeep(emptyTransactionToPublish),
  wallets: DefaultWallets,
}

function CoinArena() {

  const [general, dispatch] = useReducer(reducer, defaultGeneral)

  const tryDifferentNonces = async (block: Block, blockIndex: number) => {
    let nonce = 0
    while (true) {
      if (blockIndex === -1) { // means we are changing the mined block
        dispatch({ type: 'changeMinedBlockNonce', nonce: nonce.toString() })
      } else {
        dispatch({type: 'changeBlockNonce', blockIndex, nonce:nonce.toString() })
      }
      let result = hashBlockWithoutNonce(block, nonce)
      let doesStart = startsWithZeros(result)
      if (doesStart) {
        return nonce
      } else {
        nonce = nonce + 1
      }
      await addDelay(4)
    }
  }
  const findNonce = async (block: Block, blockIndex: number) => {
    tryDifferentNonces(block, blockIndex)
  }
  const mine = async () => {
    let blockWithoutNonce = validateTransactions(general.pendingTransactions, general.chain, general.dirToAddMined)
    dispatch({type:'changeMinedBlock', block: blockWithoutNonce})
    general.minedBlock = blockWithoutNonce
    let nonce = await tryDifferentNonces(blockWithoutNonce, -1) //// -1 means we are changing the mined block
    dispatch({ type: 'changeMinedBlockNonce', nonce: nonce.toString() })
    dispatch({ type: 'addMinedBlockToChain' })
  }

  const functions: Functions = {
    dispatch,
    findNonce,
    mine,
  }
  return  (
    <General general={general} functions={functions}/>
  )
}

export default CoinArena
