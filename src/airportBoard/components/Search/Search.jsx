import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as airportBoardActions from '../../airportBoard.actions';

import './search.scss';

const Search = ({ direction, date, searchValue, updatingSearchValue }) => {
  const [inputValue, setInputValue] = useState(searchValue);

  const changeHandler = (event) => {
    setInputValue(event.target.value);
  };

  const searchFlightsHandler = () => {
    updatingSearchValue(inputValue);
    setInputValue('');
  };

  return (
    <div className="flights-search">
      <h1 className="flights-search__header">Search flight</h1>
      <div className="flights-search__container">
        <i className="fa-solid fa-magnifying-glass flights-search__icon" />
        <input
          className="flights-search__input"
          type="text"
          placeholder="Airline, destination or flight #"
          value={inputValue}
          onChange={changeHandler}
        />
      </div>

      <Link
        to={`/${direction}?date=${date}${
          searchValue ? `&search=${searchValue}` : ''
        }`}
      >
        <button
          className="button flights-search__button"
          onClick={searchFlightsHandler}
        >
          Search
        </button>
      </Link>
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
  updatingSearchValue: airportBoardActions.flightsSearchValueUpdated,
};

export default connect(mapState, mapDispatch)(Search);

Search.propTypes = {
  direction: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  searchValue: PropTypes.string.isRequired,
  updatingSearchValue: PropTypes.func.isRequired,
};
