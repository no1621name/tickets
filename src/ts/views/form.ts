import { getAutocompleteInstance, getDatePickerInstance } from '../plugins/materialize';

class FormUI{
  public form: HTMLFormElement = document.forms[0];
  private origin: HTMLInputElement = document.querySelector('#autocomplete-origin');
  private destination: HTMLInputElement = document.querySelector('#autocomplete-destination');
  private departDate: HTMLInputElement = document.querySelector('#datepicker-depart');
  private returnDate: HTMLInputElement = document.querySelector('#datepicker-return');

  private originAutocomplete: M.Autocomplete;
  private destinationAutocomplete: M.Autocomplete;
  private departDateDatePicker: M.Datepicker;
  private returnDateDatePicker: M.Datepicker;

  constructor(autocompleteInstance: (el: Element) => M.Autocomplete, datePickerInstance: (el: Element) => M.Datepicker){
    this.originAutocomplete = autocompleteInstance(this.origin);
    this.destinationAutocomplete = autocompleteInstance(this.destination);
    this.departDateDatePicker = datePickerInstance(this.departDate);
    this.returnDateDatePicker = datePickerInstance(this.returnDate);
  }

  setAutocompleteData(data: ShortCitiesList): void{
    this.originAutocomplete.updateData(data);
    this.destinationAutocomplete.updateData(data);
  }

  get originValue(): string {
    return this.origin.value;
  }

  get destinationValue(): string {
    return this.destination.value;
  }

  get departDateValue(): string {
    return this.departDateDatePicker.toString();
  }

  get returnDateValue(): string {
    return this.returnDateDatePicker.toString();
  }

}

const formUi: FormUI = new FormUI(getAutocompleteInstance, getDatePickerInstance);
export default formUi;