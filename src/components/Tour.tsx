import * as React from 'react';
import Joyride, { CallBackProps, EVENTS, STATUS, FloaterProps, Styles, Step, Placement } from 'react-joyride';
import { stepsPre } from 'src/utils/steps';
import { Dispatch, useState, useEffect } from 'react'
import { Action } from 'src/Types';
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
  dispatch: Dispatch<Action>
}

function Tour({ mobileStep, dispatch, mobileTourOpen }: Props) {
  const [steps, setSteps] = useState<Step[]>([])

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
      if(callbackProps.index === mobileStep) {
        if (action === 'next') {
          dispatch({ type: 'changeMobileStep', step: mobileStep + 1 })
        } else if (action === 'prev') {
          dispatch({ type: 'changeMobileStep', step: mobileStep - 1 })
        }
      }
      if (action === 'close') {
        dispatch({ type: 'changeMobileTourOpen', on: false })
      }
    }
    else if ([STATUS.FINISHED, STATUS.SKIPPED].some(x => x === callbackProps.type)) {
      dispatch({ type: 'changeMobileTourOpen', on: false })
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

