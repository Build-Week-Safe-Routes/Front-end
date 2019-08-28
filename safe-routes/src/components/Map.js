// import React, { Component } from 'react';
// import GoogleMapReact from 'google-map-react';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

// class SimpleMap extends Component {
//   static defaultProps = {
//     center: {
//       lat: 59.95,
//       lng: 30.33
//     },
//     zoom: 11
//   };

//   render() {
//     return (
//       // Important! Always set the container height explicitly
//       <div style={{ height: '90vh', width: '100%' }}>
//         <GoogleMapReact
//           bootstrapURLKeys={{ key: 'AIzaSyDtGTHRl9IJ9LPI8YcV0Pb0UR6DKlWqoOQ' }}
//           defaultCenter={this.props.center}
//           defaultZoom={this.props.zoom}
//         >
//           <AnyReactComponent
//             lat={59.955413}
//             lng={30.337844}
//             text="My Marker"
//           />
//         </GoogleMapReact>
//       </div>
//     );
//   }
// }

// export default SimpleMap;

import React, { useState, useEffect } from 'react';
import GoogleMap from 'google-map-react';
import Marker from './Marker';
import SearchBox from './SearchBox';
import axios from 'axios';
import DatePicker from './DatePicker';

const SimpleMap = (props) => {
  const [googleMap, setGoogleMap] = useState({
    mapApiLoaded: false,
    mapInstance: null,
    mapApi: null,
  })

  const getMapOptions = (maps) => {
    return {
      disableDefaultUI: false,
      styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
    };
  };

  const handleApiLoaded = (map, maps) => {
    console.log('api loaded', maps);
    setGoogleMap({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    })
  };

  const [coords, setCoords] = useState({
    lat: 46.790768,
    lng: -123.009968,
  });
  const [center, setCenter] = useState([coords.lat, coords.lng]);
  const [zoom, setZoom] = useState(11);
  const [accidents, setAccidents] = useState([]);
  const [month, setMonth] = useState();

  const handleClick = (key) => {
    // console.log("Marker Clicked");

    setAccidents(prevState => prevState.map( element => {
      console.log(key);
      console.log(element.id);
      if (element.id === Number(key)) {
        // console.log({...element, show : !element.show})
        return {...element, show : !element.show}
      }
      else {
        return {...element, show: false};
      }
    } ))
    console.log(accidents);
  }

  const getNumberedMonth = (mon) => {
    return new Date(Date.parse(mon + " 1, 2012")).getMonth() + 1;
  }

  const getConvertedData = (data) => {
    let FUNC_SYS = 99;
    
    switch (data.FUNC_SYS) {
      case "INTERSTATE": 
        FUNC_SYS = 1;
        break;
      case "COLLECTOR":
        FUNC_SYS = 5;
        break;
      case "LOCAL":
        FUNC_SYS = 7;
        break;
      case "ARTERY":
        FUNC_SYS = 2;
        break;
      default:
        FUNC_SYS = 99;
    }

    const RELJCT1 = data.TYP_INT === "NOT AN INTERSECTION" ? 0 : 1;

    return {
      ...data,
      FUNC_SYS,
      RELJCT1,
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post('https://protected-badlands-42757.herokuapp.com/api/accident/coords', {
          LATITUDE: coords.lat,
          LONGITUD: coords.lng,
        });
        console.log(response);
        setAccidents(response.data);
        const model = await axios.post('https://saferoutes-pred.herokuapp.com/api', getConvertedData(response.data[0]));
        console.log('model', model);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [coords])

  return (
    <section className="map-container">
      <div className="map">
        {
          googleMap.mapApiLoaded && (
            <SearchBox map={googleMap.mapInstance} mapApi={googleMap.mapApi} setCoords={setCoords} />
          )
        }
        <DatePicker month={month} setMonth={setMonth} />
        <GoogleMap
          bootstrapURLKeys={{
              key: 'AIzaSyCauBiq568NmIOh1HuCYXqu9aUyI_PJmQQ',
              libraries: ['places', 'visualization', 'geometry'],
              }}
          defaultCenter={center}
          defaultZoom={zoom}
          options={getMapOptions}
          onChildClick={handleClick}
          // heatmapLibrary={true}
          // heatmap={{/*data*/}}
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          >
            {
              accidents
              .filter(accident => !month || accident.MONTH === getNumberedMonth(month))
              .map(accident => 
                <Marker 
                  lat={accident.LATITUDE} 
                  lng={accident.LONGITUD} 
                  name="My Marker" 
                  color="blue" 
                  key={accident.id} 
                  accident={accident}
                />
              )
            }
        </GoogleMap>
      </div>
    </section>
  );
}

export default SimpleMap;

