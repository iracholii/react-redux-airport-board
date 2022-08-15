import moment from 'moment';

// const baseUrl = 'https://api.iev.aero/api/flights/04-05-2020';

const baseUrl = 'https://api.iev.aero/api/flights';

export const getFlights = (date) => {
  const formattedDate = moment(new Date(date)).format('DD-MM-YYYY');
  return fetch(`${baseUrl}/${formattedDate}`).then((response) => {
    if (!response.ok) {
      throw new Error("Internal Server Error. Can't display flights");
    }
    return response.json();
  });
};

export const testDataDeparture = [
  {
    id: 1,
    terminal: 'A',
    localTime: '12:30',
    destination: 'Lviv',
    status: 'landed',
    airline: 'some airline',
    flight: 'WE1414',
  },
  {
    id: 2,
    terminal: 'A',
    localTime: '0:25',
    destination: 'Lviv',
    status: 'landed',
    airline: 'LOT',
    flight: 'WE7814',
  },
  {
    id: 3,
    terminal: 'D',
    localTime: '2:02',
    destination: 'Kyiv',
    status: 'landed',
    airline: 'Wizz Air',
    flight: 'TG1414',
  },
];

export const testDataArrival = [
  {
    id: 1,
    terminal: 'D',
    localTime: '10:30',
    destination: 'Kyiv',
    status: 'landed',
    airline: 'LOT',
    flight: '444TY5',
  },
  {
    id: 2,
    terminal: 'B',
    localTime: '7:04',
    destination: 'Lviv',
    status: 'landed',
    airline: 'Wizz Air',
    flight: 'O5599U',
  },
  {
    id: 3,
    terminal: 'A',
    localTime: '9:12',
    destination: 'Lviv',
    status: 'landed',
    airline: 'Wizz Air',
    flight: '77RT11',
  },
];
