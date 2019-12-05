import './styles.css';
import fetchCountries from './js/components/fetchCountries';
import searchResultsListItemsTemplate from './js/templates/searchresults-list-items.hbs';
import countryDescriptionTemplate from './js/templates/country-description.hbs';
import PNotify from '../node_modules/pnotify/dist/es/PNotify'
import PNotifyStyleMaterial from '../node_modules/pnotify/dist/es/PNotifyStyleMaterial.js';
PNotify.defaults.styling = 'material';
PNotify.defaults.icons = 'material';
// PNotify.defaults = {
//     styling: 'bootstrap3',
//     icons: 'material'
// }

const debounce = require('lodash.debounce');
const refs = {
  searchForm: document.querySelector('.input-js'),
  searchResultsList: document.querySelector('.search-results'),
  contryDescription: document.querySelector('.country-description-js'),
};

function searchFormSubmitHandler(event) {
  event.preventDefault();
  const form = event.target;
  const inputValue = form.value.toLowerCase();
  fetchCountries(inputValue)
    .then(countries =>
      countries.filter(country =>
        country.name.toLowerCase().includes(inputValue),
      ),
    )
    .then(result => {
      const resultArr = Array.from(result);
      if (resultArr.length === 1) {
        const descriptionMarkup = buildCountryDescriptionMarkup(result[0]);
        insertCountryDescription(descriptionMarkup);
      } else if (resultArr.length > 1 && resultArr.length <= 10) {
        const listMarkup = buildListItemsMarkup(result);
        insertListItems(listMarkup);
      } else {
        PNotify.error({
            text: "Too many matches found! Please, enter a more specific query"
          });
      }
    })
    .catch(err => console.warn(err));
}

function buildListItemsMarkup(items) {
  return searchResultsListItemsTemplate(items);
}

function insertListItems(items) {
  refs.searchResultsList.insertAdjacentHTML('beforeend', items);
}

function buildCountryDescriptionMarkup(item) {
  return countryDescriptionTemplate(item);
}

function insertCountryDescription(item) {
  refs.contryDescription.insertAdjacentHTML('afterbegin', item);
}

function clearListItems() {
  refs.searchResultsList.innerHTML = '';
  refs.contryDescription.innerHTML = '';
}

refs.searchForm.addEventListener(
  'input',
  debounce(searchFormSubmitHandler, 500),
);
refs.searchForm.addEventListener('blur', clearListItems);
