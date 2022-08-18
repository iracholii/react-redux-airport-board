import React from 'react';
import DirectionNavigation from '../directionNavigation/DirectionNavigation';
import DateNavigation from '../dateNavigation/DateNavigation';

import './flightsNavigation.scss';

const FlightsNavigation = () => {
  return (
    <div className="flights-navigation">
      <DirectionNavigation />
      <DateNavigation />
    </div>
  );
};

export default FlightsNavigation;
