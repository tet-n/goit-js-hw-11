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

export const onLoadMoreImages = async function () {
  try {
    fetchPhotos.incrementPage();
    const { totalHits, hits } = await fetchPhotos.fetchPhotosByName();

    renderMarcup(hits);

    myObserver.target = containerEl.lastElementChild;
    myObserver.observe(myObserver.target);

    if (fetchPhotos.page === Math.ceil(totalHits / fetchPhotos.perPage)) {
      myObserver.unobserve(myObserver.target);
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

    if (!hits.length)
      return infoNotification(
        `Sorry, there are no images matching your search query. Please try again.`
      );

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
  containerEl.innerHTML = '';
  fetchPhotos.searchQuery = e.currentTarget.elements.searchQuery.value
    .trim()
    .toLowerCase();
  if (fetchPhotos.searchQuery === '') {
    warningNotification('Please enter a non-epty value');
    return;
  }
  loadImages();
  e.target.reset();
};

formEl.addEventListener('submit', onFormSubmit);
// loadBtnEl.addEventListener('click', onLoadMoreImages);
