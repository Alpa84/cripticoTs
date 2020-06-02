import { GeneralType, LogChunk, InitialLog, ChronoLog, Action, StatusPure } from "src/Types"
import * as axios from 'axios'
import * as _ from 'lodash'

const Check = '23847823h'
export const LocalServer = 'http://localhost:5000'
export const ProdServer = 'https://toycoin.herokuapp.com'
export const ServerEndpoint = process.env.NODE_ENV === 'development'? LocalServer : ProdServer

const PushInterval = 5000
const ScrollInterval = 1000

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
  hidden: false,
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

  setInterval( async ()=> {
    let currentStatus = getStatus()
    if (!_.isEqual(currentStatus, lastStatus)) {
      let currentStatusTime = {
        status: {...currentStatus},
        timestamp: generateTimestamp(),
      }
      dataToPush.push(currentStatusTime)
      pushNeeded = true
      lastStatus = currentStatus
    }
  }, ScrollInterval)
  setInterval(async() => {
    let chronoLogChunk: LogChunk = {
      chronoLog: dataToPush,
      check: Check,
      sessionId,
    }

    if (dataToPush.length !== 0 ) {
      pushNeeded = true
    }
    if (pushNeeded) {
      await post(chronoLogChunk)
    }
    dataToPush =  []
    pushNeeded = false
  }, PushInterval)
}

const getStatus = (): StatusPure => {
  return {
    scrollYPosition: window.pageYOffset || document.documentElement.scrollTop,
    scrollXPosition: window.pageXOffset || document.documentElement.scrollLeft,
    hidden: document.hidden
  }
}
export const logActionChange = (action: Action)=> {
  let chrono : ChronoLog = {
    action,
    timestamp: generateTimestamp()
  }
  dataToPush.push(chrono)
}
export const logLinkOpened = (link: string)=> {
  let chrono : ChronoLog = {
    linkOpened: link,
    timestamp: generateTimestamp()
  }
  dataToPush.push(chrono)
}

if (window.location.search !== "?do_not_log") {
  if (window.location.host !== 'localhost:3000' || window.location.pathname.startsWith("/log") ) {
    initLogging()
  }
}

const post = async (logChunk: LogChunk ) => {
  try {
    await axios.default({
      method: 'post',
      url: ServerEndpoint,
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