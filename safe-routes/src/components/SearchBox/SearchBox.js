import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './SearchBox.css';

const SearchBox = ({ map, mapApi, setCoords, isLoading }) => {
  const searchRef = React.createRef();

  useEffect(() => {
    if (mapApi) {

      const getMapBounds = () => {
        const bounds = new mapApi.LatLngBounds();
        bounds.extend(new mapApi.LatLng(40, -74.5));
        bounds.extend(new mapApi.LatLng(41.5,-72));
        return bounds;
      }

      const onPlaceChanged = (place) => {
    
        if (!place.geometry) {
          return;
        }
  
        map.setCenter(place.geometry.location);
        map.setZoom(14);
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setCoords({
          lat,
          lng,
        })
      };

      const search = ReactDOM.findDOMNode(searchRef.current);
      const options = {
        strictBounds: true,
        bounds: getMapBounds(),
      }
      const searchBox = new mapApi.places.Autocomplete(search, options);
      searchBox.addListener('place_changed', () => onPlaceChanged(searchBox.getPlace()));
      map.controls[mapApi.ControlPosition.TOP_LEFT].push(search);
      return () => {
        mapApi.event.clearInstanceListeners(searchBox);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <input disabled={isLoading} className="search-box" ref={searchRef} type="text" />
  )
}

export default SearchBox;