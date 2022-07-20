interface ApiConfig{
  url: string,
}

interface ApiResponce{
  currency: string,
  data: SearchResults,
  success: boolean,
}

interface ApiItem{
  name: string,
  code: string,
  name_translations: {
    [key: string]: string
  }
}

interface ApiRequest{
  origin: string,
  destination: string,
  depart_date: string,
  return_date: string,
  currency: string,
}


interface Country extends ApiItem{
  cases: {
    [key: string]: string
  },
  currency: string,
}

interface City extends ApiItem{
  country_code: string,
  county_name: string,
  fullname: string,
  time_zone: string,
  cases: {
    [key: string]: string
  },
  coordinates: {
    lat: number,
    lon: number,
  },
}

interface Airline extends ApiItem {
  is_lowcost: boolean,
  logo: string,
}

interface TicketSearchResult {
  origin: string,
  destination: string,
  price: number,
  airline: string,
  flight_number: number,
  departure_at: string,
  return_at: string,
  transfers: number,
  expires_at: string
}

interface Ticket extends TicketSearchResult{
  origin_name: string,
  destination_name: string,
  airline_logo: string,
  airline_name: string,
  departure_at_formated: string,
  return_at_formated: string,
}

type Countries = {
  [key: string]: Country,
};

type Cities = {
  [key: string]: City,
};

type ShortCitiesList = {
  [key: string]: null,
};

type Airlines = {
  [key: string]: Airline,
};

type SearchResults = {
  [key: string]: TicketSearchResult;
};

type Tickets = Ticket[];

type formatDate = (str: string, format: string) => string;