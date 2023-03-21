const formEl = document.querySelector('.search-form');
const containerEl = document.querySelector('.gallery');
const loadBtnEl = document.querySelector('.load-more');

// Notlify options

const notlifyInfoOptions = {
  width: '300px',
  ID: 'NotiflixInfo',
  position: 'right-bottom',
  timeout: 2500,
  info: {
    background: '#004869',
    textColor: '#fff',
    childClassName: 'notiflix-notify-info',
    notiflixIconColor: '#fff',
    fontAwesomeClassName: 'fas fa-info-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(38,192,211,0.2)',
  },
};

export { formEl, containerEl, loadBtnEl, notlifyInfoOptions };
