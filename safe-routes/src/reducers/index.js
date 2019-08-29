export const initialState = {
  coords: {
    lat: 40.776,
    lng: -73.956,
  },
  accidents: [],
  month: '',
  year: 2017,
  googleMap: {
    mapApiLoaded: false,
    mapInstance: null,
    mapApi: null,
  },
  isLoadingMarkers: false,
};

export const reducer = (state, action) => {
  switch(action.type) {
    case 'ACCIDENTS':
      return {
        ...state,
        accidents: action.payload,
      }
    case 'YEAR':
      return {
        ...state,
        year: action.payload,
      }
    case 'MONTH':
      return {
        ...state,
        month: action.payload,
      }
    case 'MAP':
      return {
        ...state,
        googleMap: action.payload,
      }
    case 'COORDS':
      return {
        ...state,
        coords: action.payload,
      }
    case 'START_LOADING':
      return {
        ...state,
        isLoadingMarkers: true,
      }
    case 'FINISH_LOADING':
      return {
        ...state,
        isLoadingMarkers: false,
      }
    default: 
      return state;
  }
};