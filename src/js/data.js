import { formEl, containerEl, loadBtnEl } from './references';
import { FetchphotosAPI } from './fetch-images';
import {
  warningNotification,
  infoNotification,
  successNotification,
} from './notifications';

import { renderMarcup } from './render-marcup';
// Cтворюємо екземпляр класу
const fetchPhotos = new FetchphotosAPI();

// Отримуємо дані
const getData = async function () {
  try {
    const { totalHits, hits } = await fetchPhotos.fetchPhotosByName();
    // Якщо масив із фото пустий
    if (!hits.length)
      return infoNotification(
        `Sorry, there are no images matching your search query. Please try again.`
      );
    // Якщо знайшли зображення
    successNotification(`Hooray! We found ${totalHits} images for you.`);
    renderMarcup(hits);
    loadBtnEl.classList.remove('hidden');

    if (fetchPhotos.page === Math.ceil(totalHits / fetchPhotos.perPage)) {
      loadBtnEl.classList.add('hidden');
      infoNotification(
        "We're sorry, but you've reached the end of search results."
      );
      return;
    }
  } catch (e) {
    warningNotification(`Opps. Something went wrong here...${e.message}`);
  }
};

const onLoadImages = function (e) {
  e.preventDefault();
  loadBtnEl.classList.add('hidden');
  // Очищення контейнера у разі нового запиту
  containerEl.innerHTML = '';
  // Записуємо значення з інпута в клас
  fetchPhotos.searchQuery = e.currentTarget.elements.searchQuery.value
    .trim()
    .toLowerCase();
  // Якщо не ввели жодних даних
  if (fetchPhotos.searchQuery === '') {
    warningNotification('Please enter a non-epty value');
    return;
  }

  getData();
};

// Завантаження більшої кількості фото за одним і тим самим запитом
const onLoadMoreImages = async function () {
  try {
    fetchPhotos.incrementPage();
    const { totalHits, hits } = await fetchPhotos.fetchPhotosByName();

    renderMarcup(hits);
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    const galleryRowGap = parseInt(
      window.getComputedStyle(containerEl).getPropertyValue('row-gap')
    );

    window.scrollBy({
      top: cardHeight * 2 + galleryRowGap / 2,
      behavior: 'smooth',
    });
    // Якщо кількість можливих сторінок для завантаження дорівнює значенню page, то ховаємо кнопку та виводимо оповіщення
    if (fetchPhotos.page === Math.ceil(totalHits / fetchPhotos.perPage)) {
      loadBtnEl.classList.add('hidden');
      infoNotification(
        "We're sorry, but you've reached the end of search results."
      );
      return;
    }
  } catch (e) {
    warningNotification(`Opps. Something went wrong here...${e.message}`);
  }
};

formEl.addEventListener('submit', onLoadImages);
loadBtnEl.addEventListener('click', onLoadMoreImages);
