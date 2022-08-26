export const arrivalFlightsSelector = (state) =>
  state.airportBoard.flights.arrival;

export const departureFlightsSelector = (state) =>
  state.airportBoard.flights.departure;
