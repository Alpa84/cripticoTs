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
import { stepKeyToIndex, generateSteps } from 'src/utils/steps'
import { chainStepsPre } from 'src/utils/chainSteps'

const DefaultNotificationDuration = 4000
const DelayFromIntroToChainTour = 300
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

  const setStep = (step: string, tourName?: TourName) => {
    tourName = tourName ? tourName : TourName.Intro
    let stepIndex = stepKeyToIndex(step, tourName);
    if (general.introTourOpen && general.introStep === stepIndex - 1) {
      dispatch({ type: 'changeStep', step: stepIndex, tour: tourName })
    }
  }

  const triggerTour = (tourName: TourName) => {
    let step = tourName === TourName.Intro ? general.introStep : general.chainStep
    let tourLen = tourName === TourName.Intro ? stepsPre.length : chainStepsPre.length
    if (step === tourLen -1){
      dispatch({ type: 'changeStep', step: 0, tour: tourName })
    } else {
      dispatch({ type: 'changeStep', step, tour: tourName })
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
  const introToChainDirect = () => {
    dispatch({type: 'changeTourOpen', tour: TourName.Intro, on: false})
    setTimeout( ()=> {
      dispatch({ type: 'changeTourOpen', tour: TourName.Chain, on: true })
    }, DelayFromIntroToChainTour)
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
  const IntroKeysToActions = {
    '2': loadingAndGenerateKeyPair,
    '4': () => dispatch({ type: 'generateLazyWallet' }),
  }
  const ChainKeysToActions = {}

  const functions: Functions = {
    loadingAndGenerateKeyPair,
    introToChainDirect,
    showNotification,
    triggerTour,
    dispatch,
    findNonce,
    mine,
    setStep,
    setRef,
  }
  let stepsPre =  generateSteps(functions)
  return  (
    <>
      <General
        general={general}
        functions={functions}/>
      <Tour
        stepNumber={general.introStep}
        tourOpen={general.introTourOpen}
        functions={functions}
        stepsPre={stepsPre}
        tourName={TourName.Intro}
        keysToActions={IntroKeysToActions}
      />
      <Tour
        stepNumber={general.chainStep}
        tourOpen={general.chainTourOpen}
        functions={functions}
        stepsPre={chainStepsPre}
        tourName={TourName.Chain}
        keysToActions={ChainKeysToActions}
      />
    </>
  )
}

export default CoinArena
