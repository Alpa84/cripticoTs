import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './styles/sass/index.scss'
import registerServiceWorker from './registerServiceWorker'
import App from './App'

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement)

registerServiceWorker()
