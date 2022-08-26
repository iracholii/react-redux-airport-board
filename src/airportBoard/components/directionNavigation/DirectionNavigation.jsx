import React from 'react';
import PropTypes from 'prop-types';

const DirectionNavigation = ({ direction, setDirection }) => {
  const clickHandler = (event) => {
    setDirection(event.target.textContent.toLowerCase());
  };

  const getClassNames = (buttonDirection) => {
    return direction === buttonDirection
      ? 'button button_active flights-navigation__button'
      : 'button flights-navigation__button';
  };

  return (
    <div className="flights-navigation__direction">
      <button className={getClassNames('departure')} onClick={clickHandler}>
        <i className="fa-solid fa-plane flights-navigation__icon flights-navigation__icon_departures" />
        Departure
      </button>

      <button className={getClassNames('arrival')} onClick={clickHandler}>
        Arrival
        <i className="fa-solid fa-plane flights-navigation__icon flights-navigation__icon_arrivals" />
      </button>
    </div>
  );
};

export default DirectionNavigation;

DirectionNavigation.propTypes = {
  direction: PropTypes.string.isRequired,
  setDirection: PropTypes.func.isRequired,
};
