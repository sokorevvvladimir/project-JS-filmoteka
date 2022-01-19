// Сюда передавать массив объектов с фильмами
// и здесь генерится разметка карточек фильмов

import { refs } from '../utils/refs.js';
import movieCard from '../templates/movieCard.hbs';
import MovieApiService from '../api/fetch-api.js';
//-------------------------------------------
// временный код. Вызывается первая страница списка популярных фильмов
// что бы сделать разметку и цсс под карточку
// потом его удалить
import { normalizationMovieObj } from '../utils/normalizationObj';
import Notiflix from 'notiflix';
// import settings from '../utils/settings';
// const { BASE_URL, API_KEY } = settings;
// import imgDefault from '../../images/header-main/header1024.jpg'
import imgDefault from '../../images/503.jfif';
// async function fetchPopular() {
//   const urlPopular = `${BASE_URL}trending/movie/day?api_key=${API_KEY}&page=1`;
//   return fetch(urlPopular).then(response => response.json());
// }
const movieApiService = new MovieApiService();

export async function PopularMovies() {
  try {
    const moviesList = await movieApiService.fetchPopular();
    const { results } = moviesList;
    renderMoviesList(results);
  } catch (error) {
    refs.filmsList.innerHTML = `<img src=${imgDefault} class="imageDefault"/>`;
  }
}

PopularMovies();
// --------------------------------------------------------------

// results - это объект на входе

export function renderMoviesList(results) {
  // нормализация объекта с учетом обрезания жанров до 2+other...
  const normalObjs = results.map(element => {
    let temp = normalizationMovieObj(element);
    // Обрезание колличества жанров
    // Если жанров менше равно 3 - выводятся все жанры
    // Если жанров больше 3 - выводится 1й, 2й и Other
    // Здесь не нужно ставить <=2 поскольку если жанра три - то отобразится 1й, 2й и Other
    // А нужно вывести три жанра.
    //
    temp.genre.length <= 3
      ? (temp.genre = temp.genre.join(', '))
      : (temp.genre = [temp.genre[0], temp.genre[1], 'Other'].join(', '));
    // Обрезание длины названия фильма
    if (temp.title.length > 37) temp.title = temp.title.slice(0, 37) + '...';
    return temp;
  });

  refs.filmsList.insertAdjacentHTML('beforeend', movieCard(normalObjs));
}

export function createLibraryWath() {
  const watchedListLS = JSON.parse(movieApiService.getItemFromLS('watched'));
  if (watchedListLS === null || watchedListLS.length === 0) {return}
  renderMoviesList(watchedListLS);  
}

export function createLibraryQueue() {
  const queueListLS = JSON.parse(movieApiService.getItemFromLS('queue'));
  if (queueListLS === null || queueListLS.length === 0) {return}
  renderMoviesList(queueListLS);  
}
