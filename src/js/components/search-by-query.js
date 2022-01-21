import MovieApiService from '../api/fetch-api.js';
import { refs } from '../utils/refs.js';
import Notiflix from 'notiflix';
import {popularVideo,videoBySearch} from '../utils/pagination.js'
import Pagination from 'tui-pagination';
import { renderMoviesList } from './createMoviesList.js';
const paginationPopular = new Pagination('#tui-pagination-container')
const paginationBySearch = new Pagination('#tui-pagination-container')
const { search } = refs;

const movieApiService = new MovieApiService();
search.addEventListener('submit', onSearch);

export function onSearch(e) {
  e.preventDefault();
  
  paginationPopular.off('afterMove', popularVideo);
    paginationBySearch.on('afterMove', videoBySearch);
  let searchQuery = e.target.elements.query.value; //e.currentTarget.elements.searchQuery.value.trim();
  movieApiService.query = searchQuery;

  if (movieApiService.query.length === 0) {
    Notiflix.Notify.failure('Please enter search parameters.');
    return;
  }

  fetchMoviesBySearch();

  search.reset();
}

export async function fetchMoviesBySearch() {
  try {
    const response = await movieApiService.fetchMoviesBySearch();
    const result = response?.results;

    if (!result.length) {
      throw new Error('Sorry, there are no video matching your search query. Please try again.');
    }

    refs.filmsList.innerHTML = '';
    renderMoviesList(result);
  } catch (error) {
    Notiflix.Notify.failure(error.message);
    return;
  }
}
