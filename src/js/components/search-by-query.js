import MovieApiService from '../api/fetch-api.js';
import { refs } from '../utils/refs.js';
import Notiflix from 'notiflix';
import { normalizationMovieObj } from '../utils/normalizationObj';

const { search, filmsList } = refs;

const movieApiService = new MovieApiService();
search.addEventListener('submit', onSearch);

async function onSearch(e) {
  e.preventDefault();
  let searchQuery = e.target.elements.query.value; //e.currentTarget.elements.searchQuery.value.trim();
  movieApiService.query = searchQuery;

  if (movieApiService.query.length === 0) {
    Notiflix.Notify.failure('Please enter search parameters.');
    return;
  }

  const result = await fetchMoviesBySearch();
  const movieData = normalizationMovieList(result);

  appendHitsMarkup(movieData);

  search.reset();
}

async function fetchMoviesBySearch() {
  try {
    const response = await movieApiService.fetchMoviesBySearch();
    const result = response?.results;

    if (!result.length) {
      throw new Error('Sorry, there are no video matching your search query. Please try again.');
    }
    return result;
  } catch (error) {
    Notiflix.Notify.failure(error.message);
    return;
  }
}

function normalizationMovieList(movies) {
  return movies.map(item => normalizationMovieObj(item));
}

function appendHitsMarkup(object) {
  console.log(object);
  // filmsList.insertAdjacentHTML('beforeend', renderImages(object));
}
