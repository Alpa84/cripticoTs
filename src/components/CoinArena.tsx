import * as React from 'react'
import * as _ from 'lodash'
import { useReducer } from 'react'
import { DefaultChain, DefaultWallets } from '../utils/defaultChain'
import { GeneralType, Functions, Block } from '../Types'
import { hashBlockWithoutNonce, startsWithZeros, validateTransactions } from '../utils/blockchain'
import General from './General'
import { reducerAndLog } from 'src/utils/reducer'
import { addDelay } from 'src/utils/misc'
import { generateKeyPair } from 'src/utils/rsa'
import Tour from './Tour'

const DefaultNotificationDuration = 4000
let emptyTransactionToPublish = { gives: '', receives: '', amount: 0, signature: '', secretKey: '' }
let emptyKeyPair = { address: '', privateKey: '' }
export const defaultGeneral: GeneralType = {
  mobileTourOpen: false,
  notifications: { walletGenerated: false, transactionPublished: false},
  mobileStep: 0,
  alias: '',
  chain: DefaultChain,
  dirToAddMined: '',
  keyPair: _.cloneDeep(emptyKeyPair),
  pendingTransactions: [],
  transactionToPublish: _.cloneDeep(emptyTransactionToPublish),
  wallets: DefaultWallets,
}

function CoinArena({} : {}) {
  const [general, dispatch] = useReducer(reducerAndLog, defaultGeneral)

  React.useEffect(() => {
    setTimeout(() => {
      functions.dispatch({ type: 'changeMobileTourOpen', on: true })
    }, 1000)
  }, []) // used to fire dispatch just once on open

  let refList: { [name: string]: HTMLElement } = {}
  const setStepMobile = async(step: number) => {
    dispatch({ type: 'changeMobileStep', step })
  }
  const setStep = (step: number) => {
    if (general.mobileTourOpen && general.mobileStep === step - 1) {
      setStepMobile(step)
    }
  }

  const joinTour = () => {
    setStepMobile(general.mobileStep)
    functions.dispatch({ type: 'changeMobileTourOpen', on: true })
  }

  const setRef = (refName: string, ref: HTMLElement) => {
    refList[refName] = ref
  }
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
    dispatch({ type:'backToUneditedChain'})
    dispatch({type:'changeMinedBlock', block: blockWithoutNonce})
    general.minedBlock = blockWithoutNonce
    let nonce = await tryDifferentNonces(blockWithoutNonce, -1) //// -1 means we are changing the mined block
    dispatch({ type: 'changeMinedBlockNonce', nonce: nonce.toString() })
    await addDelay(3000)
    dispatch({ type: 'addMinedBlockToChain' })
    await addDelay(1000)
    setStep(30)
  }
  const loadingAndGenerateKeyPair = async() => {
    dispatch({ type: 'changeKeyPair', keyPair: {address:'generating...', privateKey: 'generating...' }})
    let keyPair =  await generateKeyPair()
    dispatch({ type: 'changeKeyPair', keyPair })
  }
  const showNotification: Functions["showNotification"] = (area, milliseconds) => {
    dispatch({ type: 'changeNotification', area, on: true})
    setTimeout( ()=> {
      dispatch({type:'changeNotification', area, on:false})
    }, milliseconds || DefaultNotificationDuration)

  }
  const functions: Functions = {
    loadingAndGenerateKeyPair,
    showNotification,
    joinTour,
    dispatch,
    findNonce,
    mine,
    setStep,
    setRef,
  }
  return  (
    <>
      <General
        general={general}
        functions={functions}/>
      <Tour
        mobileStep={general.mobileStep}
        mobileTourOpen={general.mobileTourOpen}
        dispatch={functions.dispatch}
        />
    </>
  )
}

export default CoinArena
