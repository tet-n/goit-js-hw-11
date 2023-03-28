import axios from 'axios';
import { showWarningNotification } from './notifications';

export class FetchphotosAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  constructor() {
    this.perPage = 40;
  }

  page = 1;
  searchQuery = '';

  async fetchPhotosByName() {
    try {
      const { data } = await axios({
        method: 'get',
        url: this.#BASE_URL,
        params: {
          key: '14920021-2257a961c5f1892eae42399ba',
          q: this.searchQuery,
          image_type: 'photo',
          orientation: 'horizontal',
          page: this.page,
          per_page: this.perPage,
          safesearch: true,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return data;
    } catch (e) {
      showWarningNotification(`Opps. Something went wrong here...${e.message}`);
    }
  }

  incrementPage() {
    return (this.page += 1);
  }
}
