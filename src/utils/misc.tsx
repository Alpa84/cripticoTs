import { GeneralType, Log } from "src/Types"
import { defaultGeneral } from 'src/components/CoinArena'
import * as axios from 'axios'
import { getAuth } from './rep'
import * as _ from 'lodash'


export const prefferName = (dir: string, general: GeneralType) => {
  let name = general.wallets[dir]
  return name ? name.alias : dir
}
export function addDelay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let storedLog: Log = {
  newEvents: [],
  timestamp: 0,
  sessionId: '',
  path: '',
  ipData: '',
  windowSize: { innerHeight: 0 , innerWidth: 0 },
  general: defaultGeneral,
  bigScreenStep: 0,
}
let unstoredDataPresent = false

const getIP = async () => {
  let res =   await axios.default({
    method: 'get',
    url: 'https://www.cloudflare.com/cdn-cgi/trace',
  })
  return res.data as string
}

const initLogging = async() => {
  let counter = 0
  storedLog.ipData = await getIP()
  storedLog.windowSize = {innerHeight: window.innerHeight, innerWidth: window.innerWidth}
  storedLog.sessionId = (+ new Date()).toString()
  storedLog.path = window.location.href
  const Auth = await getAuth()

  setInterval(() => {
    if (unstoredDataPresent) {
      storedLog.timestamp = + new Date()
      post(_.cloneDeep(storedLog), Auth, counter)
      unstoredDataPresent = false
      storedLog.newEvents = []
      counter += 1
    }
  }, 5000)
}

export const logGeneralChange = (general: GeneralType)=> {
  storedLog.general = general
  unstoredDataPresent = true
}
export const logBigScreenStepChange = (stepNumber: number)=> {
  storedLog.bigScreenStep = stepNumber
  unstoredDataPresent = true
}
export const logEvent = (event: string)=> {
  storedLog.newEvents.push(event)
  unstoredDataPresent = true
}

if (window.location.host !== 'localhost:3000' || window.location.pathname === "/log") {
  initLogging()
}

const post = async (log: Log, auth: string, counter: number) => {
  try {
    await axios.default({
      method: 'post',
      url: `https://jsonbin.org/alpa84/${log.sessionId}/${counter}`,
      headers: {
        'authorization': auth,
        'Content-Type': 'application/ json',
        'accept': 'application/json',
      },
      data: log,
    })
  } catch (error) {
    console.log(error)
  }

}