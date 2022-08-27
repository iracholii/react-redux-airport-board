import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const DayButton = ({ date, buttonDate, day, dayButtonClickHandler }) => {
  const classNames =
    date === buttonDate
      ? 'flights-navigation__date-day flights-navigation__date-day_active'
      : 'flights-navigation__date-day';

  return (
    <button
      className={classNames}
      data-day={buttonDate}
      onClick={dayButtonClickHandler}
    >
      <div>{moment(buttonDate).format('DD/MM/YY')}</div>
      <div>{day}</div>
    </button>
  );
};

export default DayButton;

DayButton.propTypes = {
  date: PropTypes.string.isRequired,
  buttonDate: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  dayButtonClickHandler: PropTypes.func.isRequired,
};
