import { renderMoviesList } from '../utils/createMoviesList.js';
import { refs } from '../utils/refs.js';
import { placeholderSetter } from './films-container';
import MoviePagination from '../utils/pagination';
import { spinner } from '../utils/spinner';

refs.queueBtn.addEventListener('click', onQueue);
refs.watchedBtn.addEventListener('click', onWatched);
const PER_PAGE = 9;

export function onQueue() {
  showQueue();
  hideQueue();
  //получаем данные localStorage
  const saveData = localStorage.getItem('queue');
  // парсим в JSON
  const parseData = JSON.parse(saveData);
  const totalItems = parseData.length;

  if (totalItems === 0) {
    refs.pagination.innerHTML = '';
    placeholderSetter();
    return;
  }

  if (!parseData) {
    refs.pagination.innerHTML = '';
    return;
  }

  refs.filmsList.innerHTML = '';
  new MoviePagination('queue', PER_PAGE, totalItems);
  spinner.off();
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
}
