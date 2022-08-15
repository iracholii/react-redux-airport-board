import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import AirportBoard from './airportBoard/components/airportBoard/AirportBoard';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AirportBoard />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
