import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import * as airportBoardActions from '../../airportBoard.actions';
import { dateSelector } from '../../airportBoard.selectors';

const DateNavigation = ({ date, updatingDate }) => {
  const dateChangeHandler = (event) => {
    updatingDate(event.target.value);
  };

  const dayButtonClickHandler = (event) => {
    updatingDate(event.target.closest('button').dataset.day);
  };

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
  );
};

const mapState = (state) => {
  return {
    date: dateSelector(state),
  };
};

const mapDispatch = {
  updatingDate: airportBoardActions.flightsDateUpdated,
};

export default connect(mapState, mapDispatch)(DateNavigation);

DateNavigation.propTypes = {
  date: PropTypes.string.isRequired,
  updatingDate: PropTypes.func.isRequired,
};
