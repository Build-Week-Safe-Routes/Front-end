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

import React, { useState } from 'react';
import GoogleMap from 'google-map-react';
import Marker from './Marker';
import SearchBox from './SearchBox';

const SimpleMap = (props) => {
  const [googleMap, setGoogleMap] = useState({
    mapApiLoaded: false,
    mapInstance: null,
    mapApi: null,
  })

  const getMapOptions = (maps) => {
    return {
      disableDefaultUI: false,
      mapTypeControl: true,
      streetViewControl: true,
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

  const [lat, setLat] = useState(47.606358)
  const [lng, setLng] = useState(-122.332680)
  const [center, setCenter] = useState([lat, lng]);
  const [zoom, setZoom] = useState(11);

  return (
    <div style={{ height: '80vh', width: '100%' }}>
      {
        googleMap.mapApiLoaded && (
          <SearchBox map={googleMap.mapInstance} mapApi={googleMap.mapApi} />
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
          <Marker
              lat={lat}
              lng={lng}
              name="My Marker"
              color="blue"
          />
      </GoogleMap>
    </div>
  );
}

export default SimpleMap;

