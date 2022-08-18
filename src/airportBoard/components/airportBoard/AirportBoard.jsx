import React, { useEffect } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import qs from 'qs';
import PropTypes from 'prop-types';
import * as airportBoardActions from '../../airportBoard.actions';
import {
  directionSelector,
  dateSelector,
  searchValueSelector,
  arrivalFlightsSelector,
  departureFlightsSelector,
} from '../../airportBoard.selectors';
import FlightsSearch from '../flightsSearch/FlightsSearch';
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

    updatingDirection(
      pathname.slice(1) === 'arrival' ? 'arrival' : 'departure'
    );
  }, []);

  useEffect(() => {
    history.push(
      `/${direction}?date=${date}${searchValue ? `&search=${searchValue}` : ''}`
    );
  }, [date, searchValue, direction]);

  useEffect(() => {
    getFilteredFlightsData();
  }, [date, searchValue]);

  return (
    <div className="airport-board">
      <FlightsSearch />
      <div className="flights-information">
        <FlightsNavigation />

        <Switch>
          <Route path="/departure">
            <FlightsTable flights={departureFlights} />
          </Route>
          <Route path="/arrival">
            <FlightsTable flights={arrivalFlights} />
          </Route>
          <Route path="*">
            <h3>Something went wrong... Please reload the page</h3>
          </Route>
        </Switch>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    direction: directionSelector(state),
    date: dateSelector(state),
    searchValue: searchValueSelector(state),
    arrivalFlights: arrivalFlightsSelector(state),
    departureFlights: departureFlightsSelector(state),
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
