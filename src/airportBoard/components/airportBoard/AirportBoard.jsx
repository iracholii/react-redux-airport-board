import React, { useEffect, useState } from 'react';
import { Switch, Route, Link, useLocation, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import qs from 'qs';
import PropTypes from 'prop-types';
import * as airportBoardActions from '../../airportBoard.actions';
import FlightsSearch from '../Search/Search';
import FlightsNavigation from '../flightsNavigation/FlightsNavigation';
import FlightsTable from '../flightsTable/FlightsTable';

import './airportBoard.scss';

const AirportBoard = ({
  direction,
  date,
  searchValue,
  arrivalFlights,
  departureFlights,
  updatingDirection,
  updatingDate,
  updatingSearchValue,
  getFilteredFlightsData,
}) => {
  const history = useHistory();
  const { search, pathname } = useLocation();

  useEffect(() => {
    if (search) {
      const paramsData = qs.parse(search, { ignoreQueryPrefix: true });
      if (paramsData.date) {
        updatingDate(paramsData.date);
      }
      if (paramsData.search) {
        updatingSearchValue(paramsData.search);
      }
    }

    updatingDirection(pathname.slice(1) ? pathname.slice(1) : 'departure');
  }, []);

  useEffect(() => {
    history.push(
      `/${direction}?date=${date}${searchValue ? `&search=${searchValue}` : ''}`
    );
  }, [date, searchValue, direction]);

  useEffect(() => {
    getFilteredFlightsData();
  }, [date, searchValue]);

  const flightsToRender =
    direction === 'departure' ? departureFlights : arrivalFlights;

  return (
    <div className="airport-board">
      <FlightsSearch />
      <div className="flights-information">
        <FlightsNavigation />

        <Switch>
          <Route path="/:flightParam">
            <FlightsTable flights={flightsToRender} />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    direction: state.airportBoard.direction,
    date: state.airportBoard.date,
    searchValue: state.airportBoard.searchValue,
    arrivalFlights: state.airportBoard.flights.arrival,
    departureFlights: state.airportBoard.flights.departure,
  };
};

const mapDispatch = {
  updatingDirection: airportBoardActions.flightsDirectionUpdated,
  updatingDate: airportBoardActions.flightsDateUpdated,
  updatingSearchValue: airportBoardActions.flightsSearchValueUpdated,
  getFilteredFlightsData: airportBoardActions.getFilteredFlightsData,
};

export default connect(mapState, mapDispatch)(AirportBoard);

AirportBoard.propTypes = {
  direction: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  searchValue: PropTypes.string.isRequired,
  arrivalFlights: PropTypes.array.isRequired,
  departureFlights: PropTypes.array.isRequired,
  updatingDirection: PropTypes.func.isRequired,
  updatingDate: PropTypes.func.isRequired,
  updatingSearchValue: PropTypes.func.isRequired,
  getFilteredFlightsData: PropTypes.func.isRequired,
};
