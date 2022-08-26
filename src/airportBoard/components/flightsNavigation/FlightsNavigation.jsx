import React from 'react';
import PropTypes from 'prop-types';
import DirectionNavigation from '../directionNavigation/DirectionNavigation';
import DateNavigation from '../dateNavigation/DateNavigation';

import './flightsNavigation.scss';

const FlightsNavigation = ({
  date,
  setDate,
  direction,
  setDirection,
  setSearchValue,
}) => {
  return (
    <div className="flights-navigation">
      <DirectionNavigation direction={direction} setDirection={setDirection} />
      <DateNavigation
        date={date}
        setDate={setDate}
        setSearchValue={setSearchValue}
      />
    </div>
  );
};

export default FlightsNavigation;

FlightsNavigation.propTypes = {
  date: PropTypes.string.isRequired,
  setDate: PropTypes.func.isRequired,
  direction: PropTypes.string.isRequired,
  setDirection: PropTypes.func.isRequired,
  setSearchValue: PropTypes.func.isRequired,
};
