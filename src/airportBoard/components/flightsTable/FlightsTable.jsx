import React from 'react';
import PropTypes from 'prop-types';
import TableItem from '../tableItem/TableItem';
import NoFlights from '../noFlights/NoFlights';

import './flightsTable.scss';

const FlightsTable = ({ flights }) => {
  return flights.length === 0 ? (
    <NoFlights />
  ) : (
    <table className="flights-table">
      <thead className="flights-table__header">
        <tr>
          <th className="flights-table__element">Terminal</th>
          <th className="flights-table__element">Local time</th>
          <th className="flights-table__element">Destination</th>
          <th className="flights-table__element">Status</th>
          <th className="flights-table__element">Airline</th>
          <th className="flights-table__element">Flight</th>
        </tr>
      </thead>
      <tbody className="flights-table__flights">
        {flights.map((flight, index) => (
          <TableItem key={flight.ID} index={index} flight={flight} />
        ))}
      </tbody>
    </table>
  );
};

export default FlightsTable;

FlightsTable.propTypes = {
  flights: PropTypes.array.isRequired,
};
