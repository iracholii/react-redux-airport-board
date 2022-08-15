import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import store from './store';
import AirportBoard from './airportBoard/components/airportBoard/AirportBoard';

const App = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <AirportBoard />
      </HashRouter>
    </Provider>
  );
};

export default App;
