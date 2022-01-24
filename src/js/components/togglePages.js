import { refs } from '../utils/refs';
import MovieApiService from '../api/fetch-api.js';
import { placeholderSetter } from './films-container';
import MoviePagination from '../utils/pagination';
import { spinner } from '../utils/spinner';
import { renderPopularMovies } from './home';

const movieApiService = new MovieApiService();
const PER_PAGE = 9;

//---------------------------------------------------
const onHomeButton = () => {
  if (refs.header.id === 'home') {
    refs.inputValue.value = '';
    renderPopularMovies();
    return;
  }

  refs.header.id = 'home';
  refs.inputValue.value = '';
  toggleActiveLink();
  toggleLibraryBg();
  toggleLibraryTab();
  toggleHomeTab();

  refs.watchedBtn.classList.remove('is-active');
  refs.queueBtn.classList.remove('is-active');

  renderPopularMovies();

  // refs.watchedBtn.removeEventListener('click', onWatchedBtnClick);
  // refs.queueBtn.removeEventListener('click', onQueueBtnClick);
};

//-----------------------------------------------------------
const onLibraryButton = () => {
  if (refs.header.id === 'library') {
    // Сбросить счетчик страниц
    // Показать/спрятать пагинацию
    // Определиться: загружать очередь или просмотренные.
    return;
  }

  refs.header.id = 'library';
  toggleActiveLink();
  toggleLibraryBg();
  toggleHomeTab();
  toggleLibraryTab();

  // Показать/спрятать пагинацию

  refs.watchedBtn.classList.add('is-active');
  refs.queueBtn.classList.remove('is-active');

  refs.filmsList.innerHTML = '';
  createLibraryList('watched');

  // toggleLibraryList();
};

//-----Слушатели страниц ----------------------------
refs.homeButton.addEventListener('click', onHomeButton);
refs.libraryButton.addEventListener('click', onLibraryButton);

//---- Функции обработки переключения страниц --------------------
const toggleHomeTab = () => {
  refs.search.classList.toggle('page-active');
  refs.search.classList.toggle('page-inactive');
};
const toggleLibraryTab = () => {
  refs.libraryBtns.classList.toggle('page-active');
  refs.libraryBtns.classList.toggle('page-inactive');
};

const toggleLibraryBg = () => {
  refs.header.classList.toggle('library');
};

const toggleActiveLink = () => {
  refs.activeLink.firstElementChild.classList.toggle('active');
  refs.activeLink.lastElementChild.classList.toggle('active');
};

export function createLibraryList(key) {
  const ListLS = JSON.parse(movieApiService.getItemFromLS(`${key}`));

  if (ListLS === null || ListLS.length === 0) {
    refs.pagination.innerHTML = '';
    placeholderSetter();
    return;
  }

  const totalItems = ListLS.length;

  new MoviePagination('watched', PER_PAGE, totalItems);
  spinner.off();
}

// //---- Переключение листов в библиотеке ------------------------------
// const toggleLibraryList = () => {
//   refs.watchedBtn.addEventListener('click', onWatchedBtnClick);
//   refs.queueBtn.addEventListener('click', onQueueBtnClick);
// };

// const onWatchedBtnClick = () => {
//   refs.filmsList.innerHTML = '';
//   createLibraryList('watched');
//   refs.watchedBtn.classList.add('is-active');
//   refs.queueBtn.classList.remove('is-active');
// };

// const onQueueBtnClick = () => {
//   refs.filmsList.innerHTML = '';
//   createLibraryList('queue');
//   refs.watchedBtn.classList.remove('is-active');
//   refs.queueBtn.classList.add('is-active');
// };
