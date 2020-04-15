import * as React from 'react'
import { GeneralType, Functions } from '../Types'
import { steps } from 'src/utils/steps';

export interface Props {
  general: GeneralType
  functions: Functions
  children: React.ReactNode
  tutName: string
}

function TourWrapper({children, functions, general, tutName}: Props) {
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
      className={show ? 'activeTut': ''}
      ref={(ref) => { if (tutName !== '' && ref) { functions.setRef(tutName, ref) } }}
      data-tut={tutName}>
      { show && (
        <div>
          {step.content()}
          {general.mobileStep  > 0 && (
            <button className="btn btn-default"
              onClick={() => functions.setStep(general.mobileStep -1)}
            >
              Previous
            </button>
          )}
          { nextStepExists && (
            <button className="btn btn-default"
              onClick={() => functions.setStep(general.mobileStep + 1)}
            >
              Next
            </button>
          )}
        </div>
      )}
      {children}
    </div>
  )
}

export default TourWrapper;
