import { refs } from '../utils/refs';
// Будет нужно добавить
// Импорт класса или экземпляра
// Для "популярные фильмы" для Хоум
// Для "лайбрари" для лайбрари пользователя
import { PopularMovies } from './createMoviesList';

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
  PopularMovies(); // здесь потом указать метод из класса.

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

  // refs.watchedBtn.classList.remove('is-active');
  refs.queueBtn.classList.remove('is-active');

  //-- Обсудить и удалить ----------------------------
  // Как вариант - ничего не загружать,
  // а предложить, пусть нажмет кнопочку и сам выберет
  refs.filmsList.innerHTML = '';
  createLibraryWath();

  //   '<p>Select at the top what you want to display: viewed or queued ☝🏻</p>';
  //--------------------------------------------------
};

//----------------------------------------------------------------------
refs.homeButton.addEventListener('click', onHomeButton);
refs.libraryButton.addEventListener('click', onLibraryButton);

//----------------------------------------------------------------------
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
