import api, {Api} from '../../../src/ts/services/apiService';
import apiConfig from '../../../src/ts/config/apiConfig';
import axios from 'axios';
import MockAdaprter from 'axios-mock-adapter';

import {
  country,
  city,
  airline,
  correctPricesResponseParams,
  pricesResponseParams
} from '../mocks/mockFiles';

const mock = new MockAdaprter(axios);


describe('Tets API service', () => {
  // instance
  it('Check api is instance of Api class', () => {
    expect(api).toBeInstanceOf(Api);
  })
  //countries
  it('Success fetch countries', async () => {
    mock.onGet(`${apiConfig.url}/countries`).reply(200, country);

    await expect(api.countries()).resolves.toEqual(country);
  })
  it('Fetch countries error', async () => {
    mock.onGet(`${apiConfig.url}/countries`).reply(404);

    await expect(api.countries()).rejects.toThrowError();
  })
  //cities
  it('Success fetch cities', async () => {
    mock.onGet(`${apiConfig.url}/cities`).reply(200, city);

    await expect(api.cities()).resolves.toEqual(city);
  })
  it('Fetch cities error', async () => {
    mock.onGet(`${apiConfig.url}/cities`).reply(404);

    await expect(api.cities()).rejects.toThrowError();
  })
  //airlines
  it('Success fetch airlines', async () => {
    mock.onGet(`${apiConfig.url}/airlines`).reply(200, airline);

    await expect(api.airlines()).resolves.toEqual(airline);
  })
  it('Fetch airlines error', async () => {
    mock.onGet(`${apiConfig.url}/airlines`).reply(404);

    await expect(api.airlines()).rejects.toThrowError();
  })
  //prices
  it('Success fetch pices', async () => {
    mock.onGet(`${apiConfig.url}/prices/cheap`).reply((config) => {
      if(JSON.stringify(config.params) === JSON.stringify(correctPricesResponseParams)) {
        return [200, {
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
        }];
      } else {
        return [404];
      }
    });

    await expect(api.prices(pricesResponseParams)).resolves.toEqual({
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
    });

    expect((await api.prices(pricesResponseParams)).data).toEqual({
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
    });

    expect((await api.prices(pricesResponseParams)).currency).toBe('USD');

    expect((await api.prices(pricesResponseParams)).success).toBe(true);
  })
  it('Fetch prices error', async () => {
    mock.onGet(`${apiConfig.url}/prices/cheap`).reply(404)

    await expect(api.prices(pricesResponseParams)).rejects.toThrowError();
  })
})