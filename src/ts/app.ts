import '../scss/style.scss';
import './plugins';
import locations from './store/locations';
import formUI from './views/form';
import currencyUI from './views/currency';
import ticketsUI from './views/tickets';
import favouritesUI from './views/favourites';

document.addEventListener('DOMContentLoaded', () => {
  initApp();

  const form = formUI.form;
  form.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    onFormSubmit();
  });


  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCitiesList);
  }

  async function onFormSubmit(){
    const origin = locations.getCityCodeByFullname(formUI.originValue);
    const destination = locations.getCityCodeByFullname(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;

    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency
    });

    ticketsUI.renderTickets(locations.lastSearch);

  }
  document.querySelector('a#dropdownTrigger1').addEventListener('click', (e: MouseEvent) => {
    favouritesUI.renderTickets(e.target as HTMLLinkElement);
  })
});
