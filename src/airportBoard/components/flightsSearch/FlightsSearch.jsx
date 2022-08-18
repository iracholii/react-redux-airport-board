import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as airportBoardActions from '../../airportBoard.actions';

import './flightsSearch.scss';

const Search = ({ updatingSearchValue }) => {
  const [inputValue, setInputValue] = useState('');

  const changeHandler = (event) => {
    setInputValue(event.target.value);
  };

  const searchFlightsHandler = () => {
    updatingSearchValue(inputValue.toLowerCase());
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

      <button
        className="button flights-search__button"
        onClick={searchFlightsHandler}
      >
        Search
      </button>
    </div>
  );
};

const mapDispatch = {
  updatingSearchValue: airportBoardActions.flightsSearchValueUpdated,
};

export default connect(null, mapDispatch)(Search);

Search.propTypes = {
  updatingSearchValue: PropTypes.func.isRequired,
};
