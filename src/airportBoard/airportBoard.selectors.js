export const directionSelector = (state) => state.airportBoard.direction;

export const dateSelector = (state) => state.airportBoard.date;

export const searchValueSelector = (state) => state.airportBoard.searchValue;

export const arrivalFlightsSelector = (state) =>
  state.airportBoard.flights.arrival;

export const departureFlightsSelector = (state) =>
  state.airportBoard.flights.departure;
