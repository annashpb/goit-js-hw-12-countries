const baseUrl = 'https://restcountries.eu/rest/v2/';
const resourse = 'name/';

export default function fetchCountries(searchQuery) {
  return fetch(baseUrl).then(response => response.json());
}
