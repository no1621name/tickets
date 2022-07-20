export class CurrencyUI{
  private cuurency: HTMLSelectElement = document.querySelector('#cuurency');
  private dictionary: {[key: string]: string} = {
    USD: '$',
    EUR: '€',
  }

  constructor(){}

  get currencyValue(): string{
    return this.cuurency.value;
  }

  getCurrencySymbol(): string{
    return this.dictionary[this.currencyValue];
  }
}

const currencyUI: CurrencyUI = new CurrencyUI();
export default currencyUI;