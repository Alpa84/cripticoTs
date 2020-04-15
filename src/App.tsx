import * as React from 'react'
import './App.css'
import * as _ from 'lodash'
import { useState } from 'react'
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
  return  (
    <>
      <div className="container">
        <div className="row">
          <div data-tut="header">
            <h1>Toy Coin</h1>
            <h3>
              Your own crypto coin to play with (with every major feature a crypto coin should have)
            </h3>
          </div>
          <button type="button" className="btn btn-default"
            onClick={() => setTour(true)}
          >
            {step === 0 ? 'Join the Tour' : 'Resume the Tour'}
          </button>
        </div>
      </div>
      <CoinArena  all={{setStep, isSmallScreen}} />
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
