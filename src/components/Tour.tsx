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
  mobileStep: number
  mobileTourOpen: boolean
  functions: Functions
  stepsPre: Step[]
  tourName: TourName
}

function Tour({ mobileStep, functions, mobileTourOpen, stepsPre, tourName }: Props) {
  const [steps, setSteps] = useState<Step[]>([])
  let dispatch = functions.dispatch
  let smallScreen = isSmallScreen()

  const keyToActions = {
    '2': functions.loadingAndGenerateKeyPair,
    '4': () => functions.dispatch({ type: 'generateLazyWallet'}),
  }
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
      if(callbackProps.index === mobileStep) {
        let key = stepIndexToKey(mobileStep)
        if (action === 'next' && keyToActions[key]) { keyToActions[key]()}
        if (action === 'next') {
          dispatch({ type: 'changeStep', step: mobileStep + 1, tour: tourName })
        } else if (action === 'prev') {
          dispatch({ type: 'changeStep', step: mobileStep - 1, tour: tourName })
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
      run={mobileTourOpen}
      stepIndex={mobileStep}
      callback={joyrideCallback}
      continuous={true}
      scrollToFirstStep={true}
    />
  )
}

export default Tour;

