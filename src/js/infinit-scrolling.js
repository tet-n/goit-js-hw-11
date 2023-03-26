export class IntersectionObserverClass {
  target = null;
  constructor(callback) {
    this.observer = new IntersectionObserver(callback, {
      root: null,
      threshold: 0.8,
    });
  }

  observe(target) {
    this.observer.observe(this.target);
  }

  unobserve(target) {
    this.observer.unobserve(this.target);
  }
}
