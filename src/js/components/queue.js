import { renderMoviesList } from '../utils/createMoviesList.js';
import { refs } from '../utils/refs.js';
import { placeholderSetter } from './films-container';
refs.queueBtn.addEventListener('click', onQueue);
refs.watchedBtn.addEventListener('click', onWatched);

function onQueue() {
  showQueue();
  hideQueue();
  //получаем данные localStorage
  const saveData = localStorage.getItem('queue');
  // парсим в JSON
  const parseData = JSON.parse(saveData);

  if (parseData.length === 0) {
    placeholderSetter();
    return;
  }

  if (!parseData) {
    return;
  }

  refs.filmsList.innerHTML = '';
  renderMoviesList(parseData);
}

function onWatched() {
  refs.watchedBtn.classList.add('is-active');
  refs.queueBtn.classList.remove('is-active');
}

function showQueue() {
  refs.queueBtn.classList.add('is-active');
}

function hideQueue() {
  refs.watchedBtn.classList.remove('is-active');
  refs.watchedBtn.classList.remove('is-active');
}
