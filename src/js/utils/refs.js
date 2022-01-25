export const refs = {
  homeButton: document.querySelector('[data-page="home"]'),
  libraryButton: document.querySelector('[data-page="library"]'),

  header: document.querySelector('.header'),
  activeLink: document.querySelector('.nav__list'),
  inputValue: document.querySelector('#js-input'),
  search: document.querySelector('#js-search'),
  libraryBtns: document.querySelector('#js-buttons'),
  watchedBtn: document.querySelector('.js-library-watched'),
  queueBtn: document.querySelector('.js-library-queue'),

  filmsList: document.querySelector('.films__container'),
  pagination: document.querySelector('#tui-pagination-container'),

  // Авторизация -------------------------------------
  // signInUp: document.querySelector('[data-page="signinup"]'),
  // logOut: document.querySelector('.logout'),

  // modalAuth: document.querySelector('[data-modal]'),
  // closeBtn: document.querySelector('.close-btn'),
  // onDrop: document.querySelector('[data-modal]'),

  // formLogin: document.querySelector('.form-login'),
  // formSign: document.querySelector('.form-sign'),

  // createNewUser: document.querySelector('.new-user'),
  // logUser: document.querySelector('.log-user'),

  //Trailer Modal
  trailerBtn: document.querySelector('.trailer-button'),
  html: document.querySelector('html'),
  closeButton: document.querySelector('.trailer__close-btn'),
  trailerWindow: document.querySelector('.trailer__window'),
  trailerBackdrop: document.querySelector('.trailer__backdrop'),
};
