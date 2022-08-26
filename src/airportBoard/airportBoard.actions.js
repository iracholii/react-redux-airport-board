import { getFlights } from './gateway/gateway';

export const FLIGHTS_DATA_RECEIVED = 'FLIGHTS_DATA_RECEIVED';

export const flightsDataReceived = (arrival, departure) => {
  return {
    type: FLIGHTS_DATA_RECEIVED,
    payload: { arrival, departure },
  };
};

export const getFlightsData = (date) => (dispatch) => {
  getFlights(date).then((flights) => {
    dispatch(flightsDataReceived(flights.body.arrival, flights.body.departure));
  });
};
