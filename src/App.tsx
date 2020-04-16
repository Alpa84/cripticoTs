import * as React from 'react'
import './App.css'
import * as _ from 'lodash'
import { useState, useEffect } from 'react'
import Tour from 'reactour'
import { steps } from './utils/steps'
import CoinArena from './components/CoinArena'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

function App() {
  const [tourOpen, setTour] = useState(false)
  const [step, setStep] = useState(0)
  const accentColor = "#a9a9a9"
  const disableBody = (target: HTMLElement) => disableBodyScroll(target)
  const enableBody = (target: HTMLElement) => enableBodyScroll(target)
  const SmallScreenSize = 700
  const isSmallScreen = window.innerWidth < SmallScreenSize
  useEffect(() => {
    if (!isSmallScreen) { setTour(true) }
  }, []) // used to fire dispatch just once on open

  return  (
    <>
      <CoinArena all={{ setStep, setTour, isSmallScreen, isTourOpen: tourOpen}} />
      <Tour
        onAfterOpen={disableBody}
        onBeforeClose={enableBody}
        steps={steps}
        showNumber={false}
        scrollDuration={100}
        showNavigation={false}
        accentColor={accentColor}
        rounded={0}
        goToStep={step}
        isOpen={tourOpen}
        onRequestClose={() => setTour(false)} />
    </>
  )
}

export default App
