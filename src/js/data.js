import { formEl, containerEl } from './references';
import { fetchCountries } from './fetch-images';

import { renderMarcup } from './render-marcup';

// const inputRefs = document.querySelector('[name="searchQuery"]');

formEl.addEventListener('submit', onFormSubmit);

// Отримуємо валідне значення того, що шукаємо
function onFormSubmit(e) {
  e.preventDefault();

  containerEl.innerHTML = '';
  const seekedPhoto = e.currentTarget.elements.searchQuery.value
    .trim()
    .toLowerCase();

  fetchCountries(seekedPhoto).then(({ hits }) => {
    console.log(hits);
    renderMarcup(hits);
  });
}
