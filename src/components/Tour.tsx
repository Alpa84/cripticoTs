import * as React from 'react';
import Joyride, { CallBackProps, EVENTS, STATUS, FloaterProps, Styles, Step, Placement } from 'react-joyride';
import {  stepIndexToKey } from 'src/utils/steps';
import { useState, useEffect } from 'react'
import { Functions, TourName } from 'src/Types';
import { isSmallScreen } from 'src/utils/misc';


export const tooltipStyles = {
  options: {
    primaryColor: '#00ffac',
  },
  tooltip: {
    opacity: 1,
    borderRadius: 0,
  },
  tooltipContainer: {
    textAlign: 'left',
  },
  tooltipFooter: {
    marginTop: 0,
  },

} as Styles

export interface Props {
  stepNumber: number
  tourOpen: boolean
  functions: Functions
  stepsPre: Step[]
  tourName: TourName
  keysToActions: {[key: string]: ()=> void}
}

function Tour({ stepNumber, functions, tourOpen, stepsPre, tourName, keysToActions }: Props) {
  const [steps, setSteps] = useState<Step[]>([])
  let dispatch = functions.dispatch
  let smallScreen = isSmallScreen()

  useEffect( ()=> {
    const stepsAdapted: Step[] = stepsPre.map(step => {
      let placement = step.placement === 'bottom' ? 'bottom' : 'top'
      if (smallScreen) {
        return { ...step, disableBeacon: true, isFixed: true, placement: placement as Placement }
      } else {
        return { disableBeacon: true, ...step }
      }
    })
    setSteps(stepsAdapted)
  }, [])

  const joyrideCallback = (callbackProps: CallBackProps) => {
    let action = callbackProps.action
    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].some(x => x === callbackProps.type)) {
      // NOTE: the folloing is to avoid a triggering it twice on an external change of step
      // using the get helpers prom may help too
      if(callbackProps.index === stepNumber) {
        let key = stepIndexToKey(stepNumber)
        if (action === 'next' && keysToActions[key]) {keysToActions[key]()}
        if (action === 'next') {
          dispatch({ type: 'changeStep', step: stepNumber + 1, tour: tourName })
        } else if (action === 'prev') {
          dispatch({ type: 'changeStep', step: stepNumber - 1, tour: tourName })
        }
      }
      if (action === 'close') {
        dispatch({ type: 'changeTourOpen', on: false, tour: tourName })
      }
    }
    else if ([STATUS.FINISHED, STATUS.SKIPPED].some(x => x === callbackProps.type)) {
      dispatch({ type: 'changeTourOpen', on: false, tour: tourName })
    }
  }

  return (
    <Joyride
      spotlightClicks={true}
      steps={steps}
      floaterProps={
        {disableFlip: true,
        hideArrow: true,
        disableAnimation: true} as FloaterProps
      }
      styles={tooltipStyles}
      disableOverlayClose={true}
      run={tourOpen}
      stepIndex={stepNumber}
      callback={joyrideCallback}
      continuous={true}
      scrollToFirstStep={true}
    />
  )
}

export default Tour;

