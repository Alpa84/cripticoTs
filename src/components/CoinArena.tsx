
import * as React from 'react'
import * as _ from 'lodash'
import { useReducer } from 'react'
import { DefaultChain, DefaultWallets } from '../utils/defaultChain'
import { GeneralType, Functions, Block } from '../Types'
import {
  hashBlockWithoutNonce,
  startsWithZeros,
  validateTransactions,
} from '../utils/blockchain'
import General from './General'
import { reducer } from '../utils/reducer'
import { addDelay } from '../utils/misc'
import { generateKeyPair } from '../utils/rsa'

const DefaultNotificationDuration = 4000

export let emptyTransactionToPublish = {
  gives: '',
  receives: '',
  amount: null,
  signature: '',
  secretKey: '',
}
let emptyKeyPair = { address: '', privateKey: '' }
export const defaultGeneral: GeneralType = {
  notifications: { walletGenerated: false, transactionPublished: false },
  alias: '',
  chain: DefaultChain,
  dirToAddMined: '',
  keyPair: _.cloneDeep(emptyKeyPair),
  pendingTransactions: [],
  transactionToPublish: _.cloneDeep(emptyTransactionToPublish),
  wallets: DefaultWallets,
}

function CoinArena({}: {}) {
  const [general, dispatch] = useReducer(reducer, defaultGeneral)

  let refList: { [name: string]: HTMLElement } = {}

  const setRef = (refName: string, ref: HTMLElement) => {
    refList[refName] = ref
  }
  const tryDifferentNonces = async (block: Block, blockIndex: number) => {
    let nonce = 0
    while (true) {
      if (blockIndex === -1) {
        // means we are changing the mined block
        dispatch({ type: 'changeMinedBlockNonce', nonce: nonce.toString() })
      } else {
        dispatch({
          type: 'changeBlockNonce',
          blockIndex,
          nonce: nonce.toString(),
        })
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
    let blockWithoutNonce = validateTransactions(
      general.pendingTransactions,
      general.chain,
      general.dirToAddMined
    )
    dispatch({ type: 'backToUneditedChain' })
    dispatch({ type: 'changeMinedBlock', block: blockWithoutNonce })
    general.minedBlock = blockWithoutNonce
    await addDelay(500)
    if (refList.tryingNonces) {
      refList.tryingNonces.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
    let nonce = await tryDifferentNonces(blockWithoutNonce, -1) //// -1 means we are changing the mined block
    dispatch({ type: 'changeMinedBlockNonce', nonce: nonce.toString() })
    await addDelay(3000)
    dispatch({ type: 'addMinedBlockToChain' })
    await addDelay(1000)
  }
  const loadingAndGenerateKeyPair = async () => {
    dispatch({
      type: 'changeKeyPair',
      keyPair: { address: 'generating...', privateKey: 'generating...' },
    })
    await addDelay(100)
    let keyPair = await generateKeyPair()
    dispatch({ type: 'changeKeyPair', keyPair })
  }
  const showNotification: Functions['showNotification'] = (
    area,
    milliseconds
  ) => {
    dispatch({ type: 'changeNotification', area, on: true })
    setTimeout(() => {
      dispatch({ type: 'changeNotification', area, on: false })
    }, milliseconds || DefaultNotificationDuration)
  }

  const functions: Functions = {
    loadingAndGenerateKeyPair,
    showNotification,
    dispatch,
    findNonce,
    mine,
    setRef,
  }
  return (
    <>
      <General general={general} functions={functions} />
    </>
  )
}

export default CoinArena
