const baseUrl = 'https://restcountries.eu/rest/v2/';

const fetchCountries = searchQuery => {
  return fetch(baseUrl).then(response => response.json());
};

export { fetchCountries };
