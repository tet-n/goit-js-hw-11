import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchCountries(value) {
  return axios({
    method: 'get',
    url: BASE_URL,
    params: {
      key: '14920021-2257a961c5f1892eae42399ba',
      q: value,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: 1,
      per_page: 40,
      safesearch: true,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(({ data }) => data);
}
