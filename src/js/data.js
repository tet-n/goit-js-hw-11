import { formEl, containerEl, loadBtnEl } from './references';
import { FetchphotosAPI } from './fetch-images';
import {
  showWarningNotification,
  showInfoNotification,
  showSuccessNotification,
} from './notifications';
import { IntersectionObserverClass } from './infinit-scrolling';
import { renderMarcup } from './render-marcup';

const loadImages = function (totalHits, hits) {
  renderMarcup(hits);
  myObserver.target = containerEl.lastElementChild;
  myObserver.observe(myObserver.target);

  if (fetchPhotos.page === Math.ceil(totalHits / fetchPhotos.perPage)) {
    myObserver.unobserve(myObserver.target);
    setTimeout(
      () =>
        showInfoNotification(
          "We're sorry, but you've reached the end of search results."
        ),
      700
    );
    return;
  }
};

const getTarget = function (entries) {
  if (entries[0].isIntersecting) {
    fetchPhotos.incrementPage();
    fetchPhotos
      .fetchPhotosByName()
      .then(({ totalHits, hits }) => loadImages(totalHits, hits))
      .catch(e =>
        showWarningNotification(
          `Opps. Something went wrong here...${e.message}`
        )
      );
    myObserver.unobserve(myObserver.target);
  }
};

const myObserver = new IntersectionObserverClass(getTarget);
const fetchPhotos = new FetchphotosAPI();

const onFormSubmit = function (e) {
  e.preventDefault();
  containerEl.innerHTML = '';
  fetchPhotos.page = 1;

  fetchPhotos.searchQuery = e.currentTarget.elements.searchQuery.value
    .trim()
    .toLowerCase();
  if (fetchPhotos.searchQuery === '') {
    showWarningNotification('Please enter a non-epty value');
    return;
  }

  fetchPhotos
    .fetchPhotosByName()
    .then(({ totalHits, hits }) => {
      if (!hits.length)
        return showInfoNotification(
          `Sorry, there are no images matching your search query. Please try again.`
        );
      showSuccessNotification(`Hooray! We found ${totalHits} images for you.`);
      loadImages(totalHits, hits);
    })
    .catch(e =>
      showWarningNotification(`Opps. Something went wrong here...${e.message}`)
    )
    .finally(() => {
      e.target.reset();
    });
};

formEl.addEventListener('submit', onFormSubmit);
