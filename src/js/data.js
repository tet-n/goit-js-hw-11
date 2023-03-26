import { formEl, containerEl, loadBtnEl } from './references';
import { FetchphotosAPI } from './fetch-images';
import {
  warningNotification,
  infoNotification,
  successNotification,
} from './notifications';
import { IntersectionObserverClass } from './infinit-scrolling';
import { renderMarcup } from './render-marcup';

const getTarget = function (entries) {
  if (entries[0].isIntersecting) {
    onLoadMoreImages();
    myObserver.unobserve(myObserver.target);
  }
};

const fetchPhotos = new FetchphotosAPI();
const myObserver = new IntersectionObserverClass(getTarget);

// Завантаження більшої кількості фото за одним і тим самим запитом
export const onLoadMoreImages = async function () {
  try {
    fetchPhotos.incrementPage();
    const { totalHits, hits } = await fetchPhotos.fetchPhotosByName();

    renderMarcup(hits);

    myObserver.target = containerEl.lastElementChild;
    myObserver.observe(myObserver.target);

    // Якщо кількість можливих сторінок для завантаження дорівнює значенню page, то ховаємо кнопку та виводимо оповіщення
    if (fetchPhotos.page === Math.ceil(totalHits / fetchPhotos.perPage)) {
      myObserver.observe(myObserver.target);
      infoNotification(
        "We're sorry, but you've reached the end of search results."
      );
      return;
    }
  } catch (e) {
    warningNotification(`Opps. Something went wrong here...${e.message}`);
  }
};

// Дані з бекенда
const loadImages = async function () {
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

    myObserver.target = containerEl.lastElementChild;
    myObserver.observe(myObserver.target);

    if (fetchPhotos.page === Math.ceil(totalHits / fetchPhotos.perPage)) {
      myObserver.unobserve(myObserver.target);
      setTimeout(() => {
        infoNotification(
          "We're sorry, but you've reached the end of search results."
        );
      }, 300);
      return;
    }
  } catch (e) {
    warningNotification(`Opps. Something went wrong here...${e.message}`);
  }
};

const onFormSubmit = function (e) {
  e.preventDefault();

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
  loadImages();
  e.target.reset();
};

formEl.addEventListener('submit', onFormSubmit);
loadBtnEl.addEventListener('click', onLoadMoreImages);
