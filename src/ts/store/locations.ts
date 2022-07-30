import api, {Api} from '../services/apiService';
import { formatDate } from '../helpers/date';

export class Locations{
  private api: Api;
  private formatDate: formatDate = () => '';
  public countries: Countries = null;
  public cities: Cities = null;
  public airlines: Airlines = null;
  public shortCitiesList: ShortCitiesList = null;
  public lastSearch: Tickets = null;

  constructor(api: Api, helpers: any){
    this.api = api;
    this.formatDate = helpers.formatDate;
  }

  async init(): Promise<[Country[], City[], Airline[]]>{
    const res: [Country[], City[], Airline[]]= await Promise.all([
      this.api.countries(),
      this.api.cities(),
      this.api.airlines(),
    ]);

    const [countries, cities, airlines] = res;
    this.countries = this.serializeCountries(countries);
    this.cities = this.serializeCities(cities);
    this.airlines = this.serializeAirlines(airlines);
    this.shortCitiesList = this.createShortCitiesList(this.cities);

    return res;
  }

  serializeCountries(countries: any[]): Countries {
    if(!Array.isArray(countries) || !countries.length) { return {} }

    return countries.reduce((acc: object, country: any) => {
      Object.defineProperties(acc, {
        [country.code]: {
          value: country,
          enumerable: true,
        }
      });
      return acc;
    }, {});
  }

  serializeCities(cities: any[]): Cities {
    if(!Array.isArray(cities) || !cities.length) { return {} }

    return cities.reduce((acc: object, city: any) => {
      const county_name: string = this.getCountryNameByCode(city.country_code);
      const fullname: string = `${city.name||city.name_translations.en}, ${county_name}`;
      Object.defineProperties(acc, {
        [city.code]: {
          value: {
            ...city,
            county_name,
            fullname,
          },
          configurable: true,
          enumerable: true,
        }
      });
      return acc;
    }, {});
  }

  serializeAirlines(airlines: any[]): Airlines{
    if(!Array.isArray(airlines) || !airlines.length) { return {} }

    return airlines.reduce((acc: object, airline: any) => {
      const airlineCopy = { ...airline }
      airlineCopy.logo = `http://pics.avs.io/200/200/${airlineCopy.code}.png`
      airlineCopy.name = airlineCopy.name || airlineCopy.name_translations.en;
      Object.defineProperties(acc, {
        [airlineCopy.code]: {
          value: airlineCopy,
          enumerable: true,
        }
      });
      return acc;
    }, {})
  }

  createShortCitiesList(cities: Cities): ShortCitiesList{
    if(!(cities instanceof Object)) { return {} }

    return Object.keys(cities).reduce((acc: any, cityCode: keyof Cities) => {
      Object.defineProperties(acc, {
        [cities[cityCode].fullname]: {
          value: null,
          enumerable: true,
        }
      });
      return acc;
    }, {});
  }

  async fetchTickets(params: ApiRequest): Promise<void>{
    const res: ApiResponce = await this.api.prices(params);
    this.lastSearch = this.serializeTickets(res.data);
  }

  serializeTickets(tickets: SearchResults): Tickets{
    return Object.values(tickets).map((ticket: TicketSearchResult) => {
      return {
        ...ticket,
        origin_name: this.getCityNameByCode(ticket.origin),
        destination_name: this.getCityNameByCode(ticket.destination),
        airline_logo: this.getAirlineLogoByCode(ticket.airline),
        airline_name: this.getAirlineNameByCode(ticket.airline),
        departure_at_formated: this.formatDate(ticket.departure_at, 'dd MMM yyyy hh:mm'),
        return_at_formated: this.formatDate(ticket.return_at, 'dd MMM yyyy hh:mm'),
      }
    })
  }

  getCountryNameByCode(code: keyof Countries): string {
    return this.countries[code].name;
  }

  getCityCodeByFullname(fullname: keyof ShortCitiesList): string{
    return Object.values(this.cities).find((city: City) => city.fullname === fullname).code;
  }

  getCityNameByCode(code: keyof Cities): string{
    return this.cities[code].name;
  }

  getAirlineNameByCode(code: keyof Airlines): string{
    return this.airlines[code] ? this.airlines[code].name : '';
  }

  getAirlineLogoByCode(code: keyof Airlines): string{
    return this.airlines[code] ? this.airlines[code].logo : '';
  }
};

const locations: Locations = new Locations(api, { formatDate });
export default locations;