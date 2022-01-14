import NewsApiService from './api/fetch-api.js'
import { refs } from './components/refs.js';
import Notiflix from 'notiflix';
import renderImages from '../tamplates/film-cards.hbs';

const { serchKeyword, gallery} = refs;

const newsApiService = new NewsApiService();
serchKeyword.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  let searchQuery =e.target[0].value;  //e.currentTarget.elements.searchQuery.value.trim();
  newsApiService.query = searchQuery;

  if (newsApiService.query.length === 0 ) {
   return Notiflix.Notify.info('Sorry, there are no video matching your search query. Please try again.');
   
  } 
 fetchMoviesBySearch()
}

function fetchMoviesBySearch() {
  //идет запрос на fetch
  newsApiService.fetchMoviesBySearch().then(object => {
  appendHitsMarkup(object)
  }).catch(console.log);
}

function appendHitsMarkup(object) {
  console.log(object)
  gallery.insertAdjacentHTML('beforeend', renderImages(object))
}

