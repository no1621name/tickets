export class Favourites{
  public favouritesList: Tickets = [];

  constructor(){}

  addToFavourites(originalTicket: Ticket): void{
    const ticketCopy: Ticket = Object.assign({}, originalTicket);
    this.favouritesList.push(ticketCopy);
  }

  deleteFavourite(ind: number): void{
    this.favouritesList.splice(ind, 1);
  }

};

const favourites: Favourites = new Favourites();
export default favourites;