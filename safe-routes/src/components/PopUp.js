import React from 'react';
import '../Marker.css';

const PopUp = (props) => {
  const { FATALS, DAY, DAY_WEEK, MONTH, WEATHER, PEDS, YEAR, LIKELIHOOD } = props.accident;
  const formattedLikelihood = Number(LIKELIHOOD.toFixed(2)) * 100 + '%';
  return (
      <div className="popUp">
          <p>Date: {`${MONTH}/${DAY}/${YEAR}`}</p>
          <p>Weather Conditions: {WEATHER}</p>
          <p>Fatalities: {FATALS}</p>
          <p>Pedestrians: {PEDS}</p>
          <p>Likelihood: {formattedLikelihood}</p>
      </div>
  )
}

export default PopUp;