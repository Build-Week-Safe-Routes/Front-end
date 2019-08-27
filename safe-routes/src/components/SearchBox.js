import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './SearchBox.css';

const SearchBox = ({ map, mapApi, setCoords }) => {
  const searchRef = React.createRef();

  useEffect(() => {
    if (mapApi) {
      console.log('entered');

      const onPlaceChanged = (place) => {
        console.log('places-changed!');
    
        if (!place.geometry) {
          return;
        }
    
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17);
        }
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        console.log('Lat', lat);
        console.log('Lng', lng);
        setCoords({
          lat,
          lng,
        })
      };

      const search = ReactDOM.findDOMNode(searchRef.current);
      const searchBox = new mapApi.places.Autocomplete(search);
      searchBox.addListener('place_changed', () => onPlaceChanged(searchBox.getPlace()));
      searchBox.bindTo('bounds', map);
      map.controls[mapApi.ControlPosition.TOP_LEFT].push(search);
      console.log('exited');
      return () => {
        mapApi.event.clearInstanceListeners(searchBox);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <input className="search-box" ref={searchRef} type="text" />
  )
}

export default SearchBox;