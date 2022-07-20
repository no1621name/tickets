import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

const dropdown = document.querySelector('.dropdown-trigger');
M.Dropdown.init(dropdown);

const select = document.querySelectorAll('select');
M.FormSelect.init(select);
export const getSelectInstance = (elem: Element) => M.FormSelect.getInstance(elem);

const autocomplete = document.querySelectorAll('.autocomplete');
M.Autocomplete.init(autocomplete, {
  data: {}
});
export const getAutocompleteInstance = (elem: Element) => M.Autocomplete.getInstance(elem);

const datePicker = document.querySelectorAll('.datepicker');
M.Datepicker.init(datePicker, {
  showClearBtn: true,
  format: 'yyyy-mm'
});
export const getDatePickerInstance = (elem: Element) => M.Datepicker.getInstance(elem);
