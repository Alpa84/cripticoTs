
import * as React from 'react';
import { TourName, GeneralType, Functions } from 'src/Types';
import { stepsPre } from 'src/utils/steps';

export interface Props {
  general: GeneralType
  functions: Functions
  tourName: TourName
}

function TourButton({ functions, tourName, general }: Props) {
  let tourTriggerText: string
  if (general.mobileStep === 0) {
    tourTriggerText = 'Join the Tour'
  } else if (general.mobileStep === stepsPre.length - 1) {
    tourTriggerText = 'Restart the Tour'
  } else {
    tourTriggerText = 'Resume the Tour'
  }
  return (
    <button type="button" className="btn btn-primary"
      onClick={functions.triggerTour}
      disabled={tourName === TourName.Intro ? general.mobileTourOpen : general.introTourOpen}
    >
      {tourTriggerText}
    </button>
  )
}

export default TourButton;

