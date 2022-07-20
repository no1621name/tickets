import currencyUI, {CurrencyUI} from "./currency";
import favourites, {Favourites} from "../store/favourites";

class FavouritesUI {
  private dropdown: HTMLDivElement = document.querySelector('#dropdown1');
  private getCurrencySymbol: () => string;
  private deleteFavourite: (ind: number) => void;
  private favouritesList: Tickets;

  constructor(currency: CurrencyUI, favoutites: Favourites){
    this.getCurrencySymbol = currency.getCurrencySymbol.bind(currencyUI);
    this.favouritesList = favourites.favouritesList;
    this.deleteFavourite = favourites.deleteFavourite;
  }

  renderTickets(btn: HTMLLinkElement): void{
    this.clearContainer();

    if(!this.favouritesList.length){
      this.showEmptyMsg();
      const instance: M.Dropdown = M.Dropdown.getInstance(btn);
      instance.close();
      instance.open();
      return;
    }

    let fragment: string = '';

    this.favouritesList.forEach((favourite: Ticket, ind: number) => {
      const template = FavouritesUI.ticketTemplate(favourite, ind, this.getCurrencySymbol());
      fragment += template;
    });

    this.dropdown.insertAdjacentHTML('afterbegin', fragment);

    const deleteFavouriteBtns: NodeList = document.querySelectorAll('.favorite-item-info .delete-favorite');
    deleteFavouriteBtns.forEach((btn: HTMLLIElement) => {
      btn.addEventListener('click', (e: MouseEvent) => {
        if(e.target instanceof HTMLElement){
          this.deleteFavourite(Number(e.target.dataset.favouriteind));
        }
      });
    });
  }

  clearContainer(): void{
    this.dropdown.innerHTML = '';
  }

  showEmptyMsg(): void{
    const template = FavouritesUI.emptyMsgTemplate();
    this.dropdown.insertAdjacentHTML('beforeend', template);
  }

  static emptyMsgTemplate(): string {
    return `
    <div class="favorite-item favourite-empty-res-msg">
      Вы не добавили еще ни одного билета в избранное
    </div>`;
  }

  static ticketTemplate(ticket: Ticket, ticketInd: number, symbol: string): string {
    const {
      airline_logo,
      origin_name,
      destination_name,
      departure_at_formated,
      price,
      transfers,
      flight_number,
    } = ticket;
    return `
    <div class="favorite-item  d-flex a-items-start">
      <img
        src="${airline_logo}"
        class="favorite-item-airline-img"
      />
      <div class="favorite-item-info d-flex flex-column">
        <div
          class="favorite-item-destination d-flex a-items-center"
        >
          <div class="d-flex a-items-center mr-auto">
            <span class="favorite-item-city">${origin_name} </span>
            <i class="medium material-icons">flight_takeoff</i>
          </div>
          <div class="d-flex a-items-center">
            <i class="medium material-icons">flight_land</i>
            <span class="favorite-item-city">${destination_name}</span>
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
          class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto"
          data-favouriteind="${ticketInd}"
          >Delete</a
        >
      </div>
    </div>
    `;
  }
}

const favouritesUI: FavouritesUI = new FavouritesUI(currencyUI, favourites);
export default favouritesUI;
