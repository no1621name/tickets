import currencyUI, {CurrencyUI} from "./currency";
import favourites, {Favourites} from "../store/favourites";

class TicketsUI {
  private container: HTMLDivElement = document.querySelector('.tickets-sections .row');
  private getCurrencySymbol: () => string;
  private addFavourite: (ticket: Ticket) => void;

  constructor(currency: CurrencyUI, favoutites: Favourites){
    this.getCurrencySymbol = currency.getCurrencySymbol.bind(currencyUI);
    this.addFavourite = favourites.addToFavourites.bind(favourites);
  }

  renderTickets(tickets: Tickets): void{
    this.clearContainer();

    if(!tickets.length){
      this.showEmptyMsg();
      return;
    }

    let fragment = '';

    tickets.forEach((ticket: Ticket, ind: number) => {
      const template = TicketsUI.ticketTemplate(ticket, ind, this.getCurrencySymbol());
      fragment += template;
    });

    this.container.insertAdjacentHTML('afterbegin', fragment);

    const toFavoriteBtns: NodeList = document.querySelectorAll('.ticket-card .add-favourite-btn');
    toFavoriteBtns.forEach((btn: HTMLLIElement) => {
      btn.addEventListener('click', (e: MouseEvent) => {
        if(e.target instanceof HTMLElement){
          this.addFavourite(tickets[Number(e.target.dataset.ticketind)]);
        }
      });
    });
  }

  clearContainer(): void{
    this.container.innerHTML = '';
  }

  showEmptyMsg(): void{
    const template = TicketsUI.emptyMsgTemplate();
    this.container.insertAdjacentHTML('afterbegin', template);
  }

  static emptyMsgTemplate(): string {
    return `
    <div class="tickets-empty-res-msg">
      По вашему запросу билетов не найдено.
    </div>`;
  }

  static ticketTemplate(ticket: Ticket, ticketInd: number, symbol: string): string {
    const {
      airline_logo,
      airline_name,
      origin_name,
      destination_name,
      departure_at_formated,
      price,
      transfers,
      flight_number,
    } = ticket;
    return `
    <div class="col s12 m6">
      <div class="card ticket-card">
        <div class="ticket-airline d-flex a-items-center">
          <img
            src="${airline_logo}"
            class="ticket-airline-img"
          />
          <span class="ticket-airline-name"
            >${airline_name}</span
          >
        </div>
        <div class="ticket-destination d-flex a-items-center">
          <div class="d-flex a-items-center mr-auto">
            <span class="ticket-city">${origin_name} </span>
            <i class="medium material-icons">flight_takeoff</i>
          </div>
          <div class="d-flex a-items-center">
            <i class="medium material-icons">flight_land</i>
            <span class="ticket-city">${destination_name}</span>
          </div>
        </div>
        <div class="ticket-time-price d-flex a-items-center">
          <span class="ticket-time-departure">${departure_at_formated}</span>
          <span class="ticket-price ml-auto">${symbol}${price}</span>
        </div>
        <div class="ticket-additional-info">
          <span class="ticket-transfers">Пересадок: ${transfers}</span>
          <span class="ticket-flight-number">Номер рейса: ${flight_number}</span>
        </div>
        <a
          class="waves-effect waves-light btn pink accent-4 add-favourite-btn"
          data-ticketind="${ticketInd}"
        >Add to favourite</a>
      </div>
    </div>
    `;
  }
}

const ticketsUI: TicketsUI = new TicketsUI(currencyUI, favourites);
export default ticketsUI;