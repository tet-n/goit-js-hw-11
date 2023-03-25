import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { containerEl } from './references';

// It is a path to svg
const logoPath = new URL('../images/icons.svg', import.meta.url);

const lightbox = new SimpleLightbox('.gallery a');

export function renderMarcup(imageArray) {
  const images = imageArray
    .map(
      ({
        tags,
        likes,
        views,
        comments,
        downloads,
        webformatURL,
        largeImageURL,
      }) => {
        return `<div class="photo-card">
        <div class="card-thumb"><a href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" width="375" height="200"/></a>
    </div>
    <div class="info">
      <p class="info-item">
      <svg class="card__icon" width="22" height="22">
  <use href="${logoPath}#like"></use>
</svg>
${likes}
      </p>
      <p class="info-item">
      <svg class="card__icon" width="22" height="22">
  <use href="${logoPath}#views"></use>
</svg>${views}
      </p>
      <p class="info-item">
      <svg class="card__icon" width="22" height="22">
  <use href="${logoPath}#review"></use>
</svg>${comments}
      </p>
      <p class="info-item">
      <svg class="card__icon" width="22" height="22">
      <use href="${logoPath}#downloads"></use>
    </svg>${downloads}
      </p>
    </div>
  </div>`;
      }
    )
    .join('');

  containerEl.insertAdjacentHTML('beforeend', images);
  lightbox.refresh();
}
