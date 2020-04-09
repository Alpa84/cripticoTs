import * as React from 'react'
import './App.css'
import * as _ from 'lodash'
import { useState } from 'react'
import Tour from 'reactour'
import { steps } from './utils/steps'
import CoinArena from './components/CoinArena'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

function App() {
  const [tourOpen, setTour] = useState(true)
  const [step, setStep] = useState(0)
  const accentColor = "#a9a9a9"
  const disableBody = (target: HTMLElement) => disableBodyScroll(target)
  const enableBody = (target: HTMLElement) => enableBodyScroll(target)
  return  (
    <>
      <CoinArena  setStep={setStep} />
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
