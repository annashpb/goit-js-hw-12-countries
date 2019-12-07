import { fetchCountries } from './services/api';
import searchResultsListItemsTemplate from './templates/searchresults-list-items.hbs';
import countryDescriptionTemplate from './templates/country-description.hbs';
import { pWarning, pNotice } from './utils/pnotify';
import { messages } from './utils/messages';
const debounce = require('lodash.debounce');

import { refs } from './utils/refs';

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
      if (resultArr.length === 0) {
        pWarning(messages.warningNotIn);
      } else if (inputValue.length === 0) {
        clearListItems();
      } else if (resultArr.length === 1) {
        clearListItems();
        const descriptionMarkup = buildCountryDescriptionMarkup(result[0]);
        insertCountryDescription(descriptionMarkup);
      } else if (resultArr.length > 1 && resultArr.length <= 10) {
        clearListItems();
        const listMarkup = buildListItemsMarkup(result);
        insertListItems(listMarkup);
      } else {
        clearListItems();
        pNotice(messages.warningTooMany);
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
