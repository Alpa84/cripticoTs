import * as React from 'react'
import * as _ from 'lodash'
import { useState, useEffect } from 'react'
import Tour, { ReactourStep } from 'reactour'
import { steps } from './utils/steps'
import { logBigScreenStepChange, logEvent, logTourOpen, } from './utils/misc'
import CoinArena from './components/CoinArena'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'


let stepsWithAction = steps.map((stepI: ReactourStep, stepInd: number) => {
  stepI.action = () => {
    logBigScreenStepChange(stepInd)
  }
  return stepI
})

function App() {
  const [tourOpen, setTour] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [stepGoTo, setStepToGoTo] = useState(0)
  const accentColor = "#a9a9a9"
  const setTourAndLog = (doOpen: boolean) => {
    setTour(doOpen)
    logTourOpen(doOpen)
  }
  const disableBodyAndNotify = (target: HTMLElement) => {
    logTourOpen(true)
    disableBodyScroll(target)
  }
  const setBigScreenStep = (stepI: number) => {
    if (currentStep === stepI -1 ) {
      setStepToGoTo(stepI)
      setCurrentStep(stepI)
    }
  }
  const adjacentStep = (next: boolean) => {
    if (next) {
      setStepToGoTo(currentStep + 1)
      setCurrentStep(currentStep + 1)
    } else {
      setStepToGoTo(currentStep - 1)
      setCurrentStep(currentStep - 1)
    }
  }

  const enableBodyAndNotify = (target: HTMLElement) => {
    logTourOpen(false)
    enableBodyScroll(target)
  }

  const SmallScreenSize = 700
  const isSmallScreen = window.innerWidth < SmallScreenSize
  useEffect(() => {
    if (!isSmallScreen) { setTourAndLog(true) }
  }, []) // used to fire dispatch just once on open

  return  (
    <>
      <CoinArena all={{ setBigScreenStep, setTour: setTourAndLog, isSmallScreen, isTourOpen: tourOpen}} />
      <Tour
        onAfterOpen={disableBodyAndNotify}
        onBeforeClose={enableBodyAndNotify}
        nextStep={() => adjacentStep(true)}
        prevStep={() => adjacentStep(false)}
        steps={stepsWithAction}
        showNumber={false}
        scrollDuration={100}
        showNavigation={false}
        accentColor={accentColor}
        rounded={0}
        goToStep={stepGoTo}
        isOpen={tourOpen}
        onRequestClose={() => setTour(false)} />
    </>
  )
}

export default App
