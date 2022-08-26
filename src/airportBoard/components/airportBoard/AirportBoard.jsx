import React, { useEffect, useState } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import qs from 'qs';
import moment from 'moment';
import PropTypes from 'prop-types';
import * as airportBoardActions from '../../airportBoard.actions';
import {
  arrivalFlightsSelector,
  departureFlightsSelector,
} from '../../airportBoard.selectors';
import FlightsSearch from '../flightsSearch/FlightsSearch';
import FlightsNavigation from '../flightsNavigation/FlightsNavigation';
import FlightsTable from '../flightsTable/FlightsTable';

import './airportBoard.scss';

const AirportBoard = ({ arrivalFlights, departureFlights, getFlightsData }) => {
  const [direction, setDirection] = useState('');
  const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [searchValue, setSearchValue] = useState('');

  const history = useHistory();
  const { search, pathname } = useLocation();

  useEffect(() => {
    if (search) {
      const paramsData = qs.parse(search, { ignoreQueryPrefix: true });
      if (paramsData.date) {
        setDate(paramsData.date);
      }
      if (paramsData.search) {
        setSearchValue(paramsData.search);
      }
    }

    setDirection(pathname.slice(1) === 'arrival' ? 'arrival' : 'departure');
  }, []);

  useEffect(() => {
    history.push(
      `/${direction}?date=${date}${searchValue ? `&search=${searchValue}` : ''}`
    );
  }, [date, searchValue, direction]);

  useEffect(() => {
    getFlightsData(date);
  }, [date]);

  const filterFlights = (flights) => {
    return flights.filter((flight) => {
      const city = flight['airportToID.city_en']
        ? flight['airportToID.city_en']
        : flight['airportFromID.city_en'];

      return (
        city.toLowerCase().includes(searchValue) ||
        flight.airline.en.name.toLowerCase().includes(searchValue) ||
        flight.codeShareData[0].codeShare.toLowerCase().includes(searchValue)
      );
    });
  };

  return (
    <div className="airport-board">
      <FlightsSearch setSearchValue={setSearchValue} />
      <div className="flights-information">
        <FlightsNavigation
          date={date}
          setDate={setDate}
          direction={direction}
          setDirection={setDirection}
          setSearchValue={setSearchValue}
        />

        <Switch>
          <Route path="/departure">
            <FlightsTable flights={filterFlights(departureFlights)} />
          </Route>
          <Route path="/arrival">
            <FlightsTable flights={filterFlights(arrivalFlights)} />
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
    arrivalFlights: arrivalFlightsSelector(state),
    departureFlights: departureFlightsSelector(state),
  };
};

const mapDispatch = {
  getFlightsData: airportBoardActions.getFlightsData,
};

export default connect(mapState, mapDispatch)(AirportBoard);

AirportBoard.propTypes = {
  arrivalFlights: PropTypes.array.isRequired,
  departureFlights: PropTypes.array.isRequired,
  getFlightsData: PropTypes.func.isRequired,
};
