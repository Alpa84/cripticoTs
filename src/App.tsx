import * as React from 'react'
import './App.css'
import * as _ from 'lodash'
import { useState } from 'react'
import Tour from 'reactour'
import { steps } from './utils/steps'
import CoinArena from './components/CoinArena'

function App() {
  const [tourOpen, setTour] = useState(true)
  return  (
    <>
      <CoinArena />
      <Tour
        steps={steps}
        isOpen={tourOpen}
        onRequestClose={() => setTour(false)} />
    </>
  )
}

export default App
