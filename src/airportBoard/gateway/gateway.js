import moment from 'moment';

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
