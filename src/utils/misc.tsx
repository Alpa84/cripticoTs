import { GeneralType, LogChunk, InitialLog, ChronoLog, Action, StatusPure, EventE } from "src/Types"
import * as axios from 'axios'
import * as _ from 'lodash'

const Check = '23847823h'
const Endpoint = 'http://localhost:5000/'
// const Endpoint = 'https://toycoin.herokuapp.com/'

export const prefferName = (dir: string, general: GeneralType) => {
  let name = general.wallets[dir]
  return name ? name.alias : dir
}
export function addDelay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let dataToPush : ChronoLog[] = []
let lastStatus: StatusPure = {
  scrollYPosition: 0,
  scrollXPosition: 0,
}

const getIP = async () => {
  let res =   await axios.default({
    method: 'get',
    url: 'https://www.cloudflare.com/cdn-cgi/trace',
  })
  return res.data as string
}
const generateTimestamp = () => (+ new Date())
let sessionId : string
const initLogging = async() => {
  let timestamp = generateTimestamp()
  sessionId = timestamp.toString()
  let ipData = await getIP()
  let initialLog : InitialLog= {
    windowSize: { innerHeight: window.innerHeight, innerWidth: window.innerWidth },
    ipData,
    path: window.location.href,
    timestamp,
  }
  let logChunk: LogChunk = {
    initialLog,
    check: Check,
    sessionId,
  }
  await post(logChunk)
  let pushNeeded = false
  setInterval(async() => {
    let chronoLogChunk: LogChunk = {
      chronoLog: dataToPush,
      check: Check,
      sessionId,
    }
    let currentStatus = getStatus()
    if ( !_.isEqual(currentStatus, lastStatus)) {
      let currentStatusTime = {
        ...currentStatus,
        timestamp: generateTimestamp(),
      }
      dataToPush.push({
        status: currentStatusTime,
      })
      pushNeeded = true
    }
    if (dataToPush.length !== 0 ) {
      pushNeeded = true
    }
    if (pushNeeded) {
      await post(chronoLogChunk)
    }
    dataToPush =  []
    pushNeeded = false
    lastStatus = currentStatus
  }, 5000)
}

const getStatus = (): StatusPure => {
  return {
    scrollYPosition: window.pageYOffset || document.documentElement.scrollTop,
    scrollXPosition: window.pageXOffset || document.documentElement.scrollLeft,
  }
}
export const logActionChange = (action: Action)=> {
  let chrono : ChronoLog = {
    action: {action, timestamp: generateTimestamp()},
  }
  dataToPush.push(chrono)
}
export const logLinkOpened = (link: string)=> {
  let chrono : ChronoLog = {
    linkOpened: {link, timestamp: generateTimestamp()},
  }
  dataToPush.push(chrono)
}
export const logTourOpen = (isOpen: boolean)=> {
  let chrono: ChronoLog = {
    event: {
      event: isOpen? EventE.tourOpened : EventE.tourClosed,
      timestamp: generateTimestamp()
    }
  }
  dataToPush.push(chrono)
}
export const logBigScreenStepChange = (stepNumber: number)=> {
  let chrono: ChronoLog = {
    tourStepChange: {
      step: stepNumber,
      timestamp: generateTimestamp()
    }
  }
  dataToPush.push(chrono)
}

if (window.location.host !== 'localhost:3000' || window.location.pathname === "/log") {
  initLogging()
}

const post = async (logChunk: LogChunk ) => {
  try {
    await axios.default({
      method: 'post',
      url: Endpoint,
      headers: {
        'sessionId': logChunk.sessionId,
        'Content-Type': 'application/json',
      },
      data: logChunk,
    })
  } catch (error) {
    console.log(error)
  }
}