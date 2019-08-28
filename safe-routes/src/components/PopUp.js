import React from 'react';
import '../Marker.css';

const PopUp = (props) => {
  const { FATALS, DAY, DAY_WEEK, MONTH, WEATHER, PEDS, YEAR } = props.accident;
  return (
      <div className="popUp">
          <p>Date: {`${MONTH}/${DAY}/${YEAR}`}</p>
          <p>Weather Conditions: {WEATHER}</p>
          <p>Fatalities: {FATALS}</p>
          <p>Pedestrians: {PEDS}</p>
      </div>
  )
}

export default PopUp;