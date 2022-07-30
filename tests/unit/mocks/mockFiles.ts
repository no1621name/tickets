export const countries: Country[] = [
  {
    code:'MT',
    name:'Мальта',
    currency:'EUR',
    name_translations:{
      'en':'Malta'
    },
    cases:{
      da:'Мальте',
      pr:'Мальте',
      ro:'Мальты',
      su:'Мальта',
      tv:'Мальтой',
      vi:'на Мальту'
    }
  }
];

export const country: Country = countries[0];

export const cities: Partial<City>[] = [
  {
    country_code:'MT',
    code:'KAN',
    coordinates:{
      lat:12.045549,
      lon:8.522271
    },
    name:'Кано',
    time_zone:'Africa/Lagos',
    name_translations:{
      en:'Kano'
    },
    cases:{
      da:'Кано',
      pr:'Кано',
      ro:'Кано',
      su:'Кано',
      tv:'Кано',
      vi:'в Кано'
    },
  }
];

export const city: Partial<City> = cities[0];

export const airlines: Partial<Airline>[] = [
  {
    name: 'Airline',
    code: 'AIR',
    name_translations: {
      en: 'Airline'
    },
    is_lowcost: false,
  }
];

export const airline: Partial<Airline> = airlines[0];

export const searchResults: SearchResults = {
  '2022-07-22': {
    origin: 'KAN',
    destination: 'KAN',
    price: 1,
    airline: 'AIR',
    flight_number: 1,
    departure_at: '2022-07-21T00:20:00+03:00',
    return_at: '2022-08-09T22:55:00+03:00',
    transfers: 1,
    expires_at: '2022-07-22T13:00:47Z'
  }
};

export const pricesResponse = {
  currency: 'USD',
  data: {
    '2022-07-22': {
      origin: 'KAN',
      destination: 'KAN',
      price: 1,
      airline: 'AIR',
      flight_number: 1,
      departure_at: '2022-07-21T00:20:00+03:00',
      return_at: '2022-08-09T22:55:00+03:00',
      transfers: 1,
      expires_at: '2022-07-22T13:00:47Z'
    }
  },
  success: true,
};

export const correctPricesResponseParams = {
  origin: 'MOW',
  destination: 'ARH',
  depart_date: '2022-07',
  return_date: '2022-07',
  currency: 'USD',
};

export const pricesResponseParams = {
  origin: 'MOW',
  destination: 'ARH',
  depart_date: '2022-07',
  return_date: '2022-07',
  currency: 'USD',
};