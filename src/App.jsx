import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';
import AirportBoard from './airportBoard/components/airportBoard/AirportBoard';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AirportBoard />
      </Router>
    </Provider>
  );
};

export default App;
