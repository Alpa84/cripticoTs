import * as React from 'react'
import * as _ from 'lodash'
import { useReducer } from 'react'
import { DefaultChain, DefaultWallets } from '../utils/defaultChain'
import { GeneralType, Functions, Block, TourName } from '../Types'
import { hashBlockWithoutNonce, startsWithZeros, validateTransactions } from '../utils/blockchain'
import General from './General'
import { reducerAndLog } from 'src/utils/reducer'
import { addDelay } from 'src/utils/misc'
import { generateKeyPair } from 'src/utils/rsa'
import Tour from './Tour'
import { stepsPre, stepKeyToIndex } from 'src/utils/steps'

const DefaultNotificationDuration = 4000
export let emptyTransactionToPublish = { gives: '', receives: '', amount: null, signature: '', secretKey: '' }
let emptyKeyPair = { address: '', privateKey: '' }
export const defaultGeneral: GeneralType = {
  introTourOpen: false,
  chainTourOpen: false,
  notifications: { walletGenerated: false, transactionPublished: false},
  introStep: 0,
  chainStep: 0,
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
      functions.dispatch({ type: 'changeTourOpen', on: true, tour: TourName.Intro })
    }, 1000)
  }, []) // used to fire dispatch just once on open

  let refList: { [name: string]: HTMLElement } = {}
  const setStepIntro = async(step: number) => {
    dispatch({ type: 'changeStep', step, tour: TourName.Intro })
  }
  const setStep = (step: string) => {
    let stepIndex = stepKeyToIndex(step)
    if (general.introTourOpen && general.introStep === stepIndex - 1) {
      setStepIntro(stepIndex)
    }
  }

  const triggerTour = () => {
    if (general.introStep === stepsPre.length -1){
      setStepIntro(0)
    } else {
      setStepIntro(general.introStep)
    }
    functions.dispatch({ type: 'changeTourOpen', on: true, tour: TourName.Intro })
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
    setStep('30')
  }
  const loadingAndGenerateKeyPair = async() => {
    dispatch({ type: 'changeKeyPair', keyPair: {address:'generating...', privateKey: 'generating...' }})
    await addDelay(100)
    let keyPair =  await generateKeyPair()
    dispatch({ type: 'changeKeyPair', keyPair })
  }
  const showNotification: Functions["showNotification"] = (area, milliseconds) => {
    if (! general.introTourOpen) {
      dispatch({ type: 'changeNotification', area, on: true})
      setTimeout( ()=> {
        dispatch({type:'changeNotification', area, on:false})
      }, milliseconds || DefaultNotificationDuration)
    }
  }
  const functions: Functions = {
    loadingAndGenerateKeyPair,
    showNotification,
    triggerTour,
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
        introStep={general.introStep}
        introTourOpen={general.introTourOpen}
        functions={functions}
        stepsPre={stepsPre}
        tourName={TourName.Intro}
        />
    </>
  )
}

export default CoinArena
