import React from 'react';
import '../Marker.css';
import PopUp from './PopUp';

const Marker = (props) => {
    const { color, name } = props;
    const { id, show } = props.accident;
    return (
      <div>
        <div>
          <div
            className="pin bounce"
            style={{ backgroundColor: color, cursor: 'pointer' }}
            title={name}
          />
          <div className="pulse" />
          {show ? <PopUp accident={props.accident} /> : <></>}
        </div>  
      </div>
    );
  };

  export default Marker;