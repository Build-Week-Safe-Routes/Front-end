import React, { useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import './SearchBox.css';

const SearchBox = ({ map, mapApi }) => {
  const searchRef = React.createRef();

  const onPlaceChanged = useCallback((place) => {
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
    console.log('Lat', place.geometry.location.lat());
    console.log('Lng', place.geometry.location.lng());
  }, [map]);

  useEffect(() => {
    if (mapApi) {
      console.log('entered');
      const search = ReactDOM.findDOMNode(searchRef.current);
      const searchBox = new mapApi.places.Autocomplete(search);
      searchBox.addListener('place_changed', () => onPlaceChanged(searchBox.getPlace()));
      searchBox.bindTo('bounds', map);
      map.controls[mapApi.ControlPosition.TOP_CENTER].push(search);
      console.log('whoops');
      return () => {
        mapApi.event.clearInstanceListeners(searchBox);
      }
    }
  }, [map, mapApi, onPlaceChanged, searchRef])

  return (
    <input className="search-box" ref={searchRef} type="text" />
  )
}

export default SearchBox;