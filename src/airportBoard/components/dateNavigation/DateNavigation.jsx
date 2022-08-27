import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import DayButton from './DayButton';

const DateNavigation = ({ date, setDate, setSearchValue }) => {
  const dateChangeHandler = (event) => {
    setDate(event.target.value);
    setSearchValue('');
  };

  const dayButtonClickHandler = (event) => {
    setDate(event.target.closest('button').dataset.day);
    setSearchValue('');
  };

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
        <DayButton
          date={date}
          buttonDate={moment().subtract(1, 'days').format('YYYY-MM-DD')}
          day="Yesterday"
          dayButtonClickHandler={dayButtonClickHandler}
        />
        <DayButton
          date={date}
          buttonDate={moment().format('YYYY-MM-DD')}
          day="Today"
          dayButtonClickHandler={dayButtonClickHandler}
        />
        <DayButton
          date={date}
          buttonDate={moment().add(1, 'days').format('YYYY-MM-DD')}
          day="Tomorrow"
          dayButtonClickHandler={dayButtonClickHandler}
        />
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
