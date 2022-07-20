import axios, { AxiosResponse } from 'axios';
import config from '../config/apiConfig';

export class Api {
  private url: string;

  constructor(config: ApiConfig){
    this.url = config.url;
  }

  async countries(): Promise<Country[]> {
    try{
      const res: AxiosResponse = await axios.get(`${this.url}/countries`);
      return res.data;
    } catch(err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  async cities(): Promise<City[]> {
    try{
      const res: AxiosResponse = await axios.get(`${this.url}/cities`);
      return res.data;
    } catch(err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  async airlines(): Promise<Airline[]>{
    try{
      const res: AxiosResponse = await axios.get(`${this.url}/airlines`);
      return res.data;
    } catch(err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  async prices(params: ApiRequest): Promise<ApiResponce> {
    try{
      const res: AxiosResponse = await axios.get(`${this.url}/prices/cheap`, {
        params,
      });
      return res.data;
    } catch(err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
};

const api: Api = new Api(config);
export default api;