import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import './tableItem.scss';

const TableItem = ({ flight, index }) => {
  const { airline, actual, term, status, codeShareData } = flight;

  const destination = flight['airportToID.city_en']
    ? flight['airportToID.city_en']
    : flight['airportFromID.city_en'];

  const classNames =
    index % 2 === 1
      ? 'flights-table__flight flights-table__flight_odd'
      : 'flights-table__flight';

  let termColor;
  if (term === 'A') {
    termColor = '#63c745';
  } else if (term === 'B') {
    termColor = '#d16aae';
  } else termColor = '#1eb7ee';

  const termStyle = { color: termColor, borderColor: termColor };

  return (
    <tr className={classNames}>
      <td className="flights-table__element">
        <span className="terminal" style={termStyle}>
          {term}
        </span>
      </td>
      <td className="flights-table__element">
        {moment(new Date(actual)).format('h:mm a')}
      </td>
      <td className="flights-table__element">{destination}</td>
      <td className="flights-table__element">{status}</td>
      <td className="flights-table__element airline">
        <img
          className="airline__logo"
          src={airline.en.logoName}
          alt={airline.en.name}
        />
        {airline.en.name}
      </td>
      <td className="flights-table__element">{codeShareData[0].codeShare}</td>
    </tr>
  );
};

export default TableItem;

TableItem.propTypes = {
  flight: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};
