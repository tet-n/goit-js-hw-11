import {
  formEl,
  containerEl,
  loadBtnEl,
  notlifyInfoOptions,
} from './references';
import { fetchCountries, currentPage, resetPage } from './fetch-images';
import { renderMarcup } from './render-marcup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

formEl.addEventListener('submit', onFormSubmit);
let seekedPhoto = '';
let total = 0;

function onFormSubmit(e) {
  e.preventDefault();

  seekedPhoto = e.currentTarget.elements.searchQuery.value.trim().toLowerCase();
  if (seekedPhoto === '') {
    Notify.info(
      'Sorry, there are no images matching your search query. Please try again.',
      notlifyInfoOptions
    );
    return;
  }
  containerEl.innerHTML = '';
  resetPage();

  fetchCountries(seekedPhoto)
    .then(data => {
      renderMarcup(data.hits);
      console.log(data.totalHits);
      total += 40;
    })
    .catch(console.error);
}

function onLoadMore() {
  if (!seekedPhoto) return;
  fetchCountries(seekedPhoto)
    .then(data => {
      renderMarcup(data.hits);
      console.log(data.totalHits);

      if (total >= total.hits) {
        Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        return;
      }
      total += 40;
    })
    .catch(console.error);
}

loadBtnEl.addEventListener('click', onLoadMore);
