import React, { useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';

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
  }, [map]);

  const clearSearchBox = () => {
    searchRef.value = '';
  }

  useEffect(() => {
    if (mapApi) {
      console.log('entered');
      const search = ReactDOM.findDOMNode(searchRef.current);
      const searchBox = new mapApi.places.Autocomplete(search);
      searchBox.addListener('place_changed', () => onPlaceChanged(searchBox.getPlace()));
      searchBox.bindTo('bounds', map);
      console.log('whoops');
      return () => {
        mapApi.event.clearInstanceListeners(searchBox);
      }
    }
  }, [map, mapApi, onPlaceChanged, searchRef])

  return (
    <input ref={searchRef} type="text" />
  )
}

export default SearchBox;