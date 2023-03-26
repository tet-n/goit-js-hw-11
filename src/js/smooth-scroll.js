import { containerEl } from './references';
export const smoothScrolling = () => {
  const { height: cardHeight } =
    containerEl.lastElementChild.getBoundingClientRect();
  const galleryRowGap = parseInt(
    window.getComputedStyle(containerEl).getPropertyValue('row-gap')
  );

  window.scrollBy({
    top: cardHeight * 2 + galleryRowGap / 2,
    behavior: 'smooth',
  });
};
