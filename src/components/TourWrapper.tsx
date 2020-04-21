import * as React from 'react'
import { GeneralType, Functions } from '../Types'
import { steps } from 'src/utils/steps';

export interface Props {
  general: GeneralType
  functions: Functions
  children: React.ReactNode
  tutName: string
  componentClass?: string
}

function TourWrapper({children, functions, general, tutName, componentClass}: Props) {
  let step = steps[general.mobileStep]
  let nextStepExists = steps[general.mobileStep + 1]!!
  let selectorName : string = ''
  if (step.selector) {
    selectorName = step.selector.split('"')[1]
  } else if (step.altSelector) {
    selectorName = step.altSelector
  }

  let show =  general.mobileTourOpen && selectorName === tutName

  return (
    <div
      className={show ? `activeTut ${componentClass}`: componentClass}
      ref={(ref) => { if (tutName !== '' && ref) { functions.setRef(tutName, ref) } }}
      data-tut={tutName}>
      { show && (
        <>
          <div className='closeButton'>
            <svg
              className='tourArrow'
              type="button"
              onClick={() => functions.dispatch({ type: 'changeMobileTourOpen', on: false })}
              viewBox="0 0 9.1 9.1">
              <path fill="currentColor" d="M5.9 4.5l2.8-2.8c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L4.5 3.1 1.7.3C1.3-.1.7-.1.3.3c-.4.4-.4 1 0 1.4l2.8 2.8L.3 7.4c-.4.4-.4 1 0 1.4.2.2.4.3.7.3s.5-.1.7-.3L4.5 6l2.8 2.8c.3.2.5.3.8.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L5.9 4.5z" />
            </svg>
          </div>
          <div className='tourExplanation'>
            {step.content()}
            <div className='tourArrows'>
              {general.mobileStep > 0 && (
                <svg
                  className='tourArrow'
                  onClick={() => functions.setStep(general.mobileStep - 1)}
                  viewBox="0 0 18.4 14.4">
                  <path d="M1.4 7.2h16M7.6 1L1.4 7.2l6.2 6.2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" />
                </svg>
              )}
              {nextStepExists && (

                <svg
                  className='tourArrow'
                  onClick={() => functions.setStep(general.mobileStep + 1)}
                  viewBox="0 0 18.4 14.4">
                  <path d="M17 7.2H1M10.8 1L17 7.2l-6.2 6.2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" />
                </svg>
              )}

            </div>
          </div>
        </>
      )}
      {children}
    </div>
  )
}

export default TourWrapper;
