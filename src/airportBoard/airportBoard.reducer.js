import { FLIGHTS_DATA_RECEIVED } from './airportBoard.actions';

const initialState = {
  flights: {
    arrival: [],
    departure: [],
  },
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
  }
};

export default airportBoardReducer;
