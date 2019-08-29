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
    setGoogleMap({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    })
  };

  const [coords, setCoords] = useState({
    lat: 40.776,
    lng: -73.956,
  });


  const [center, setCenter] = useState([coords.lat, coords.lng]);
  const [zoom, setZoom] = useState(14);
  const [accidents, setAccidents] = useState([]);
  const [month, setMonth] = useState();
  const [year, setYear] = useState(2017);

  const handleClick = (key) => {

    setAccidents(prevState => prevState.map( element => {
      if (element.id === Number(key)) {
        return {...element, show : !element.show}
      }
      else {
        return {...element, show: false};
      }
    }))
  }

  const getNumberedMonth = (mon) => {
    return new Date(Date.parse(mon + " 1, 2012")).getMonth() + 1;
  }

  const getConvertedData = (dataArray) => {

    const convertData = (data) => {
      let FUNC_SYS = 99;
      const { LATITUDE, LONGITUD, TWAY_ID, TWAY_ID2 } = data;
      
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
        LATITUDE,
        LONGITUD,
        TWAY_ID,
        TWAY_ID2,
        FUNC_SYS,
        RELJCT1,
      }
    }

    const newData = {};
    dataArray.forEach(data => newData[data.id] = convertData(data));
    return newData;
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post('https://protected-badlands-42757.herokuapp.com/api/accident/coords', {
          LATITUDE: coords.lat,
          LONGITUD: coords.lng,
        });
        const accidentsData = response.data;
        const likelihood = await axios.post('https://saferoutes-pred.herokuapp.com/api', getConvertedData(accidentsData));
        const likelihoodData = likelihood.data;
        accidentsData.forEach(accident => accident.LIKELIHOOD = likelihoodData[accident.id].LIKELIHOOD);
        setAccidents(accidentsData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [coords])

  const handleMapClick = () => {
    setAccidents(prevState => prevState.map( element => {
        return {...element, show: false};
    }))
  }

  return (
    <section className="map-container">
      <div className="map">
        {
          googleMap.mapApiLoaded && (
            <SearchBox map={googleMap.mapInstance} mapApi={googleMap.mapApi} setCoords={setCoords} />
          )
        }
        <DatePicker year={year} setYear={setYear} month={month} setMonth={setMonth} />
        <GoogleMap
          bootstrapURLKeys={{
              key: 'AIzaSyCauBiq568NmIOh1HuCYXqu9aUyI_PJmQQ',
              libraries: ['places', 'visualization', 'geometry'],
              }}
          defaultCenter={center}
          defaultZoom={zoom}
          options={getMapOptions}
          onClick={handleMapClick}
          onChildClick={handleClick}
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          >
            {
              accidents
              .filter(accident => accident.YEAR === year && (!month || accident.MONTH === getNumberedMonth(month)))
              .map(accident => 
                <Marker 
                  lat={accident.LATITUDE} 
                  lng={accident.LONGITUD}  
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

