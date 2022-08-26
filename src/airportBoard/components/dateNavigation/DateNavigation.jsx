import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const DateNavigation = ({ date, setDate, setSearchValue }) => {
  const dateChangeHandler = (event) => {
    setDate(event.target.value);
    setSearchValue('');
  };

  const dayButtonClickHandler = (event) => {
    setDate(event.target.closest('button').dataset.day);
    setSearchValue('');
  };

  const getClassNames = (day) => {
    return date === day
      ? 'flights-navigation__date-day flights-navigation__date-day_active'
      : 'flights-navigation__date-day';
  };

  const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
  const today = moment().format('YYYY-MM-DD');
  const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');

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
          className={getClassNames(yesterday)}
          data-day={yesterday}
          onClick={dayButtonClickHandler}
        >
          <div>{moment(yesterday).format('DD/MM/YY')}</div>
          <div>Yesterday</div>
        </button>

        <button
          className={getClassNames(today)}
          data-day={today}
          onClick={dayButtonClickHandler}
        >
          <div>{moment(today).format('DD/MM/YY')}</div>
          <div>Today</div>
        </button>

        <button
          className={getClassNames(tomorrow)}
          data-day={tomorrow}
          onClick={dayButtonClickHandler}
        >
          <div>{moment(tomorrow).format('DD/MM/YY')}</div>
          <div>Tomorrow</div>
        </button>
      </div>
    </div>
  );
};

export default DateNavigation;

DateNavigation.propTypes = {
  date: PropTypes.string.isRequired,
  setDate: PropTypes.func.isRequired,
  setSearchValue: PropTypes.func.isRequired,
};
