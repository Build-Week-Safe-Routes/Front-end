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
    lat: 47.606358,
    lng: -122.332680,
  });
  const [center, setCenter] = useState([coords.lat, coords.lng]);
  const [zoom, setZoom] = useState(11);
  const [accidents, setAccidents] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.post('https://protected-badlands-42757.herokuapp.com/api/accident/coords', {
        LATITUDE: coords.lat,
        LONGITUD: coords.lng,
      });
      console.log(response);
      setAccidents(response.data);
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
        <GoogleMap
          bootstrapURLKeys={{
              key: 'AIzaSyCauBiq568NmIOh1HuCYXqu9aUyI_PJmQQ',
              libraries: ['places', 'visualization', 'geometry'],
              }}
          defaultCenter={center}
          defaultZoom={zoom}
          options={getMapOptions}    
          // heatmapLibrary={true}
          // heatmap={{/*data*/}}
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          >
            {
              accidents.map(accident => <Marker lat={accident.LATITUDE} lng={accident.LONGITUD} name="My Marker" color="blue" key={accident.id} />)
            }
        </GoogleMap>
      </div>
    </section>
  );
}

export default SimpleMap;

