import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
export let currentPage = 1;

export async function fetchCountries(value) {
  try {
    const { data } = await axios({
      method: 'get',
      url: BASE_URL,
      params: {
        key: '14920021-2257a961c5f1892eae42399ba',
        q: value,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: currentPage,
        per_page: 40,
        safesearch: true,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    incrementPage();
    return data;
  } catch (e) {
    console.log(e);
  }
}

export function incrementPage() {
  return (currentPage += 1);
}

export function resetPage() {
  return (currentPage = 1);
}
