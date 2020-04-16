import * as React from 'react'
import * as _ from 'lodash'
import { useReducer, useEffect } from 'react'
import { DefaultChain, DefaultWallets } from '../utils/defaultChain'
import { GeneralType, Functions, Block } from '../Types'
import { hashBlockWithoutNonce, startsWithZeros, validateTransactions, addDelay } from '../utils/blockchain'
import General from './General'
import { reducer } from 'src/utils/reducer'
import { steps } from 'src/utils/steps'

let emptyTransactionToPublish = { gives: '', receives: '', amount: 0, signature: '', secretKey: '' }
let emptyKeyPair = { address: '', privateKey: '' }
const defaultGeneral: GeneralType = {
  mobileTourOpen: false,
  mobileStep: 0,
  alias: '',
  chain: DefaultChain,
  dirToAddMined: '',
  keyPair: _.cloneDeep(emptyKeyPair),
  pendingTransactions: [],
  transactionToPublish: _.cloneDeep(emptyTransactionToPublish),
  wallets: DefaultWallets,
}
export interface Props {
  all: {
    setStep: (step: number) => void
    setTour: (on: boolean) => void
    isTourOpen: boolean
    isSmallScreen: boolean
  }
}
const delay = (time = 1500) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}
function CoinArena({all } : Props) {
  const [general, dispatch] = useReducer(reducer, defaultGeneral)

  useEffect(() => {
    if ( all.isSmallScreen) { dispatch({ type: 'changeMobileTourOpen', on: true }) }
  }, []) // used to fire dispatch just once on open

  let refList: { [name: string]: HTMLElement } = {}
  const setStepMobile = async(step: number) => {
    dispatch({ type: 'changeMobileStep', step })
    await delay(10)
    let stepProp = steps[step]
    let tutName
    if (stepProp.selector){
      tutName = stepProp.selector.split('"')[1]
    } else if (stepProp.altSelector) {
      tutName = stepProp.altSelector
    }
    if (tutName) {
      refList[tutName].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }
  const setStep = (step:number) => {
    if (all.isSmallScreen && general.mobileTourOpen) {
      setStepMobile(step)
    } else if (!all.isSmallScreen && all.isTourOpen) {
      all.setStep(step)
    }
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
    dispatch({type:'changeMinedBlock', block: blockWithoutNonce})
    general.minedBlock = blockWithoutNonce
    let nonce = await tryDifferentNonces(blockWithoutNonce, -1) //// -1 means we are changing the mined block
    dispatch({ type: 'changeMinedBlockNonce', nonce: nonce.toString() })
    dispatch({ type: 'addMinedBlockToChain' })
  }

  const functions: Functions = {
    setTour: all.setTour,
    dispatch,
    findNonce,
    mine,
    setStep,
    setRef,
  }
  return  (
    <General
      general={general}
      functions={functions}
      isSmallScreen={all.isSmallScreen}/>
  )
}

export default CoinArena
