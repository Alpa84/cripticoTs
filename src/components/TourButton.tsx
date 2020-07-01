
import * as React from 'react';
import { TourName, GeneralType, Functions } from 'src/Types';

export interface Props {
  general: GeneralType
  functions: Functions
  tourName: TourName
  stepsLen: number
}

function TourButton({ functions, tourName, general, stepsLen}: Props) {
  let tourTriggerText: string
  let step = tourName === TourName.Intro ? general.introStep : general.chainStep
  if (step === 0) {
    tourTriggerText = `Join the ${TourName[tourName]} Tour`
  } else if (step === stepsLen - 1) {
    tourTriggerText = `Restart the ${TourName[tourName]} Tour`
  } else {
    tourTriggerText = `Resume the ${TourName[tourName]} Tour`
  }
  return (
    <button type="button" className="btn btn-primary"
      onClick={()=> functions.triggerTour(tourName)}
      disabled={tourName === TourName.Intro ? general.introTourOpen : general.chainTourOpen}
    >
      {tourTriggerText}
    </button>
  )
}

export default TourButton;

