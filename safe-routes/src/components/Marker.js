import React from 'react';
import '../Marker.css';
import PopUp from './PopUp';

const Marker = (props) => {
    const { color, accident } = props;
    const { show } = accident;
    return (
      <div>
        <div>
          <div
            className="pin bounce"
            style={{ backgroundColor: color, cursor: 'pointer' }}
          />
          <div className="pulse" />
          {show ? <PopUp accident={props.accident} /> : <></>}
        </div>  
      </div>
    );
  };

  export default Marker;