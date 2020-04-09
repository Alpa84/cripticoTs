import * as React from 'react'
import './App.css'
import * as _ from 'lodash'
import { useState } from 'react'
import Tour from 'reactour'
import { steps } from './utils/steps'
import CoinArena from './components/CoinArena'

function App() {
  const [tourOpen, setTour] = useState(true)
  const accentColor = "#a9a9a9"
  return  (
    <>
      <CoinArena />
      <Tour
        steps={steps}
        showNumber={false}
        scrollDuration={100}
        showNavigation={false}
        accentColor={accentColor}
        rounded={0}
        isOpen={tourOpen}
        onRequestClose={() => setTour(false)} />
    </>
  )
}

export default App
