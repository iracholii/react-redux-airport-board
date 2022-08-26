import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './flightsSearch.scss';

const FlightsSearch = ({ setSearchValue }) => {
  const [inputValue, setInputValue] = useState('');

  const changeHandler = (event) => {
    setInputValue(event.target.value);
  };

  const searchFlightsHandler = () => {
    setSearchValue(inputValue.toLowerCase());
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

export default FlightsSearch;

FlightsSearch.propTypes = {
  setSearchValue: PropTypes.func.isRequired,
};
