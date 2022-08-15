import { getFlights } from './gateway/gateway';

export const FLIGHTS_DATE = 'FLIGHTS_DATE';
export const FLIGHTS_DIRECTION = 'FLIGHTS_DIRECTION';
export const FLIGHTS_SEARCH_VALUE = 'FLIGHTS_SEARCH_VALUE';
export const FLIGHTS_DATA_RECEIVED = 'FLIGHTS_DATA_RECEIVED';

export const flightsDateUpdated = (flightsDate) => {
  return {
    type: FLIGHTS_DATE,
    payload: { flightsDate },
  };
};

export const flightsDirectionUpdated = (flightsDirection) => {
  return {
    type: FLIGHTS_DIRECTION,
    payload: { flightsDirection },
  };
};

export const flightsSearchValueUpdated = (flightsSearchValue) => {
  return {
    type: FLIGHTS_SEARCH_VALUE,
    payload: { flightsSearchValue },
  };
};

export const flightsDataReceived = (arrival, departure) => {
  return {
    type: FLIGHTS_DATA_RECEIVED,
    payload: { arrival, departure },
  };
};

export const getFilteredFlightsData = () => (dispatch, getState) => {
  const state = getState();
  const { searchValue, date } = state.airportBoard;

  getFlights(date).then((flights) => {
    let arrival;
    let departure;

    if (searchValue === '') {
      arrival = flights.body.arrival;
      departure = flights.body.departure;
    } else {
      arrival = flights.body.arrival.filter((flight) => {
        return (
          flight['airportFromID.city_en']
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          flight.airline.en.name
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          flight.codeShareData[0].codeShare
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        );
      });

      departure = flights.body.departure.filter((flight) => {
        return (
          flight['airportToID.city_en']
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          flight.airline.en.name
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          flight.codeShareData[0].codeShare
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        );
      });
    }

    dispatch(flightsDataReceived(arrival, departure));
  });
};
