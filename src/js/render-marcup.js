import { containerEl } from './references';

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
      <svg class="card__icon" width="15" height="15">
  <use href="./images/icons.svg#like"></use>
</svg>
      <i class="fa-solid fa-heart" "></i>
        <b>Likes</b>${likes}
      </p>
      <p class="info-item">
      <i class="fa-solid fa-eye" "></i>
        <b>Views</b>${views}
      </p>
      <p class="info-item">
      <i class="fa-solid fa-comment" "></i>
        <b>Comments</b>${comments}
      </p>
      <p class="info-item">
      <i class="fa-sharp fa-solid fa-circle-down" "></i>
        <b>Downloads</b>${downloads}
      </p>
    </div>
  </div>`;
      }
    )
    .join('');

  containerEl.insertAdjacentHTML('afterbegin', images);
}
