import moment from 'moment';
import {
  FLIGHTS_DATA_RECEIVED,
  FLIGHTS_DATE,
  FLIGHTS_DIRECTION,
  FLIGHTS_SEARCH_VALUE,
} from './airportBoard.actions';

const initialState = {
  flights: {
    arrival: [],
    departure: [],
  },
  date: moment(new Date()).format('YYYY-MM-DD'),
  direction: '',
  searchValue: '',
};

const airportBoardReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;

    case FLIGHTS_DATA_RECEIVED:
      return {
        ...state,
        flights: {
          arrival: action.payload.arrival,
          departure: action.payload.departure,
        },
      };

    case FLIGHTS_DATE:
      return {
        ...state,
        date: action.payload.flightsDate,
      };

    case FLIGHTS_DIRECTION:
      return {
        ...state,
        direction: action.payload.flightsDirection,
      };

    case FLIGHTS_SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.payload.flightsSearchValue,
      };
  }
};

export default airportBoardReducer;
