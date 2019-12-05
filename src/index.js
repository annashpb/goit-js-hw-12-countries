import './styles.css';
import fetchCountries from './js/components/fetchCountries';
import searchResultsListItemsTemplate from './js/templates/searchresults-list-items.hbs';

const debounce = require('lodash.debounce');
const refs = {
  searchForm: document.querySelector('.input-js'),
  searchResultsList: document.querySelector('.search-results'),
};

function searchFormSubmitHandler(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const inputValue = refs.searchForm.value.toLowerCase();
  console.log(inputValue);
  fetchCountries(inputValue)
    .then(countries =>
      countries.filter(country =>
        country.name.toLowerCase().includes(inputValue),
      ),
    )
    .then(result => {
      const markup = buildListItemsMarkup(result);
      insertListItems(markup);
    });
}

function buildListItemsMarkup(items) {
  return searchResultsListItemsTemplate(items);
}

function insertListItems(items) {
  refs.searchResultsList.insertAdjacentHTML('beforeend', items);
}

refs.searchForm.addEventListener('input', searchFormSubmitHandler);
