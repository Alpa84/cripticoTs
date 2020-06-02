import * as React from 'react';
import Joyride, { CallBackProps, EVENTS, STATUS, FloaterProps } from 'react-joyride';
import {  } from 'react-joyride';
import { steps } from 'src/utils/steps';
import { Dispatch } from 'react'
import { Action } from 'src/Types';

export interface Props {
  mobileStep: number
  mobileTourOpen: boolean
  dispatch: Dispatch<Action>
}

function Tour({ mobileStep, dispatch, mobileTourOpen }: Props) {

  const joyrideCallback = (callbackProps: CallBackProps) => {
    let action = callbackProps.action
    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].some(x => x === callbackProps.type)) {
      // NOTE: the folloing is to avoid a triggering it twice on an external change of step
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
        {disableFlip: true} as FloaterProps
      }
      run={mobileTourOpen}
      stepIndex={mobileStep}
      callback={joyrideCallback}
      continuous={true}
      scrollToFirstStep={true}
    />
  )
}

export default Tour;

