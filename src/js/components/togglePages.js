import { refs } from '../utils/refs';
import MovieApiService from '../api/fetch-api.js';
import { renderMoviesList } from '../utils/createMoviesList';
// Будет нужно добавить
// Импорт класса или экземпляра
// Для "популярные фильмы" для Хоум
// Для "лайбрари" для лайбрари пользователя
import MoviePagination from '../utils/pagination';

const movieApiService = new MovieApiService();

//---------------------------------------------------
const onHomeButton = () => {
  if (refs.header.id === 'home') {
    refs.inputValue.value = '';
    // Сбросить счетчик страниц
    // Загрузить популярные фильми
    return;
  }

  refs.header.id = 'home';
  refs.inputValue.value = '';
  toggleActiveLink();
  toggleLibraryBg();
  toggleLibraryTab();
  toggleHomeTab();

  // Какие-то действия с блоком пагинации
  // Сбросить счетчик страниц
  // Загрузить популярные фильмы

  refs.filmsList.innerHTML = '';
  new MoviePagination('popular', 20); // здесь потом указать метод из класса.

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

function createLibraryList(key) {
  const ListLS = JSON.parse(movieApiService.getItemFromLS(`${key}`));
  if (ListLS === null || ListLS.length === 0) {
    return;
  }
  renderMoviesList(ListLS);
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
