import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import * as airportBoardActions from '../../airportBoard.actions';

import './flightsNavigation.scss';

const FlightsNavigation = ({
  direction,
  date,
  searchValue,
  updatingDirection,
  updatingDate,
}) => {
  const clickHandler = (event) => {
    updatingDirection(event.target.textContent.toLowerCase());
  };

  const dateChangeHandler = (event) => {
    updatingDate(event.target.value);
  };

  const dayButtonClickHandler = (event) => {
    updatingDate(event.target.closest('button').dataset.day);
  };

  const departureClassNames =
    direction === 'departure'
      ? 'button button_active flights-navigation__button'
      : 'button flights-navigation__button';

  const arrivalClassNames =
    direction === 'arrival'
      ? 'button button_active flights-navigation__button'
      : 'button flights-navigation__button';

  const yesterdayClassNames =
    date === moment().subtract(1, 'days').format('YYYY-MM-DD')
      ? 'flights-navigation__date-day flights-navigation__date-day_active'
      : 'flights-navigation__date-day';

  const todayClassNames =
    date === moment().format('YYYY-MM-DD')
      ? 'flights-navigation__date-day flights-navigation__date-day_active'
      : 'flights-navigation__date-day';

  const tomorrowClassNames =
    date === moment().add(1, 'days').format('YYYY-MM-DD')
      ? 'flights-navigation__date-day flights-navigation__date-day_active'
      : 'flights-navigation__date-day';

  return (
    <div className="flights-navigation">
      <div className="flights-navigation__direction">
        <Link
          to={`/departure?date=${date}${
            searchValue ? `&search=${searchValue}` : ''
          }`}
        >
          <button className={departureClassNames} onClick={clickHandler}>
            <i className="fa-solid fa-plane flights-navigation__icon flights-navigation__icon_departures" />
            Departure
          </button>
        </Link>
        <Link
          to={`/arrival?date=${date}${
            searchValue ? `&search=${searchValue}` : ''
          }`}
        >
          <button className={arrivalClassNames} onClick={clickHandler}>
            Arrival
            <i className="fa-solid fa-plane flights-navigation__icon flights-navigation__icon_arrivals" />
          </button>
        </Link>
      </div>

      <div className="flights-navigation__date">
        <div className="flights-navigation__date-calendar">
          <span className="flights-navigation__date-value">
            {moment(date).format('DD/MM/YYYY')}
          </span>

          <input
            className="flights-navigation__date-input"
            type="date"
            onChange={dateChangeHandler}
          />
        </div>
        <div className="flights-navigation__date-days">
          <button
            className={yesterdayClassNames}
            data-day={moment().subtract(1, 'days').format('YYYY-MM-DD')}
            onClick={dayButtonClickHandler}
          >
            <div>{moment().subtract(1, 'days').format('DD/MM/YY')}</div>
            <div>Yesterday</div>
          </button>

          <button
            className={todayClassNames}
            data-day={moment().format('YYYY-MM-DD')}
            onClick={dayButtonClickHandler}
          >
            <div>{moment().format('DD/MM/YY')}</div>
            <div>Today</div>
          </button>
          <button
            className={tomorrowClassNames}
            data-day={moment().add(1, 'days').format('YYYY-MM-DD')}
            onClick={dayButtonClickHandler}
          >
            <div>{moment().add(1, 'days').format('DD/MM/YY')}</div>
            <div>Tomorrow</div>
          </button>
        </div>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    direction: state.airportBoard.direction,
    date: state.airportBoard.date,
    searchValue: state.airportBoard.searchValue,
  };
};

const mapDispatch = {
  updatingDirection: airportBoardActions.flightsDirectionUpdated,
  updatingDate: airportBoardActions.flightsDateUpdated,
};

export default connect(mapState, mapDispatch)(FlightsNavigation);

FlightsNavigation.propTypes = {
  direction: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  searchValue: PropTypes.string.isRequired,
  updatingDirection: PropTypes.func.isRequired,
  updatingDate: PropTypes.func.isRequired,
};
