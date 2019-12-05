const baseUrl = 'https://restcountries.eu/rest/v2/';

export default function fetchCountries(searchQuery) {
  return fetch(baseUrl).then(response => response.json());
}
