import { Notify } from 'notiflix/build/notiflix-notify-aio';

function warningNotification(message) {
  Notify.failure(message);
}

function infoNotification(message) {
  Notify.info(message);
}

function successNotification(message) {
  Notify.success(message);
}

export { warningNotification, infoNotification, successNotification };
