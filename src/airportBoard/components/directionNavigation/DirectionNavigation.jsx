import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as airportBoardActions from '../../airportBoard.actions';
import { directionSelector } from '../../airportBoard.selectors';

const DirectionNavigation = ({ direction, updatingDirection }) => {
  const clickHandler = (event) => {
    updatingDirection(event.target.textContent.toLowerCase());
  };

  const departureClassNames =
    direction === 'departure'
      ? 'button button_active flights-navigation__button'
      : 'button flights-navigation__button';

  const arrivalClassNames =
    direction === 'arrival'
      ? 'button button_active flights-navigation__button'
      : 'button flights-navigation__button';

  return (
    <div className="flights-navigation__direction">
      <button className={departureClassNames} onClick={clickHandler}>
        <i className="fa-solid fa-plane flights-navigation__icon flights-navigation__icon_departures" />
        Departure
      </button>

      <button className={arrivalClassNames} onClick={clickHandler}>
        Arrival
        <i className="fa-solid fa-plane flights-navigation__icon flights-navigation__icon_arrivals" />
      </button>
    </div>
  );
};

const mapState = (state) => {
  return {
    direction: directionSelector(state),
  };
};

const mapDispatch = {
  updatingDirection: airportBoardActions.flightsDirectionUpdated,
};

export default connect(mapState, mapDispatch)(DirectionNavigation);

DirectionNavigation.propTypes = {
  direction: PropTypes.string.isRequired,
  updatingDirection: PropTypes.func.isRequired,
};
