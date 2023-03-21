import { containerEl } from './references';
const logo = new URL('../images/icons.svg', import.meta.url);

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
        <div class="card-thumb">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    </div>
    <div class="info">
      <p class="info-item">
      <svg class="card__icon" width="22" height="22">
  <use href="${logo}#like"></use>
</svg>
${likes}
      </p>
      <p class="info-item">
      <svg class="card__icon" width="22" height="22">
  <use href="${logo}#views"></use>
</svg>${views}
      </p>
      <p class="info-item">
      <svg class="card__icon" width="22" height="22">
  <use href="${logo}#review"></use>
</svg>${comments}
      </p>
      <p class="info-item">
      <svg class="card__icon" width="22" height="22">
      <use href="${logo}#downloads"></use>
    </svg>${downloads}
      </p>
    </div>
  </div>`;
      }
    )
    .join('');

  containerEl.insertAdjacentHTML('beforeend', images);
}
