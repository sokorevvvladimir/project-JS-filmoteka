import MovieApiService from '../api/fetch-api.js';
import { refs } from '../utils/refs.js';
import Notiflix from 'notiflix';
import Pagination from 'tui-pagination';
import { renderMoviesList } from './createMoviesList.js';
const { search } = refs;
import 'tui-pagination/dist/tui-pagination.min.css';

const movieApiService = new MovieApiService();

search.addEventListener('submit', onSearch);

async function onSearch(e) {
  e.preventDefault();

  let searchQuery = e.target.elements.query.value.trim(); 
  search.reset();

  if (!searchQuery) {
    Notiflix.Notify.failure('Please enter search parameters.');
    return;
  }

  const saveApiQuery = movieApiService.query;
  movieApiService.query = searchQuery;

  const isMovies = (await getMovies(1)) ? true : false;
  if (!isMovies) {
    movieApiService.query = saveApiQuery;
    return;
  }

  createPagination();
}

async function createPagination() {
  const paginationEL = document.getElementById('tui-pagination-container');

  const options = {
    itemsPerPage: 20,
    visiblePages: 5,
    page: 1,
  };

  const pagination = new Pagination(paginationEL, options);

  const page = pagination.getCurrentPage();

  const result = await getMovies(page);

  if (!result) return;

  const { results: movies, total_results: totalItems } = result;
  pagination.reset(totalItems);
  renderMoviesList(movies);

  pagination.on('afterMove', onPagination);
}

async function onPagination(event) {
  const result = await getMovies(event.page);

  if (!result) return;

  const { results: movies } = result;

  renderMoviesList(movies);
}

async function getMovies(page) {
  movieApiService.page = page;

  try {
    const response = await movieApiService.fetchMoviesBySearch();
    const result = response?.results;

    if (!result.length) {
      throw new Error('Sorry, there are no video matching your search query. Please try again.');
    }

    refs.filmsList.innerHTML = '';

    return response;
  } catch (error) {
    Notiflix.Notify.failure(error.message);
    return null;
  }
}