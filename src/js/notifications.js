import { Notify } from 'notiflix/build/notiflix-notify-aio';

function warningNotification(message) {
  Notify.failure(message, {
    position: 'center-center',
    failure: {
      notiflixIconColor: 'rgba(255,255,255,1)',
    },
  });
}

function infoNotification(message) {
  Notify.info(message);
}

function successNotification(message) {
  Notify.success(message, {
    success: {
      background: '#eed814',
      textColor: '#000',
      notiflixIconColor: 'rgba(1,116,26,0.8)',
    },
  });
}

export { warningNotification, infoNotification, successNotification };
