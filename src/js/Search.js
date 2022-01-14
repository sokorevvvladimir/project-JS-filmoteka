import MovieApiService from './api/fetch-api.js'
import { refs } from './utils/refs.js';
import Notiflix from 'notiflix';
// import renderImages from '../tamplates/film-cards.hbs';

const { serchKeyword, filmsList} = refs;

const movieApiService = new MovieApiService();
serchKeyword.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  let searchQuery =e.target[0].value;  //e.currentTarget.elements.searchQuery.value.trim();
 movieApiService.query = searchQuery;

  if (movieApiService.query.length === 0 ) {
   return Notiflix.Notify.info('Sorry, there are no video matching your search query. Please try again.');
   
  } 
 fetchMoviesBySearch()
}

function fetchMoviesBySearch() {
  //идет запрос на fetch
  movieApiService.fetchMoviesBySearch().then(object => {
  appendHitsMarkup(object)
  }).catch(console.log);
}

function appendHitsMarkup(object) {
  console.log(object)
  filmsList.insertAdjacentHTML('beforeend', renderImages(object))
}

