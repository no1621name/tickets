import locationInstance, {Locations} from '../../../src/ts/store/locations';
import {formatDate} from '../../../src/ts/helpers/date';
import api, {Api} from '../../../src/ts/services/apiService';
import apiConfig from '../../../src/ts/config/apiConfig';

import {
  countries,
  cities,
  airlines,
  searchResults,
  country
} from '../mocks/mockFiles';

//fake api
jest.mock('../../../src/ts/services/apiService', () => {
  const { countries, cities, airlines, pricesResponse } = require('../mocks/mockFiles');

  const mockApi = {
    countries: jest.fn(() => Promise.resolve(countries)),
    cities: jest.fn(() => Promise.resolve(cities)),
    airlines: jest.fn(() => Promise.resolve(airlines)),
    prices: jest.fn((params: ApiRequest) => Promise.resolve(pricesResponse))
  };

  return {
    Api: jest.fn(() => mockApi),
  };
});

const apiService = new Api(apiConfig);

describe('Location store test', () => {
  beforeEach(() => {
    locationInstance.countries = locationInstance.serializeCountries(countries);
    locationInstance.cities = locationInstance.serializeCities(cities);
    locationInstance.airlines = locationInstance.serializeAirlines(airlines);
  })

  it('Check locationInstance is instance of Location class', () => {
    expect(locationInstance).toBeInstanceOf(Locations);
  })
  it('Success locations instance create', () => {
    const instance: Locations = new Locations(api, {formatDate});

    expect(instance.countries).toBe(null);
    expect(instance.cities).toBe(null);
    expect(instance.airlines).toBe(null);
    expect(instance.shortCitiesList).toBe(null);
    expect(instance.lastSearch).toBe(null);
  })
  //init
  it('Check correct init method call', () => {
    const instance: Locations = new Locations(apiService, {formatDate});
    expect(instance.init()).resolves.toEqual([countries, cities, airlines]);
  })
  //countries
  it('Check correct countries serialize', () => {
    const res: Countries = locationInstance.serializeCountries(countries);
    const expectedData: Countries = {
      MT: country
    };

    expect(res).toEqual(expectedData);
  })
  it('Check countries serialize is incorrect data', () => {
    const res = locationInstance.serializeCountries(null);
    const expectedData: Countries = {};

    expect(res).toEqual(expectedData);
  })
  //cities
  it('Check correct cities serialize', () => {
    const res: Cities = locationInstance.serializeCities(cities);
    const expectedData: Cities = {
      KAN: {
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
        county_name: 'Мальта',
        fullname: 'Кано, Мальта',
      }
    };

    expect(res['KAN'].fullname).toBe('Кано, Мальта')
    expect(res).toEqual(expectedData);
  })
  it('Check cities serialize is incorrect data', () => {
    const res: Cities = locationInstance.serializeCities(null);
    const expectedData: Cities = {};

    expect(res).toEqual(expectedData);
  })
  // airlines
  it('Check correct airlines serialize ', () => {
    const res = locationInstance.serializeAirlines(airlines);
    const expected: Airlines = {
      AIR: {
        name: 'Airline',
        code: 'AIR',
        name_translations: {
          en: 'Airline'
        },
        is_lowcost: false,
        logo: 'http://pics.avs.io/200/200/AIR.png'
      }
    };

    expect(res['AIR'].name).toBe('Airline')
    expect(res).toEqual(expected);
  })
  it('Check airlines serialize is incorrect data', () => {
    const res: Airlines = locationInstance.serializeAirlines(null);
    const expectedData: Airlines = {};

    expect(res).toEqual(expectedData);
  })
  //short list
  it('Check correct creating short cities list', () => {
    const res: ShortCitiesList = locationInstance.createShortCitiesList(locationInstance.serializeCities(cities));
    const expected: ShortCitiesList = {
      'Кано, Мальта': null
    };

    expect(res).toEqual(expected);
  })
  it('Check creating short cities list is incorrect data', () => {
    const res: ShortCitiesList = locationInstance.createShortCitiesList(null);
    const expected: ShortCitiesList = {};

    expect(res).toEqual(expected)
  })
  //fetchTickets
  it('Check correct fetching tickets', async () => {
    const instance: Locations = new Locations(apiService, {formatDate});
    instance.countries = instance.serializeCountries(countries);
    instance.cities = instance.serializeCities(cities);
    instance.airlines = instance.serializeAirlines(airlines);

    await instance.fetchTickets({
      origin: 'KAN',
      destination: 'KAN',
      depart_date: '2022-07',
      return_date: '2022-07',
      currency: 'USD',
    });

    const res: Tickets = instance.lastSearch;
    const expected: Tickets = [
      {
        origin: 'KAN',
        destination: 'KAN',
        price: 1,
        airline: 'AIR',
        flight_number: 1,
        departure_at: '2022-07-21T00:20:00+03:00',
        return_at: '2022-08-09T22:55:00+03:00',
        transfers: 1,
        expires_at: '2022-07-22T13:00:47Z',
        origin_name: 'Кано',
        destination_name: 'Кано',
        airline_logo: 'http://pics.avs.io/200/200/AIR.png',
        airline_name: 'Airline',
        departure_at_formated: '21 Jul 2022 12:20',
        return_at_formated: '09 Aug 2022 10:55',
      }
    ];

    expect(res).toEqual(expected);
  })
  //tickets
  it('Check correct tickets serialize', () => {
    const res: Tickets = locationInstance.serializeTickets(searchResults);
    const expected: Tickets = [
      {
        origin: 'KAN',
        destination: 'KAN',
        price: 1,
        airline: 'AIR',
        flight_number: 1,
        departure_at: '2022-07-21T00:20:00+03:00',
        return_at: '2022-08-09T22:55:00+03:00',
        transfers: 1,
        expires_at: '2022-07-22T13:00:47Z',
        origin_name: 'Кано',
        destination_name: 'Кано',
        airline_logo: 'http://pics.avs.io/200/200/AIR.png',
        airline_name: 'Airline',
        departure_at_formated: '21 Jul 2022 12:20',
        return_at_formated: '09 Aug 2022 10:55',
      }
    ];

    expect(res).toEqual(expected);
  })
  //getters
  it('Check correct get country name by code', () => {
    expect(locationInstance.getCountryNameByCode('MT')).toBe('Мальта')
  })
  it('Check correct get city code by fullname', () => {
    expect(locationInstance.getCityCodeByFullname('Кано, Мальта')).toBe('KAN')
  })
  it('Check correct get city name by code', () => {
    expect(locationInstance.getCityNameByCode('KAN')).toBe('Кано')
  })
  it('Check correct get airline name by code', () => {
    expect(locationInstance.getAirlineNameByCode('AIR')).toBe('Airline')
  })
  it('Check correct get airline logo by code', () => {
    expect(locationInstance.getAirlineLogoByCode('AIR')).toBe('http://pics.avs.io/200/200/AIR.png')
  })
});