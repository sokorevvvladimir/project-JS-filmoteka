// Функция на входе получает объект с фильмотеки и преобразует его 
// в нормальный вид. Поскольку в фильмотеке объект фильм имеет жанры в виде массива кодов
// возможно отсутствие картинок и кривость вида даты.

import genreList from './genreList';

import settings from "./settings";
const {API_KEY, IMG_URL} = settings;

import noImg from '../../images/noImageAvailable.jpg';

// -------------------------------------------------------------
const getGenreArray = (genre_ids) =>
  (genre_ids.length <= 3) ? genre_ids.map(el => genreList[`${el}`]).join(', ') :
  [genreList[`${genre_ids[0]}`], genreList[`${genre_ids[1]}`], 'other...'].join(', ');

const getImgPath = (imgPath) => (!imgPath) ?  `${noImg}` : `${IMG_URL}${imgPath}`;

const getDate = (date) => (!date) ?  data : date.slice(0, 4);

// -------------------------------------------------------------
export const normalizationMovieObj = 
({
  genre_ids,
  id,
  original_title,
  overview,
  popularity,
  poster_path,
  release_date,
  vote_average,
  vote_count,  
}) => ({
  genre: getGenreArray(genre_ids),
  id: id,
  title: original_title,
  about: overview,
  popularity: popularity,
  img: getImgPath(poster_path),
  releaseDate: getDate(release_date),
  vote: vote_average,
  votes: vote_count,  
});
