import React from 'react';
import './Marker.css';

const PopUp = (props) => {
  const { FATALS, DAY, MONTH, WEATHER, PEDS, YEAR, LIKELIHOOD } = props.accident;
  const formattedLikelihood = (LIKELIHOOD * 100).toFixed(3) + '%';
  return (
      <div className="popUp">
          <p>Date: {`${MONTH}/${DAY}/${YEAR}`}</p>
          <p>Weather Conditions: {WEATHER}</p>
          <p>Fatalities: {FATALS}</p>
          <p>Pedestrians: {PEDS}</p>
          <p>Accident Likelihood: {formattedLikelihood}</p>
      </div>
  )
}

export default PopUp;